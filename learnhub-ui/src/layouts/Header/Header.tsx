import Topbar from "./Topbar";
import Navbar from "./Navbar";
import { useAuth } from "../../hooks/useAuth";
export default function Header() {
    const { account } = useAuth();
    return (
        <header className="header rs-nav">
            {!account && <Topbar />}
            <Navbar />
        </header>
    );
}
