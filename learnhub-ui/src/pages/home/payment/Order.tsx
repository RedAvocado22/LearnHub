import { isAxiosError } from "axios";
import { API } from "../../../api";
import { MainLayout } from "../../../layouts";
import { toast } from "react-toastify";
import { useState } from "react";
import { Link } from "react-router-dom";

interface Order {
    orderInfo: String;
    totalPrice: number;
}

export default function Order() {
    const handleSubmitAccountChange = async () => {
        try {
            console.log(1);
            const resp = await API.post("/students/createPayment", {
                orderInfo: "Order info",
                totalPrice: 299999
            });
            window.location.href = resp.data.data;
        } catch (err) {
            if (isAxiosError(err)) {
                toast.error(err.response?.data.message);
            }
        }
    };
    return (
        <MainLayout>
            <div className="container">
                <div className="row justify-content-center mt-5">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <h2 className="card-title">Thanh Toán Đơn Hàng</h2>
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="amount">Số tiền:</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="amount"
                                            name="amount"
                                            required
                                            value="299999"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="orderInfo">Thông tin đơn hàng:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="orderInfo"
                                            name="orderInfo"
                                            required
                                            value="Thanh toan don hang 2923"
                                        />
                                    </div>
                                    <a type="submit" className="btn btn-primary" onClick={handleSubmitAccountChange}>
                                        Thanh toán
                                    </a>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
