import { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function ManagerLogin() {
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            await login({ email, password });
            toast.success("Login successfully");
            navigate("/dashboard");
        } catch (err) {
            toast.warning((err as Error).message);
            setEmail("");
            setPassword("");
        }
    };

    return (
        <div className="account-form">
            <div className="account-form-inner">
                <div className="account-container">
                    <div className="heading-bx left">
                        <h2 className="title-head">
                            Manager <span>Login</span>
                        </h2>
                    </div>
                    <form className="contact-bx">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            placeholder="Username"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="form-control"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <div className="input-group">
                                        <input
                                            type="password"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="form-control"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12 m-b30">
                                <button type="button" onClick={handleLogin} className="btn button-md">
                                    Login
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
