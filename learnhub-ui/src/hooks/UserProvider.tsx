import { createContext, useContext } from "react";
import { User } from "../types/User";
import useAccount from "./useAccount";

interface AuthContextType {
    account: User | null;
    setAccount: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: React.JSX.Element }) => {
    const token = localStorage.getItem("access_token");
    const { account, setAccount } = useAccount(token);
    return <AuthContext.Provider value={{ account, setAccount }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthProvider;
