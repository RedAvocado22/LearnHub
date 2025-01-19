package com.learnhub.auth;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import com.learnhub.auth.jwt.JwtService;
import com.learnhub.user.User;
import com.learnhub.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Component;

@Component
public class LogoutHandlerImpl implements LogoutHandler {
    private final RefreshTokenRepository refreshTokenRepository;
    private final JwtService jwtService;
    private final UserRepository userRepository;

    @Autowired
    public LogoutHandlerImpl(
            RefreshTokenRepository refreshTokenRepository,
            JwtService jwtService,
            UserRepository userRepository) {
        this.refreshTokenRepository = refreshTokenRepository;
        this.jwtService = jwtService;
        this.userRepository = userRepository;
    }

    @Override
    public void logout(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication) {
        final String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }
        final String jwt = authHeader.substring(7);
        final String email = jwtService.extractUsername(jwt);
        User user = userRepository.findByEmail(email).orElseThrow();
        RefreshToken stored = refreshTokenRepository.findByUser(user.getId()).orElse(null);
        if (stored != null) {
            refreshTokenRepository.delete(stored);
            SecurityContextHolder.clearContext();
        }

        ResponseCookie rtCookie = ResponseCookie.from("refresh_token", "")
            .path("/")
            .httpOnly(true)
            .secure(true)
            .maxAge(0)
            .build();
        response.addHeader("Set-Cookie", rtCookie.toString());
    }
}
