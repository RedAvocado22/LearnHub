package com.learnhub.auth;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface TokenRepository extends CrudRepository<Token, Long> {
    @Query("select t from Token t where t.user.id = :user_id")
    List<Token> findByUser(@Param("user_id") Long userId);
    Optional<Token> findByAccessToken(String accessToken);
    Optional<Token> findByRefreshToken(String refreshToken);

    @Transactional
    @Modifying
    @Query("update Token t set t.revoked = true where t.user.id = :user_id")
    int revokeUserTokens(@Param("user_id") Long userId);
}
