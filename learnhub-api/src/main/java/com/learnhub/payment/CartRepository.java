package com.learnhub.payment;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
    @Query(value = "select c from Cart c where c.user.userId = ?1", nativeQuery = true)
    Cart findCartByUser(Long userId);

    @Modifying
    @Query(value = "insert into cart (user_id,total,total_price) values (:userId, 0, 0)", nativeQuery = true)
    @Transactional
    void addCartToUser(@Param("userId") Long userId);

    @Modifying
    @Query(value = "update cart c set c.total_price=:totalPrice where c.cart_id=:cartId", nativeQuery = true)
    @Transactional
    void updateTotalAndTotalPriceCart(@Param("cartId") Long cartId, @Param("totalPrice") float totalPrice);
}
