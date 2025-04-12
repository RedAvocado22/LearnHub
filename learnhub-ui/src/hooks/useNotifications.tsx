import { createContext, useContext, useEffect, useState } from "react";
import { API } from "../api";
import { toast } from "react-toastify";
import { NotifContextType, NotificationType } from "../types/Notification";

export interface Notification {
    id: number;
    type: NotificationType;
    context: NotifContextType;
    timeSent: Date;
}

interface NotificationsContextType {
    notifications: Notification[];
    refreshNotifs: () => Promise<void>;
    deleteNotif: (id: number | null | undefined) => Promise<void>;
}

const NotificationsContext = createContext<NotificationsContextType | null>(null);

export default function NotificationsProvider({ children }: { children: React.ReactNode }) {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [ready, setReady] = useState(false);

    const fetchNotifs = async () => {
        try {
            const resp = await API.get("/notifications/me");
            if (resp.data) {
                setNotifications(resp.data);
            }
        } catch (err) {}
    };

    const deleteNotif = async (id: number | null | undefined) => {
        if (!id) return;
        try {
            const resp = await API.delete(`/notifications/${id}`);
            if (resp.status === 200) {
                await fetchNotifs();
            }
        } catch (err) {
            toast.error("Failed to remove notification");
        }
    };

    useEffect(() => {
        fetchNotifs().finally(() => setReady(true));
        const id = setInterval(fetchNotifs, 10000);
        return () => {
            clearInterval(id);
            setReady(false);
        };
    }, []);

    return (
        <NotificationsContext.Provider value={{ notifications, refreshNotifs: fetchNotifs, deleteNotif }}>
            {ready ? children : null}
        </NotificationsContext.Provider>
    );
}

export const useNotifications = () => {
    const context = useContext(NotificationsContext);
    if (!context) {
        throw new Error("useNotifications must be used within an NotificationsProvider");
    }
    return context;
};
