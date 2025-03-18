package com.learnhub.auth;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import com.learnhub.auth.exception.InactiveAccountException;
import com.learnhub.auth.exception.InvalidTokenException;
import com.learnhub.auth.exception.SuspendedAccountException;
import com.learnhub.auth.exception.UserExistsException;
import com.learnhub.auth.jwt.JwtService;
import com.learnhub.user.User;
import com.learnhub.user.UserRepository;
import com.learnhub.user.UserRole;
import com.learnhub.user.UserStatus;
import com.learnhub.user.exception.UserNotFoundException;
import com.learnhub.user.student.StudentProfile;
import com.learnhub.util.mail.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final EmailService emailService;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AuthService(
            UserRepository userRepository,
            EmailService emailService,
            JwtService jwtService,
            AuthenticationManager authenticationManager,
            PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.emailService = emailService;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
    }

    public AuthResponse login(LoginRequest req, HttpServletRequest httpReq, HttpServletResponse httpResp) {
        User user = userRepository.findByEmail(req.email())
            .orElseThrow(() -> new UserNotFoundException(
                        String.format("User with email %s does not exists. Register new account.", req.email())));

        if (user.getStatus() == UserStatus.SUSPENDED) {
            throw new SuspendedAccountException("User account is suspended.");
        }
        if (user.getStatus() == UserStatus.UNACTIVE) {
            emailService.sendAccountActivationEmail(user.getEmail(), jwtService.generateToken(user, 30 * 60 * 1000));
            throw new InactiveAccountException("User account is not activated. Check email.");
        }

        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(req.email(), req.password()));

        String accessToken = jwtService.generateAccessToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);
        ResponseCookie refreshTokenCookie = jwtService.generateRefreshTokenCookie(refreshToken);
        httpResp.addHeader(HttpHeaders.SET_COOKIE, refreshTokenCookie.toString());

        return new AuthResponse(accessToken);
    }

    public AuthResponse registerStudent(StudentRegisterRequest req, HttpServletRequest httpReq) {
        userRepository.findByEmail(req.email()).ifPresent(user -> {
            throw new UserExistsException(String.format("User with email %s is already exists.", req.email()));
        });
        String encoded = passwordEncoder.encode(req.password());
        User user = userRepository.save(User.builder()
                .email(req.email())
                .firstName(req.firstname())
                .lastName(req.lastname())
                .password(encoded)
                .role(UserRole.STUDENT)
                .status(UserStatus.UNACTIVE)
                .student(StudentProfile.builder()
                        .type(req.studentType())
                        .build())
                .build());
        
        String token = jwtService.generateToken(user, 30 * 60 * 1000);
        emailService.sendAccountActivationEmail(user.getEmail(), token);
        return new AuthResponse(token);
    }

    public void activateAccount(ActivateAccountRequest req) {
        String email = jwtService.extractUsername(req.token());
        if (email == null) {
            throw new InvalidTokenException("Invalid token");
        }

        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new UserNotFoundException(String.format("User with email %s does not exists.", email)));

        if (user.getStatus() == UserStatus.SUSPENDED) {
            throw new SuspendedAccountException("User account is suspended.");
        }
        if (jwtService.isTokenExpired(req.token())) {
            emailService.sendAccountActivationEmail(user.getEmail(), jwtService.generateToken(user, 30 * 60 * 1000));
            throw new InvalidTokenException("Activation link is expired. Check email.");
        }
        user.setStatus(UserStatus.ACTIVE);
        userRepository.save(user);
    }

    @Transactional
    public AuthResponse refreshToken(HttpServletRequest req, HttpServletResponse resp) {
        final String oldRT = jwtService.getTokenFromCookie(req, "refresh_token");
        if (oldRT == null) {
            throw new InvalidTokenException("Refresh token not found.");
        }

        final String email = jwtService.extractUsername(oldRT);
        if (email == null) {
            throw new InvalidTokenException("Invalid refresh token.");
        }

        User user = userRepository.findByEmail(email).orElseThrow(() -> new InvalidTokenException("Invalid refresh token."));
        if (!jwtService.isTokenValid(oldRT, user)) {
            throw new InvalidTokenException("Invalid refresh token.");
        }

        if (!user.getRevokedTokens().add(RevokedToken.builder()
                    .user(user)
                    .token(oldRT)
                    .ipAddress(req.getRemoteAddr())
                    .deviceInfo(req.getHeader(HttpHeaders.USER_AGENT))
                    .build())) {
            throw new InvalidTokenException("Invalid refresh token.");
        }

        String accessToken = jwtService.generateAccessToken(user); 
        String refreshToken = jwtService.generateRefreshToken(user);
        ResponseCookie refreshTokenCookie = jwtService.generateRefreshTokenCookie(refreshToken);
        resp.addHeader(HttpHeaders.SET_COOKIE, refreshTokenCookie.toString());

        return new AuthResponse(accessToken);
    }

    public void forgetPassword(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(
                () -> new UserNotFoundException(String.format("User with email %s not found.", email)));
        emailService.sendAccountResetPasswordEmail(user.getEmail(), jwtService.generateToken(user, 30 * 60 * 1000));
    }

    public void resetPassword(ResetPasswordRequest resp) {
        String email = jwtService.extractUsername(resp.token());
        User user = userRepository.findByEmail(email).orElseThrow(
                () -> new UserNotFoundException(String.format("User with email %s not found.", email)));

        if(jwtService.isTokenExpired(resp.token())) {
            emailService.sendAccountResetPasswordEmail(user.getEmail(), jwtService.generateToken(user, 30 * 60 * 1000));
            throw new InvalidTokenException("Link is expired.");
        }
        user.setPassword(passwordEncoder.encode(resp.password()));
        userRepository.save(user);
    }
}
