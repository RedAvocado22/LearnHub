import { useEffect, useState } from "react";
import { API } from "../../api";
import { Course } from "../../types/Course";

interface Cart {
    id: number;
    totalPrice: number;
    cartItem: CartItem[];
}
interface CartItem {
    id: number;
    createdAt: Date;
    course: Course;
}
interface Course {
    id: number;
    name: string;
    category: { id: number; name: string };
    price: number;
    teacher: { id: number; name: string };
}
export default function Cart() {
    const [cart, setCart] = useState<Cart>();
    useEffect(() => {
        API.get("/public/usercart/{id}").then((resp) => {
            setCart(resp.data);
            console.log(cart);
        });
    });
    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <form action="#">
                        <div className="table-content table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th className="cart-product-name">Product Name</th>
                                        <th className="product-price">Category</th>
                                        <th className="product-price">Teacher</th>
                                        <th className="product-quantity">Description</th>
                                        <th className="product-quantity">Created at</th>

                                        <th className="product-subtotal">Price</th>
                                        <th className="product-remove">Remove</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart && cart.cartItem.length > 0 ? (
                                        cart.cartItem.map((cartitems) => (
                                            <tr>
                                                <td className="product-thumbnail">
                                                    <span className="amount">{cartitems.course.name}</span>
                                                </td>
                                                <td className="product-name">
                                                    <span className="amount">{cartitems.course.category.name}</span>
                                                </td>
                                                <td className="product-price">
                                                    <span className="amount">{cartitems.course.teacher.name}</span>
                                                </td>

                                                <td className="product-subtotal" id="total_${item.product.id}">
                                                    <span className="amount">{cartitems.course.price}</span>
                                                </td>
                                                <td className="product-subtotal" id="total_${item.product.id}">
                                                    <span className="amount">{cartitems.createdAt.getTime()}</span>
                                                </td>
                                                <td className="product-remove">
                                                    <a href="DeleteItemCart?productId=${item.product.id}">
                                                        <i className="fa fa-times"></i>
                                                    </a>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <p>Loading courses...</p>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <div className="row justify-content-end">
                            <div className="col-md-5 ">
                                <div className="cart-page-total">
                                    <h2>Cart totals</h2>
                                    <ul className="mb-20">
                                        <li id="totalCart">
                                            Total <span id="totalCartAmount">{cart?.totalPrice}</span>
                                        </li>
                                    </ul>
                                    <a href="order" className="tp-btn tp-color-btn banner-animation">
                                        Proceed to Checkout
                                    </a>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
