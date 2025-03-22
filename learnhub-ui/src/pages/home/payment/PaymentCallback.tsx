import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { API } from "../../../api";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";
interface CoursePurchaseReq {
    user_id: String;
    course_id: String;
    responseCode: String;
    price: String;
    transaction_id: String;
}
export default function PaymentCallback() {
    const [params] = useSearchParams();

    const price = params.get("vnp_Amount");
    const transactionTime = params.get("vnp_PayDate");
    const transactionNo = params.get("vnp_TransactionNo");
    const vnp_ResponseCode = params.get("vnp_ResponseCode");
    const orderInfo = params.get("vnp_OrderInfo");
    const [courseId, userId] = orderInfo.split("&&");
    const [coursePurchase, setCoursePurchase] = useState<CoursePurchaseReq>({
        user_id: userId,
        course_id: courseId,
        price: price || "",
        responseCode: vnp_ResponseCode || "",
        transaction_id: transactionNo || ""
    });

    useEffect(() => {
        try {
            const resp = API.post("/users/purchase", {
                user_id: userId,
                course_id: courseId,
                price: price || "",
                responseCode: vnp_ResponseCode,
                transactionCode: transactionNo || ""
            });
            console.log(coursePurchase);
        } catch (err) {
            if (isAxiosError(err)) {
                toast.error(err.response?.data.message);
            }
        }
    });
    return (
        <div className="body py-5">
            <div className="container">
                <div className="w-50 m-auto">
                    {vnp_ResponseCode === "00" ? (
                        <h1 className="my-3 text-success text-center">Payment Successfully</h1>
                    ) : (
                        <h1 className="my-3 text-success text-center">Payment failed</h1>
                    )}
                    <h2 className="my-2">Order details</h2>
                    <table className="table table-bordered">
                        <tbody>
                            <tr>
                                <td>Order information:</td>
                                <td>
                                    <span></span>
                                </td>
                            </tr>
                            <tr>
                                <td>Pricce:</td>
                                <td>
                                    <span>{price}</span>
                                </td>
                            </tr>
                            <tr>
                                <td>Payment time:</td>
                                <td>
                                    <span>{transactionTime}</span>
                                </td>
                            </tr>
                            <tr>
                                <td>Transaction Id:</td>
                                <td>
                                    <span>{transactionNo}</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <a href="/" className="btn btn-primary">
                        Back to home page
                    </a>
                </div>
            </div>
        </div>
    );
}
