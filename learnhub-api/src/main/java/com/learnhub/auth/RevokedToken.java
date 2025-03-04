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
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "revoked_token")
public class RevokedToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "token", nullable = false, unique = true)
    private String token;

    @Column(name = "revoked_at", nullable = false)
    private LocalDateTime revokedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "account_id", nullable = false)
    private User user;

    @Column(name = "ip_address")
    private String ipAddress;

    @Column(name = "device_info")
    private String deviceInfo;


    public RevokedToken(User user,
                        String token,
                        String ipAddress,
                        String deviceInfo,
                        LocalDateTime revokedAt) {
        this.user = user;
        this.token = token;
        this.ipAddress = ipAddress;
        this.deviceInfo = deviceInfo;
        this.revokedAt = revokedAt;
    }

    public RevokedToken(RevokedTokenBuilder builder) {
        this.user = builder.user;
        this.token = builder.token;
        this.ipAddress = builder.ipAddress;
        this.deviceInfo = builder.deviceInfo;
        this.revokedAt = builder.revokedAt;
    }

    public static RevokedTokenBuilder from(User user, String token) {
        return new RevokedTokenBuilder(user, token);
    }

    public static class RevokedTokenBuilder {
        private User user;
        private String token;
        private String ipAddress;
        private String deviceInfo;
        private LocalDateTime revokedAt;

        public RevokedTokenBuilder(User user, String token) {
            this.user = user;
            this.token = token;
            this.revokedAt = LocalDateTime.now();
        }

        public RevokedTokenBuilder ipAddress(String ipAddress) {
            this.ipAddress = ipAddress;
            return this;
        }

        public RevokedTokenBuilder deviceInfo(String deviceInfo) {
            this.deviceInfo = deviceInfo;
            return this;
        }

        public RevokedToken build() {
            return new RevokedToken(this);
        }
    }


}
