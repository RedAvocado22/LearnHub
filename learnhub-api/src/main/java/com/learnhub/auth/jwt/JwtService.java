package com.learnhub.auth.jwt;

import java.time.Duration;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import javax.crypto.SecretKey;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {
    private final String secretKey;
    
    @Value("${spring.application.security.jwt.expiration}")
    private long jwtExpiration;

    @Value("${spring.application.security.jwt.refresh-token.expiration}")
    private long refreshExpiration;

    public JwtService() {
        //try {
        //    KeyGenerator generator = KeyGenerator.getInstance("HmacSHA256");
        //    SecretKey sk = generator.generateKey();
        //    secretKey = Base64.getEncoder().encodeToString(sk.getEncoded());
        //} catch (NoSuchAlgorithmException e) {
        //    throw new RuntimeException(e);
        //}
        // NOTE: Khi nào deploy lên prod chạy 24/7 thì mình dùng cái bên trên
        secretKey = "SuperSecretREFRESHKey1234567890abcdefghijklmnopqrstuvwxyz/+"; // fix cứng cho tiện dev, khi khởi động lại server đống token vẫn parse được
    }

    public String generateToken(UserDetails userDetails, long expiresMillis) {
        return buildToken(new HashMap<>(), userDetails, expiresMillis);
    }
    
    public String generateAccessToken(UserDetails userDetails) {
        return generateAccessToken(new HashMap<>(), userDetails);
    }
    
    public String generateAccessToken(Map<String, Object> extras, UserDetails userDetails) {
        return buildToken(extras, userDetails, jwtExpiration);
    }

    public String generateRefreshToken(UserDetails userDetails) {
        return buildToken(new HashMap<>(), userDetails, refreshExpiration);
    }

    // NOTE: Server với Client chạy port khác nhau nên muốn gửi cookie phải set Secure=true và SameSite=None
    // https://stackoverflow.com/questions/46288437/set-cookies-for-cross-origin-requests
    public ResponseCookie generateRefreshTokenCookie(String token) {
        return ResponseCookie.from("refresh_token", token)
            .path("/")
            .maxAge(Duration.ofMillis(refreshExpiration))
            .httpOnly(true)
            .secure(true)
            .sameSite("None")
            .build();
    }

    private SecretKey getSignKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    private String buildToken(Map<String, Object> extras, UserDetails userDetails, long expiresMillis) {
        return Jwts.builder()
            .claims(extras)
            .claim("authorities", userDetails.getAuthorities())
            .subject(userDetails.getUsername())
            .issuedAt(new Date(System.currentTimeMillis()))
            .expiration(new Date(System.currentTimeMillis() + expiresMillis))
            .signWith(getSignKey())
            .compact();
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser()
            .verifyWith(getSignKey())
            .build()
            .parseSignedClaims(token) // NOTE: This shit throws JwtException
            .getPayload();
    }

    public <T> T extractClaim(String token, Function<Claims, T> resolver) {
        final Claims claims = extractAllClaims(token);
        return resolver.apply(claims);
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }
    
    public String getTokenFromCookie(HttpServletRequest req, String name) {
        Cookie[] cookies = req.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals(name)) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }
}
