package com.learnhub.auth;

import java.time.LocalDateTime;
import java.util.Optional;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import com.learnhub.auth.exception.ExpiredTokenException;
import com.learnhub.auth.exception.InactiveAccountException;
import com.learnhub.auth.exception.UserExistsException;
import com.learnhub.auth.jwt.JwtService;
import com.learnhub.user.User;
import com.learnhub.user.UserRepository;
import com.learnhub.user.UserRole;
import com.learnhub.user.exception.UserNotFoundException;
import com.learnhub.user.student.Student;
import com.learnhub.util.mail.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final EmailService emailService;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AuthService(
            UserRepository userRepository,
            RefreshTokenRepository refreshTokenRepository,
            EmailService emailService,
            JwtService jwtService,
            AuthenticationManager authenticationManager,
            PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.refreshTokenRepository = refreshTokenRepository;
        this.emailService = emailService;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
    }

    public AuthResponse login(LoginRequest authReq, HttpServletResponse httpResp) {
        User user = userRepository.findByEmail(authReq.email())
            .orElseThrow(() -> new UserNotFoundException(
                        String.format("User with email %s does not exists. Register new account.", authReq.email())));

        if (!user.isActive()) {
            emailService.sendAccountActivationEmail(user.getEmail(), jwtService.generateAccessToken(user));
            throw new InactiveAccountException("User account is not activated. Check email.");
        }

        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authReq.email(), authReq.password()));

        String jwt = jwtService.generateAccessToken(user);
        int refreshTokenExpiresMillis = 24 * 60 * 60 * 1000; // TODO: make the expires longer for 'remember me'
        String refreshToken = jwtService.generateRefreshToken(user, refreshTokenExpiresMillis);
        Cookie refreshTokenCookie = jwtService.generateRefreshTokenCookie(refreshToken, refreshTokenExpiresMillis / 1000);
        httpResp.addCookie(refreshTokenCookie);

        RefreshToken token = refreshTokenRepository.findByUser(user.getId()).orElse(new RefreshToken());
        token.setUser(user);
        token.setToken(refreshToken);
        token.setCreatedAt(LocalDateTime.now());
        token.setExpiresAt(LocalDateTime.now().plusSeconds(refreshTokenExpiresMillis / 1000));
        token.setRevoked(false);
        refreshTokenRepository.save(token);

        return new AuthResponse(jwt);
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
            throw new IllegalStateException("Refresh token not found.");
        }

        final String email = jwtService.extractUsername(oldRT);
        if (email == null) {
            throw new IllegalStateException("Invalid refresh token.");
        }

        User user = userRepository.findByEmail(email).orElseThrow();
        if (!jwtService.isTokenValid(oldRT, user)) {
            throw new IllegalStateException("Invalid refresh token.");
        }

        Optional<RefreshToken> maybeToken = refreshTokenRepository.findByToken(oldRT);
        if (!maybeToken.isPresent()) {
            throw new IllegalStateException("Refresh token not found.");
        }
        String accessToken = jwtService.generateAccessToken(user); 

        return new AuthResponse(accessToken);
    }
}
