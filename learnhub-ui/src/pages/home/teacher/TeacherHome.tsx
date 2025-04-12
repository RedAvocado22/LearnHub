import { HomeLayout } from "../../../layouts";
import { useNotifications } from "../../../hooks/useNotifications";
import NotificationCard from "../../../layouts/home/NotificationCard";

export default function TeacherHome() {
    const { notifications } = useNotifications();

    return (
        <HomeLayout>
            <main className="ttr-wrapper">
                <div className="container-fluid">
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
