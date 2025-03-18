package com.learnhub.auth;

import java.util.Optional;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RevokedTokenRepository extends CrudRepository<RevokedToken, Long> {
    Optional<RevokedToken> findByToken(String token);
}
