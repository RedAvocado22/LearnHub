package com.learnhub.auth;

import java.util.Optional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface RefreshTokenRepository extends CrudRepository<RefreshToken, Long> {
    @Query("select rt from RefreshToken rt join User u on rt.user.id = u.id where u.id = :id")
    Optional<RefreshToken> findByUser(@Param("id") Long id);
    Optional<RefreshToken> findByToken(String token);
}
