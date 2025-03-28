import { HomeLayout } from "../../../layouts";
import { useNotifications } from "../../../hooks/useNotifications";
import NotificationCard from "../../../layouts/home/NotificationCard";

export default function TeacherHome() {
    const { notifications } = useNotifications();

    return (
        <HomeLayout>
            <main className="ttr-wrapper">
                <div className="container-fluid">
                    {/* Card */}
                    <div className="row">
                        <div className="col-md-6 col-lg-3 col-xl-4 col-sm-6 col-12">
                            <div className="widget-card widget-bg1">
                                <div className="wc-item">
                                    <h4 className="wc-title">Total Profit</h4>
                                    <span className="wc-des">All Customs Value</span>
                                    <span className="wc-stats">
                                        $<span className="counter">18</span>M
                                    </span>
                                    <div className="progress wc-progress">
                                        <div
                                            className="progress-bar"
                                            role="progressbar"
                                            style={{ width: "78%" }}
                                            aria-valuenow={50}
                                            aria-valuemin={0}
                                            aria-valuemax={100}></div>
                                    </div>
                                    <span className="wc-progress-bx">
                                        <span className="wc-change">Change</span>
                                        <span className="wc-number ml-auto">78%</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3 col-xl-4 col-sm-6 col-12">
                            <div className="widget-card widget-bg2">
                                <div className="wc-item">
                                    <h4 className="wc-title">New Feedbacks</h4>
                                    <span className="wc-des">Customer Review</span>
                                    <span className="wc-stats counter">120</span>
                                    <div className="progress wc-progress">
                                        <div
                                            className="progress-bar"
                                            role="progressbar"
                                            style={{ width: "88%" }}
                                            aria-valuenow={50}
                                            aria-valuemin={0}
                                            aria-valuemax={100}></div>
                                    </div>
                                    <span className="wc-progress-bx">
                                        <span className="wc-change">Change</span>
                                        <span className="wc-number ml-auto">88%</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3 col-xl-4 col-sm-6 col-12">
                            <div className="widget-card widget-bg3">
                                <div className="wc-item">
                                    <h4 className="wc-title">New Orders</h4>
                                    <span className="wc-des">Fresh Order Amount</span>
                                    <span className="wc-stats counter">772</span>
                                    <div className="progress wc-progress">
                                        <div
                                            className="progress-bar"
                                            role="progressbar"
                                            style={{ width: "65%" }}
                                            aria-valuenow={50}
                                            aria-valuemin={0}
                                            aria-valuemax={100}></div>
                                    </div>
                                    <span className="wc-progress-bx">
                                        <span className="wc-change">Change</span>
                                        <span className="wc-number ml-auto">65%</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Card END */}
                    <div className="row">
                        <div className="col-lg-12 m-b30">
                            <div className="widget-box">
                                <div className="wc-title">
                                    <h4>Notifications</h4>
                                </div>
                                <div className="widget-inner">
                                    <div className="noti-box-list">
                                        <ul>
                                            {notifications.map((notification, index) => (
                                                <li key={index}>
                                                    <NotificationCard notif={notification} />
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </HomeLayout>
    );
}
