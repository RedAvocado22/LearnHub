package com.learnhub.payment;

import com.learnhub.course.CourseRepository;
import com.learnhub.payment.dto.CartDTO;
import com.learnhub.payment.exception.NotFoundException;
import com.learnhub.user.User;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartService {
    @Autowired
    private CartRepository cartRepository;


    @Autowired
    private CartItemRepository cartItemRepository;
    @Autowired
    private CourseRepository courseRepository;

    public List<CartItem> findAllCart(Cart cart) {
        List<CartItem> carts = cartItemRepository.getAllCartItemByCartId(cart.getId());
        return carts;
    }

    public Cart getCartByUser(User user) {
        return cartRepository.findCartByUserId(user.getId());
    }

    public void addCartForUser(Long userId) {
        if (cartRepository.findCartByUserId(userId) != null) {
            System.out.println(cartRepository.findCartByUserId(userId));
        }
        cartRepository.addCartToUser(userId);
    }

    public Cart findCartByUser(Long userId) {
        Cart cart = cartRepository.findCartByUser(userId);
        if (cart == null) {
            throw new NotFoundException("Not found cart of user: " + userId);
        }
        return cart;
    }

    public double getCartWithTotalPrice(Cart cart) {
        Double totalPrice = 0.0;
        var carts = findAllCart(cart);
        for (CartItem cartItem : carts) {
            totalPrice += cartItem.getCourse().getPrice();
        }
        return totalPrice;
    }
}
