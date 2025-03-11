package com.learnhub.payment;

import com.learnhub.payment.dto.CartDTO;
import com.learnhub.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

public class CartController {
    @Autowired
    CartService cartService;
    @Autowired
    CartItemService cartItemService;

    @GetMapping("/usercart/{id}")
    public ResponseEntity<CartResponse> getCartByUser(@PathVariable(name = "id") Long id) {
        return ResponseEntity.ok().body(CartResponse.from(cartService.findCartByUser(id)));
    }

    @PostMapping("/addcart/{id}")
    public ResponseEntity<String> addCartForUser(@PathVariable(name = "userId") Long userId) {
        cartService.addCartForUser(userId);
        return ResponseEntity.ok("Add cart to user successfully");
    }

    @PostMapping("/addcart/{userId}/{courseId}")
    public ResponseEntity<?> addBookToCart(@PathVariable(name = "cartId") Long cartId,
                                           @PathVariable(name = "courseId") long bookId
    ) {
        cartItemService.addCourseToCartById(cartId, bookId);
        return ResponseEntity.ok("Add Book To Cart Successfully");
    }

    @GetMapping("/student/me/cart")
    public ResponseEntity<CartDTO> getCart(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(CartDTO.from(cartService.getCartByUser(user)));
    }
}
