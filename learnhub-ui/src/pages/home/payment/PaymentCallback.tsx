import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { API } from "../../../api";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import { MainLayout } from "../../../layouts";

interface CoursePurchaseReq {
    user_id: string;
    course_id: string;
    responseCode: string;
    price: string;
    transaction_id: string;
}

export default function PaymentCallback() {
    const [params] = useSearchParams();
    const price = params.get("vnp_Amount");
    const transactionTime = params.get("vnp_PayDate");
    const transactionNo = params.get("vnp_TransactionNo");
    const vnp_ResponseCode = params.get("vnp_ResponseCode");
    const orderInfo = params.get("vnp_OrderInfo");
    const [courseId, userId] = orderInfo ? orderInfo.split("&&") : ["", ""];

    const [coursePurchase, setCoursePurchase] = useState<CoursePurchaseReq>({
        user_id: userId,
        course_id: courseId,
        price: price || "",
        responseCode: vnp_ResponseCode || "",
        transaction_id: transactionNo || ""
    });

    useEffect(() => {
        const purchaseCourse = async () => {
            try {
                const resp = await API.post("/users/purchase", {
                    user_id: userId,
                    course_id: courseId,
                    price: price || "",
                    responseCode: vnp_ResponseCode,
                    transactionCode: transactionNo || ""
                });
                console.log(resp.data);
            } catch (err) {
                if (isAxiosError(err)) {
                    toast.error(err.response?.data.message);
                } else {
                    toast.error("An unexpected error occurred");
                }
            }
        };

        purchaseCourse();
    }, [userId, courseId, price, vnp_ResponseCode, transactionNo]);

    return (
        <MainLayout>
            <div className="body py-5" style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
                <div className="container">
                    <div
                        className="w-50 m-auto p-4"
                        style={{
                            backgroundColor: "white",
                            borderRadius: "8px",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
                        }}>
                        {vnp_ResponseCode === "00" ? (
                            <h1 className="my-3 text-success text-center">Payment Successful</h1>
                        ) : (
                            <h1 className="my-3 text-danger text-center">Payment Failed</h1>
                        )}
                        <h2 className="my-2">Order Details</h2>
                        <table className="table table-bordered">
                            <tbody>
                                <tr>
                                    <td>Order Information:</td>
                                    <td>
                                        <span></span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Price:</td>
                                    <td>
                                        <span>{price ? (parseInt(price) / 100).toLocaleString() : ""} VND</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Payment Time:</td>
                                    <td>
                                        <span>{transactionTime}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Transaction ID:</td>
                                    <td>
                                        <span>{transactionNo}</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <a href="/" className="btn btn-primary w-100">
                            Back to Home Page
                        </a>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
