package com.learnhub.payment;

import com.learnhub.course.CourseRepository;
import com.learnhub.payment.exception.NotFoundException;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class CartService {
    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CourseRepository courseRepository;

    public List<Cart> findAllCart() {
        List<Cart> carts = cartRepository.findAll();
        return carts;
    }

    public void addCartForUser(Long userId) {
        if (cartRepository.findCartByUser(userId) != null) {
            System.out.println(cartRepository.findCartByUser(userId));
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
}
