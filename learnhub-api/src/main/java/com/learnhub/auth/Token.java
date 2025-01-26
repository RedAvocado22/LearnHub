package com.learnhub.auth;

import java.time.LocalDateTime;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import com.learnhub.user.User;

@Entity
@Table(name = "token")
public class Token {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "access_token", unique = true)
    private String accessToken;

    @Column(name = "refresh_token", unique = true)
    private String refreshToken;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "revoked")
    private boolean revoked;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "account_id", nullable = false)
    private User user;

    @Column(name = "ip_address")
    private String ipAddress;

    @Column(name = "device_info")
    private String deviceInfo;

    public Token() {}

    public Token(User user,
            String accessToken,
            String refreshToken,
            String ipAddress,
            String deviceInfo,
            LocalDateTime createdAt,
            boolean revoked) {
        this.user = user;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.ipAddress = ipAddress;
        this.deviceInfo = deviceInfo;
        this.createdAt = createdAt;
        this.revoked = revoked;
    }

    public Token(TokenBuilder builder) {
        this.user = builder.user;
        this.accessToken = builder.accessToken;
        this.refreshToken = builder.refreshToken;
        this.ipAddress = builder.ipAddress;
        this.deviceInfo = builder.deviceInfo;
        this.createdAt = builder.createdAt;
        this.revoked = builder.revoked;
    }

    public static TokenBuilder builder() {
        return new TokenBuilder();
    }

    public static class TokenBuilder {
        private User user;
        private String accessToken;
        private String refreshToken;
        private String ipAddress;
        private String deviceInfo;
        private LocalDateTime createdAt = LocalDateTime.now();
        private boolean revoked = false;
        public TokenBuilder user(User user) { this.user = user; return this; }
        public TokenBuilder accessToken(String accessToken) { this.accessToken = accessToken; return this; }
        public TokenBuilder refreshToken(String refreshToken) { this.refreshToken = refreshToken; return this; }
        public TokenBuilder ipAddress(String ipAddress) { this.ipAddress = ipAddress; return this; }
        public TokenBuilder deviceInfo(String deviceInfo) { this.deviceInfo = deviceInfo; return this; }
        public TokenBuilder revoked(boolean revoked) { this.revoked = revoked; return this; }
        public Token build() {
            return new Token(this);
        }
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public boolean isRevoked() {
        return revoked;
    }

    public void setRevoked(boolean revoked) {
        this.revoked = revoked;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getIpAddress() {
        return ipAddress;
    }

    public void setIpAddress(String ipAddress) {
        this.ipAddress = ipAddress;
    }

    public String getDeviceInfo() {
        return deviceInfo;
    }

    public void setDeviceInfo(String deviceInfo) {
        this.deviceInfo = deviceInfo;
    }
}
