package com.learnhub.payment;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    @Modifying
    @Query(value = "insert into cart_item(cart_id,course_id) values (:cartId,:courseId)", nativeQuery = true)
    @Transactional
    void addCourseToCart(@Param("cartId") Long cartId, @Param("courseId") Long courseId);

    @Modifying
    @Query(value = "delete from cart_item where cart_id=:cartId and cart_item_id=:cartItemId", nativeQuery = true)
    @Transactional
    void deleteCartItemByCart(@Param("cartId") Long cartId, @Param("cartItemId") Long cartItemId);

    @Modifying
    @Query(value = "delete from cart_item where cart_id=:cartId", nativeQuery = true)
    @Transactional
    void deleteAllCartItemByCartId(@Param("cartId") Long cartId);
}
