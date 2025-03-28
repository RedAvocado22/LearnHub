import { Outlet } from "react-router-dom";
import NotificationsProvider from "../hooks/useNotifications";

export default function NotificationsRoute() {
    return (
        <NotificationsProvider>
            <Outlet />
        </NotificationsProvider>
    );
}
