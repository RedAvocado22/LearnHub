package com.learnhub.auth;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface RevokedTokenRepository extends CrudRepository<RevokedToken, Long> {
    @Query("select t from Token t where t.user.id = :user_id")
    List<RevokedToken> findByUser(@Param("user_id") Long userId);

    @Query("select t from Token t join User u on u.id = t.user.id and u.email = :email")
    List<RevokedToken> findByUserEmail(@Param("email") String email);

    Optional<RevokedToken> findByToken(String token);
}
