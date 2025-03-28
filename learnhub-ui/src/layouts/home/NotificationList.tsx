import { useEffect, useState } from "react";
import { useNotifications } from "../../hooks/useNotifications";
import NotificationCard from "./NotificationCard";

export default function NotificationList() {
    const { notifications } = useNotifications();
    const [_, setUpdate] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => setUpdate((prev) => prev + 1), 60000); // NOTE: Re-render every minutes
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <div className="ttr-notify-header">
                <span className="ttr-notify-text-top">{notifications.length} New</span>
                <span className="ttr-notify-text">User Notifications</span>
            </div>
            <div className="noti-box-list">
                <ul>
                    {notifications.map((notif, index) => (
                        <li key={index}>
                            <NotificationCard notif={notif} textWidth="120px" />
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
