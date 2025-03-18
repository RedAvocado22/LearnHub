import { createContext, useContext, useEffect, useState } from "react";
import { API } from "../api";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface Contact {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    resolved: boolean;
    createdAt: string;
}

interface ContactsContextType {
    contacts: Contact[];
    refreshContacts: () => void;
    deleteContacts: (contactIds: number[]) => void;
}

const ContactsContext = createContext<ContactsContextType | null>(null);

export default function ContactsProvider({ children }: { children: React.ReactNode }) {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [ready, setReady] = useState(false);
    const navigate = useNavigate();
    const fetchContacts = async () => {
        try {
            const resp = await API.get("/contacts");
            if (resp.data) {
                setContacts(resp.data);
            }
        } catch (err) {
            if (isAxiosError(err)) {
                console.error(err.response?.data);
            } else {
                console.error((err as Error).message);
            }
            toast.error("Failed to get contacts.");
        }
    };

    const deleteContacts = async (ids: number[]) => {
        if (ids.length === 0) return;
        for (const id of ids) {
            try {
                const resp = await API.delete(`/contacts/${id}`);
                if (resp.status === 200) {
                    toast.success(`Delete contact's id ${id} successfully`);
                    await fetchContacts();
                    navigate("/admin/contacts");
                }
            } catch (err) {
                if (isAxiosError(err)) {
                    console.error(err.response?.data);
                } else {
                    console.error((err as Error).message);
                }
                toast.error(`Delete contact's id ${id} failed`);
            }
        }
    };

    useEffect(() => {
        fetchContacts().finally(() => {
            setReady(true);
        });
        const id = setInterval(fetchContacts, 10000);
        return () => {
            clearInterval(id);
            setReady(false);
        };
    }, []);

    return (
        <ContactsContext.Provider value={{ contacts, refreshContacts: fetchContacts, deleteContacts: deleteContacts }}>
            {ready ? children : null}
        </ContactsContext.Provider>
    );
}

export const useContacts = () => {
    const context = useContext(ContactsContext);
    if (!context) {
        throw new Error("useContacts must be used within an ContactsProvider");
    }
    return context;
};
