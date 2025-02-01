import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { activateAccount } from "../api/auth";
import Swal from "sweetalert2";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";

export default function Login() {
    const { token } = useParams();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if (token) {
            activateAccount(token).then((result) => {
                if (result) {
                    Swal.fire({
                        icon: "success",
                        title: "Account activated",
                        text: "Activate account successfully. Please login."
                    });
                }
            });
        }
    }, [token]);

    const handleLogin = async () => {
        try {
            await login({ email, password });
            toast.success("Login successfully");
            navigate("/");
        } catch (err) {
            toast.warning((err as Error).message);
            setEmail("");
            setPassword("");
        }
    };
    return (
        <div className="account-form">
            <div className="account-head" style={{ backgroundImage: "url(assets/images/background/bg2.jpg)" }}>
                <a href="/">
                    <img src="assets/images/logo-white-2.png" alt="" />
                </a>
            </div>
            <div className="account-form-inner">
                <div className="account-container">
                    <div className="heading-bx left">
                        <h2 className="title-head">
                            Login to your <span>Account</span>
                        </h2>
                        <p>
                            Don't have an account? <a href="/register">Create one here</a>
                        </p>
                    </div>
                    <form className="contact-bx">
                        <div className="row placeani">
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <div className="input-group">
                                        <input
                                            type="email"
                                            placeholder="Your Email"
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
                                            placeholder="Your Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="form-control"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="form-group form-forget">
                                    <a href="/forgot-password" className="ml-auto">
                                        Forgot Password?
                                    </a>
                                </div>
                            </div>
                            <div className="col-lg-12 m-b30">
                                <button type="button" onClick={handleLogin} className="btn button-md">
                                    Login
                                </button>
                            </div>
                            <div className="col-lg-12">
                                <h6>Login with Social media</h6>
                                <div className="d-flex">
                                    <a className="btn flex-fill m-r5 facebook" href="#">
                                        <i className="fa fa-facebook"></i>Facebook
                                    </a>
                                    <a className="btn flex-fill m-l5 google-plus" href="#">
                                        <i className="fa fa-google-plus"></i>Google Plus
                                    </a>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
