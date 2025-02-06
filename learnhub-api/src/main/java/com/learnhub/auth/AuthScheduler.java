package com.learnhub.auth;

import com.learnhub.auth.jwt.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class AuthScheduler {
    private final RevokedTokenRepository revokedTokenRepository;
    private final JwtService jwtService;

    @Autowired
    public AuthScheduler(RevokedTokenRepository revokedTokenRepository, JwtService jwtService) {
        this.revokedTokenRepository = revokedTokenRepository;
        this.jwtService = jwtService;
    }

    @Scheduled(cron = "0 0 0 * * *") // NOTE: Run everyday at midnight
    @Transactional
    public void cleanExpiredToken() {
        revokedTokenRepository.findAll().forEach(token -> {
            if (jwtService.isTokenExpired(token.getToken())) {
                revokedTokenRepository.delete(token);
            }
        });
    }
}
