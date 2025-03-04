import { MainLayout } from "../../layouts";

export default function Order() {
    return (
        <MainLayout>
            <div className="container">
                <div className="row justify-content-center mt-5">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                {/* <image source="@{/vnpay-logo.png}" style = {{width : "200px"}}> */}
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
                                    <button type="submit" className="btn btn-primary">
                                        Thanh toán
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
