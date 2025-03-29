import { isAxiosError } from "axios";
import { API } from "../../../api";
import { MainLayout } from "../../../layouts";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

interface Order {
    orderInfo: string;
    totalPrice: number;
}

export default function Order() {
    const location = useLocation();
    const { course, userId } = location.state || {};
    const handleSubmitAccountChange = async () => {
        try {
            console.log(1);
            const resp = await API.post("/users/payment", {
                orderInfo: course.id + "&&" + userId,
                totalPrice: course.price
            });
            window.location.href = resp.data.data;
        } catch (err) {
            if (isAxiosError(err)) {
                toast.error(err.response?.data.message);
            }
        }
    };

    const [rate, setRate] = useState(23000);

    useEffect(() => {
        const fetchRate = async () => {
            try {
                const response = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
                const data = await response.json();
                setRate(data.rates.VND);
            } catch (error) {
                console.error("Error fetching exchange rate:", error);
                setRate(23000); // fallback rate
            }
        };
        fetchRate();
    }, []);

    return (
        <MainLayout>
            <div className="container">
                <div className="row justify-content-center my-5">
                    <div className="col-6 pt-5">
                        <div className="card">
                            <div className="card-body">
                                <h2 className="card-title">Order Payment</h2>
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="amount">Price (VND):</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="amount"
                                            name="amount"
                                            required
                                            readOnly
                                            value={course.price * rate}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="orderInfo">Order information:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="orderInfo"
                                            name="orderInfo"
                                            required
                                            value={`${course.name} payment`}
                                        />
                                    </div>
                                    <a type="submit" className="btn btn-primary" onClick={handleSubmitAccountChange}>
                                        Pay
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
