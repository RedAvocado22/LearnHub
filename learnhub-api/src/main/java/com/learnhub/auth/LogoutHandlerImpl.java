package com.learnhub.auth;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import com.learnhub.auth.jwt.JwtService;
import com.learnhub.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Component;

@Component
public class LogoutHandlerImpl implements LogoutHandler {
    private final UserRepository userRepository;
    private final RevokedTokenRepository revokedTokenRepository;
    private final JwtService jwtService;

    @Autowired
    public LogoutHandlerImpl(
            UserRepository userRepository,
            RevokedTokenRepository revokedTokenRepository,
            JwtService jwtService) {
        this.userRepository = userRepository;
        this.revokedTokenRepository = revokedTokenRepository;
        this.jwtService = jwtService;
    }

    @Override
    public void logout(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String accessToken = authHeader.substring(7);
            String refreshToken = jwtService.getTokenFromCookie(request, "refresh_token");
            String email = jwtService.extractUsername(accessToken);
            if (email != null && refreshToken != null) {
                userRepository.findByEmail(email).ifPresent(user -> {
                    String ipAddress = request.getRemoteAddr();
                    String deviceInfo = request.getHeader(HttpHeaders.USER_AGENT);
                    revokedTokenRepository.save(RevokedToken.builder()
                            .user(user)
                            .token(accessToken)
                            .ipAddress(ipAddress)
                            .deviceInfo(deviceInfo)
                            .build());
                    revokedTokenRepository.save(RevokedToken.builder()
                            .user(user)
                            .token(refreshToken)
                            .ipAddress(ipAddress)
                            .deviceInfo(deviceInfo)
                            .build());
                });
            }
        }

        SecurityContextHolder.clearContext();
        ResponseCookie rtCookie = ResponseCookie.from("refresh_token", "")
            .path("/")
            .httpOnly(true)
            .secure(true)
            .maxAge(0)
            .sameSite("None")
            .build();
        response.addHeader(HttpHeaders.SET_COOKIE, rtCookie.toString());
    }
}
