package com.learnhub.payment;

import com.learnhub.course.Course;
import com.learnhub.course.CourseRepository;
import com.learnhub.payment.exception.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;

public class CartItemService {
    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private CartRepository cartRepository;

    public void addCourseToCartById(Long cartId, Long courseId) {
        Optional<Cart> cart = cartRepository.findById(cartId);
        Course course = courseRepository.findcoursebyid(courseId);
        if (cart.isEmpty() || course != null) {
            throw new NotFoundException("Cart or Course not found");
        }
        cart.get().setTotalPrice((float) (cart.get().getTotalPrice() + course.getPrice()));
        cartRepository.save(cart.get());
    }

    public void deleteAllCartItemById(Long cartId) {
        Optional<Cart> cart = cartRepository.findById(cartId);
        if (cart.isEmpty()) {
            throw new NotFoundException("Not found cart " + cart);
        }
        cartItemRepository.deleteAllCartItemByCartId(cartId);
        updateCartInformation(cartId);
    }

    public void deleteCartItemById(Long cartId, Long cartItemId) {
        if (checkItemExists(cartId, cartItemId)) {
            cartItemRepository.deleteCartItemByCart(cartId, cartItemId);
            updateCartInformation(cartId);
        } else {
            throw new NotFoundException("Not found cart item " + cartItemId + " in your cart");
        }
    }

    public void updateCartInformation(Long cartId) {
        Optional<Cart> cart = cartRepository.findById(cartId);
        int price = 0;
        for (CartItem cartItem : cart.get().getCartItems()) {
            price += cartItem.getCourse().getPrice();
        }
        cartRepository.updateTotalAndTotalPriceCart(cartId, price);
    }

    public boolean checkItemExists(Long cartId, Long cartItemId) {
        Optional<Cart> cart = cartRepository.findById(cartId);
        if (cart.isEmpty()) {
            throw new NotFoundException("Cart Not Found");
        }
        for (CartItem cartItem : cart.get().getCartItems()) {
            if (cartItem.getCardItemId() == cartItemId) {
                return true;
            }
        }
        return false;
    }
}
