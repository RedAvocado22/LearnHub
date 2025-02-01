import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../api";

export default function ResetPassword() {
    const { token } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");
    const [display, setDisplay] = useState(false);

    async function handleSubmit() {
        try {
            const resp = await API.post("/auth/reset-password", { password, token });

            if (resp.status === 200) {
                toast.success("Reset your password successful.");
                navigate("/login");
            } else {
                throw new Error("Something wrong!");
            }
        } catch (error) {
            toast.error((error as Error).message);
        }
    }

    useEffect(() => {
        if (password.length != 0 && confPassword.length != 0 && password === confPassword) {
            setDisplay(true);
        } else {
            setDisplay(false);
        }
    }, [password, confPassword]);
    return (
        <div className="account-form">
            <div
                className="account-head"
                style={{
                    backgroundImage: "url(assets/images/background/bg2.jpg)"
                }}>
                <a href="/">
                    <img src="assets/images/logo-white-2.png" alt="" />
                </a>
            </div>
            <div className="account-form-inner">
                <div className="account-container">
                    <div className="heading-bx left">
                        <h2 className="title-head">
                            Forget <span>Password</span>
                        </h2>
                        <p>
                            Login Your Account
                            <a href="/login">Click here</a>
                        </p>
                    </div>
                    <form className="contact-bx">
                        <div className="row placeani">
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <div className="input-group">
                                        <input
                                            type="password"
                                            required
                                            className="form-control"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Enter your new password"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <div className="input-group">
                                        <input
                                            type="password"
                                            required
                                            className="form-control"
                                            value={confPassword}
                                            onChange={(e) => setConfPassword(e.target.value)}
                                            placeholder="Enter confirmation password"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12 m-b30">
                                {display && (
                                    <button type="button" className="btn button-md" onClick={handleSubmit}>
                                        Submit
                                    </button>
                                )}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
