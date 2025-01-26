package com.learnhub.auth.jwt;

import java.io.IOException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import com.learnhub.auth.Token;
import com.learnhub.auth.TokenRepository;
import com.learnhub.user.User;
import com.learnhub.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;

@Component
public class JwtFilter extends OncePerRequestFilter {
    private final TokenRepository tokenRepository;
    private final UserService userService;
    private final JwtService jwtService;

    @Autowired
    public JwtFilter(
            TokenRepository tokenRepository,
            UserService userService,
            JwtService jwtService) {
        this.tokenRepository = tokenRepository;
        this.userService = userService;
        this.jwtService = jwtService;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {
        if (request.getServletPath().contains("/api/v1/auth")) {
            filterChain.doFilter(request, response);
            return;
        }

        final String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }
        try {
            String jwt = authHeader.substring(7);
            String username = jwtService.extractUsername(jwt);
            if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                User user = userService.getUserByEmail(username);
                Token token = tokenRepository.findByAccessToken(jwt).orElse(null);
                if (!jwtService.isTokenValid(jwt, user) || token == null || token.isRevoked()) {
                    response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Token is not valid");
                    return;
                }

                UsernamePasswordAuthenticationToken authToken = 
                    new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());

                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
            filterChain.doFilter(request, response);
        } catch (ExpiredJwtException e) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Token is expired");
        } catch (SignatureException e) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Token is invalid");
        }
    }
}
