import Topbar from "./Topbar";
import Navbar from "./Navbar";
import { useAuth } from "../../hooks/UserProvider";
import { useEffect, useState } from "react";
export default function Header() {
    const [displayTopbar, setDisplayTopbar] = useState(true);
    const auth = useAuth();
    useEffect(() => {
        if (auth?.account) {
            setDisplayTopbar(false);
        }
    }, [auth]);
    return (
        <header className="header rs-nav">
            {displayTopbar && <Topbar />}
            <Navbar />
        </header>
    );
}
