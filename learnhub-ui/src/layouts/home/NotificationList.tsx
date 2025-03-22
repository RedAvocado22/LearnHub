import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";

interface Notification {
    from: string;
    time: Date;
}

// NOTE: This is mock list, pass this as props later
const notifs: Notification[] = [
    {
        from: "Sneha Jogi",
        time: new Date(new Date().setHours(2, 14, 0, 0))
    },
    {
        from: "Your order is placed",
        time: new Date(Date.now() - 7 * 60 * 1000)
    },
    {
        from: "Your item is shipped",
        time: new Date("2024-05-02")
    },
    {
        from: "Sneha Jogi",
        time: new Date("2024-07-14")
    },
    {
        from: "Sneha Jogi",
        time: new Date(Date.now() - 15 * 60 * 1000)
    }
];

export default function NotificationList() {
    const [notifications, setNotifications] = useState<Notification[]>(notifs);
    const [_, setUpdate] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => setUpdate((prev) => prev + 1), 60000); // NOTE: Re-render every minutes
        return () => clearInterval(interval);
    }, []);

    const handleCloseNotif = (index: number) => {
        setNotifications((prev) => prev.filter((_, i) => i !== index));
    };

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
                            <span className="notification-icon dashbg-yellow">
                                <i className="fa fa-bullhorn"></i>
                            </span>
                            <span className="notification-text">
                                <span>{notif.from}</span> sent you a message.
                            </span>
                            <span className="notification-time">
                                <a href="#" onClick={() => handleCloseNotif(index)} className="fa fa-close"></a>
                                <span> {formatDistanceToNow(notif.time, { addSuffix: true })}</span>
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
