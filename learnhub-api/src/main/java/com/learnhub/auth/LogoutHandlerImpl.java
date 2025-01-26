package com.learnhub.auth;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Component;

@Component
public class LogoutHandlerImpl implements LogoutHandler {
    private final TokenRepository tokenRepository;

    @Autowired
    public LogoutHandlerImpl(TokenRepository tokenRepository) {
        this.tokenRepository = tokenRepository;
    }

    @Override
    public void logout(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication) {
        // NOTE: Chả hiểu sao cái Authentication đến đây thì null, cáu vl
        // Tạm thời phải tự parse header
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        }
        else {
            String accessToken = authHeader.substring(7);
            Token token = tokenRepository.findByAccessToken(accessToken).orElse(null);
            if (token != null) {
                tokenRepository.revokeUserTokens(token.getUser().getId());
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
