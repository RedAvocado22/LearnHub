package com.learnhub.auth;

import java.util.Optional;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import com.learnhub.auth.exception.ExpiredTokenException;
import com.learnhub.auth.exception.InactiveAccountException;
import com.learnhub.auth.exception.RefreshTokenException;
import com.learnhub.auth.exception.UserExistsException;
import com.learnhub.auth.jwt.JwtService;
import com.learnhub.user.User;
import com.learnhub.user.UserRepository;
import com.learnhub.user.UserRole;
import com.learnhub.user.exception.UserNotFoundException;
import com.learnhub.user.student.Student;
import com.learnhub.util.mail.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;
    private final EmailService emailService;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AuthService(
            UserRepository userRepository,
            TokenRepository refreshTokenRepository,
            EmailService emailService,
            JwtService jwtService,
            AuthenticationManager authenticationManager,
            PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.tokenRepository = refreshTokenRepository;
        this.emailService = emailService;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
    }

    public AuthResponse login(LoginRequest authReq, HttpServletRequest httpReq, HttpServletResponse httpResp) {
        User user = userRepository.findByEmail(authReq.email())
            .orElseThrow(() -> new UserNotFoundException(
                        String.format("User with email %s does not exists. Register new account.", authReq.email())));

        if (!user.isActive()) {
            emailService.sendAccountActivationEmail(user.getEmail(), jwtService.generateAccessToken(user));
            throw new InactiveAccountException("User account is not activated. Check email.");
        }

        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authReq.email(), authReq.password()));

        String ipAddress = httpReq.getRemoteAddr();
        String deviceInfo = httpReq.getHeader(HttpHeaders.USER_AGENT);
        String accessToken = jwtService.generateAccessToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);
        ResponseCookie refreshTokenCookie = jwtService.generateRefreshTokenCookie(refreshToken);
        httpResp.addHeader(HttpHeaders.SET_COOKIE, refreshTokenCookie.toString());

        tokenRepository.revokeUserTokens(user.getId());
        Token token = Token.builder()
            .user(user)
            .accessToken(accessToken)
            .refreshToken(refreshToken)
            .ipAddress(ipAddress)
            .deviceInfo(deviceInfo)
            .build();
        tokenRepository.save(token);

        return new AuthResponse(accessToken);
    }

    public AuthResponse registerStudent(StudentRegisterRequest req, HttpServletRequest httpReq) {
        userRepository.findByEmail(req.email()).ifPresent(user -> {
            throw new UserExistsException(String.format("User with email %s is already exists.", req.email()));
        });
        String encoded = passwordEncoder.encode(req.password());
        Student user = new Student(
                req.email(),
                req.firstname(),
                req.lastname(),
                encoded,
                UserRole.STUDENT,
                false,
                req.studentType());
        Student saved = userRepository.save(user);
        
        String token = jwtService.generateToken(saved, 30 * 60 * 1000); // NOTE: 30 minutes
        emailService.sendAccountActivationEmail(saved.getEmail(), token);
        return new AuthResponse(token);
    }

    public void activateAccount(ActivateAccountRequest req) {
        String email = jwtService.extractUsername(req.token());
        User user = userRepository.findByEmail(email).orElseThrow();
        if (jwtService.isTokenExpired(req.token())) {
            emailService.sendAccountActivationEmail(user.getEmail(), jwtService.generateToken(user, 30 * 60 * 1000));
            throw new ExpiredTokenException("Activation link is expired. Check email.");
        }
        user.setActive(true);
        userRepository.save(user);
    }

    public AuthResponse refreshToken(HttpServletRequest req, HttpServletResponse resp) {
        final String oldRT = jwtService.getTokenFromCookie(req, "refresh_token");
        if (oldRT == null) {
            throw new RefreshTokenException("Refresh token not found.");
        }

        final String email = jwtService.extractUsername(oldRT);
        if (email == null) {
            throw new RefreshTokenException("Invalid refresh token.");
        }

        User user = userRepository.findByEmail(email).orElse(null);
        if (user == null || !jwtService.isTokenValid(oldRT, user)) {
            throw new RefreshTokenException("Invalid refresh token.");
        }

        Optional<Token> maybeToken = tokenRepository.findByRefreshToken(oldRT);
        if (!maybeToken.isPresent() || maybeToken.get().isRevoked()) {
            throw new RefreshTokenException("Invalid refresh token.");
        }

        String ipAddress = req.getRemoteAddr();
        String deviceInfo = req.getHeader(HttpHeaders.USER_AGENT);
        String accessToken = jwtService.generateAccessToken(user); 
        String refreshToken = jwtService.generateRefreshToken(user);
        ResponseCookie refreshTokenCookie = jwtService.generateRefreshTokenCookie(refreshToken);
        resp.addHeader(HttpHeaders.SET_COOKIE, refreshTokenCookie.toString());

        tokenRepository.revokeUserTokens(user.getId());
        Token token = Token.builder()
            .user(user)
            .accessToken(accessToken)
            .refreshToken(refreshToken)
            .ipAddress(ipAddress)
            .deviceInfo(deviceInfo)
            .build();
        tokenRepository.save(token);

        return new AuthResponse(accessToken);
    }
}
