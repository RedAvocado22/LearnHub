import { useEffect, useState } from "react";
import { HomeLayout } from "../../../layouts";
import { API } from "../../../api";
import { NotificationType } from "../../../types/Notification";

interface Notification {
    id: number;
    type: NotificationType;
    message: string;
    timeSent: string;
}

export default function TeacherHome() {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const resp = await API.get("/notifications/me");
                setNotifications(resp.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchData();
    }, []);

    console.log(notifications);

    const managers = notifications.filter((notification) => notification.type === NotificationType.MANAGER);
    const students = notifications.filter((notification) => notification.type === NotificationType.STUDENT);

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
                                            aria-valuenow="50"
                                            aria-valuemin="0"
                                            aria-valuemax="100"></div>
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
                                            aria-valuenow="50"
                                            aria-valuemin="0"
                                            aria-valuemax="100"></div>
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
                                            aria-valuenow="50"
                                            aria-valuemin="0"
                                            aria-valuemax="100"></div>
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
                        <div className="col-lg-7 m-b30">
                            <div className="widget-box">
                                <div className="wc-title">
                                    <h4>Students</h4>
                                </div>
                                <div className="widget-inner">
                                    <div className="orders-list">
                                        <ul>
                                            {students.map((order, index) => (
                                                <li key={index}>
                                                    <span className="orders-title">
                                                        <a href="#" className="orders-title-name">
                                                            {order.message}
                                                        </a>
                                                        <span className="orders-info">Date {order.timeSent}</span>
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5 m-b30">
                            <div className="widget-box">
                                <div className="wc-title">
                                    <h4>Notifications</h4>
                                </div>
                                <div className="widget-inner">
                                    <div className="noti-box-list">
                                        <ul>
                                            {managers.map((notification, index) => (
                                                <li key={index}>
                                                    <span className="notification-text">{notification.message}</span>
                                                    <span className="notification-time">
                                                        <span>{notification.timeSent}</span>
                                                    </span>
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
