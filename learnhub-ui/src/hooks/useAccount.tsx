import { useEffect, useState } from "react";
import { User } from "../types/User";
import { jwtDecode } from "jwt-decode";
import { getUserByEmail } from "../api/user";

const useAccount = (token: string | null) => {
    const [account, setAccount] = useState<User | null>(null);
    useEffect(() => {
        if (token) {
            const decoded = jwtDecode<{ sub: string }>(token);
            if (decoded) {
                const email = decoded.sub;
                getUserByEmail(email)
                    .then((acc) => setAccount(acc))
                    .catch((err) => {
                        console.error("Get user failed: ", err.message);
                        setAccount(null);
                    });
            }
        }
    }, [token]);
    return { account, setAccount };
};

export default useAccount;
