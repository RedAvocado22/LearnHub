package com.learnhub.auth.jwt;

import java.io.IOException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import com.learnhub.auth.RevokedTokenRepository;
import com.learnhub.user.User;
import com.learnhub.user.UserRepository;
import com.learnhub.user.UserStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
public class JwtFilter extends OncePerRequestFilter {
    private final UserRepository userRepository;
    private final RevokedTokenRepository revokedTokenRepository;
    private final JwtService jwtService;

    @Autowired
    public JwtFilter(
            UserRepository userRepository,
            RevokedTokenRepository revokedTokenRepository,
            JwtService jwtService) {
        this.userRepository = userRepository;
        this.revokedTokenRepository = revokedTokenRepository;
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

        if (SecurityContextHolder.getContext().getAuthentication() == null) {
            String authHeader = request.getHeader("Authorization");
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                filterChain.doFilter(request, response);
                return;
            }
            String accessToken = authHeader.substring(7);
            String username = jwtService.extractUsername(accessToken);
            if (username == null) {
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid token");
                return;
            }
            User user = userRepository.findByEmail(username).orElse(null);
            if (user == null ||
                user.getStatus() == UserStatus.UNACTIVE || user.getStatus() == UserStatus.SUSPENDED ||
                !jwtService.isTokenValid(accessToken, user) ||
                revokedTokenRepository.findByToken(accessToken).isPresent()) {
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid token");
                return;
            }

            UsernamePasswordAuthenticationToken authToken = 
                new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());

            authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(authToken);
        }
        filterChain.doFilter(request, response);
    }
}
