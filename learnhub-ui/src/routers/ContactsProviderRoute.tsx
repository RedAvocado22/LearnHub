import { Outlet } from "react-router-dom";
import ContactsProvider from "../hooks/useContacts";

export default function ContactsProviderRoute() {
    return (
        <ContactsProvider>
            <Outlet />
        </ContactsProvider>
    );
}
