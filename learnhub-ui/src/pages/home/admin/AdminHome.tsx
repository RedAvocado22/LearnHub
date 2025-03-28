import { useEffect, useState } from "react";
import { HomeLayout } from "../../../layouts";
import AdminChart from "./AdminChart";
import { API } from "../../../api";
import { useNotifications } from "../../../hooks/useNotifications";
import NotificationCard from "../../../layouts/home/NotificationCard";

interface Stats {
    totalProfits: number;
    totalCourses: number;
    totalPurchases: number;
    totalUsers: number;
}

export default function AdminHome() {
    const { notifications } = useNotifications();
    const [stats, setStats] = useState<Stats | null>(null);
    useEffect(() => {
        API.get("/users/admin/stats").then((resp) => setStats(resp.data));
    }, []);

    return (
        <HomeLayout>
            <main className="ttr-wrapper">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-6 col-lg-3 col-xl-3 col-sm-6 col-12">
                            <div className="widget-card widget-bg1">
                                <div className="wc-item">
                                    <h4 className="wc-title">Total Profit</h4>
                                    <span className="wc-des">All Courses</span>
                                    <span className="wc-stats">
                                        $<span className="counter">{stats?.totalProfits}</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3 col-xl-3 col-sm-6 col-12">
                            <div className="widget-card widget-bg2">
                                <div className="wc-item">
                                    <h4 className="wc-title">Total Courses</h4>
                                    <span className="wc-des">Pulished Courses</span>
                                    <span className="wc-stats counter">{stats?.totalCourses}</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3 col-xl-3 col-sm-6 col-12">
                            <div className="widget-card widget-bg3">
                                <div className="wc-item">
                                    <h4 className="wc-title">Total Purchases</h4>
                                    <span className="wc-des">Student Orders</span>
                                    <span className="wc-stats counter">{stats?.totalPurchases}</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3 col-xl-3 col-sm-6 col-12">
                            <div className="widget-card widget-bg4">
                                <div className="wc-item">
                                    <h4 className="wc-title">Total Users</h4>
                                    <span className="wc-des">Joined Users</span>
                                    <span className="wc-stats counter">{stats?.totalUsers}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-8 m-b30">
                            <div className="widget-box">
                                <div className="wc-title">
                                    <h4>Statistics</h4>
                                </div>
                                <div className="widget-inner">
                                    <AdminChart />
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 m-b30">
                            <div className="widget-box">
                                <div className="wc-title">
                                    <h4>Notifications</h4>
                                </div>
                                <div className="widget-inner">
                                    <div className="noti-box-list">
                                        <ul>
                                            {notifications.map((notif, index) => (
                                                <li key={index}>
                                                    <NotificationCard notif={notif} />
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
