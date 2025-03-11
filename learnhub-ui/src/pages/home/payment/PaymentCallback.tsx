import { useSearchParams } from "react-router-dom";

export default function PaymentCallback() {
    const [params] = useSearchParams();
    const price = params.get("vnp_Amount");
    const transactionTime = params.get("vnp_PayDate");
    const transactionNo = params.get("vnp_TransactionNo");
    const vnp_ResponseCode = params.get("vnp_ResponseCode");
    console.log(vnp_ResponseCode);
    return (
        <div className="body py-5">
            <div className="container">
                <div className="w-50 m-auto">
                    {vnp_ResponseCode === "00" ? (
                        <h1 className="my-3 text-success text-center">Thanh toán thành công</h1>
                    ) : (
                        <h1 className="my-3 text-success text-center">Thanh toán thất bại</h1>
                    )}
                    <h2 className="my-2">Chi tiết đơn hàng</h2>
                    <table className="table table-bordered">
                        <tbody>
                            <tr>
                                <td>Thông tin đơn hàng:</td>
                                <td>
                                    <span>[order ID]</span>
                                </td>
                            </tr>
                            <tr>
                                <td>Tổng tiền:</td>
                                <td>
                                    <span>{price}</span>
                                </td>
                            </tr>
                            <tr>
                                <td>Thời gian thanh toán:</td>
                                <td>
                                    <span>{transactionTime}</span>
                                </td>
                            </tr>
                            <tr>
                                <td>Mã giao dịch:</td>
                                <td>
                                    <span>{transactionNo}</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <a href="/" className="btn btn-primary">
                        Về trang chủ
                    </a>
                </div>
            </div>
        </div>
    );
}
