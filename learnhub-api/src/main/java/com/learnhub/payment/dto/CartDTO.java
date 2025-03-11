package com.learnhub.payment.dto;


import com.learnhub.payment.Cart;
import com.learnhub.payment.CartItem;

import java.util.List;


public record CartDTO(List<CartItem> cartItems, double totalPrice) {
    public static CartDTO from(Cart cart) {
        return new CartDTO(cart.getCartItems(), cart.getTotalPrice());
    }

}
