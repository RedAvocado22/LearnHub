import { Outlet } from "react-router-dom";
import ManageUsersProvider from "../hooks/useManageUsers";

export default function ManageUsersRoute() {
    return (
        <ManageUsersProvider>
            <Outlet />
        </ManageUsersProvider>
    );
}
