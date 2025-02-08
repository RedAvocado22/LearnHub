import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../api";
import { isAxiosError } from "axios";

export default function ResetPassword() {
    const { token } = useParams();
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    async function handleSubmit() {
        try {
            const resp = await API.post("/auth/reset-password", { password, token });

            if (resp.status === 200) {
                toast.success("Reset your password successful.");
                navigate("/login");
            }
        } catch (error) {
            if (isAxiosError(error)) {
                if (error.status === 400) {
                    toast(
                        "Password must be at least 6 characters long, with at least one uppercase letter, one special character, and at least one number."
                    );
                } else {
                    toast("An error was occurred!");
                }
            }
        }
    }

    const validatePassword = (password: string) => {
        const regex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{6,}$/;
        return regex.test(password);
    };

    useEffect(() => {
        if (password.length != 0 && confPassword.length != 0) {
            if (!validatePassword(password)) {
                setError(
                    "Password must be at least 6 characters long, with at least one uppercase letter, one special character, and at least one number."
                );
            } else {
                setError("");
            }
        } else {
            setError("Confirm password must match with password");
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
                            {/* Display error message */}
                            {!error ? (
                                <div className="col-lg-12 m-b30">
                                    {/* Only enable the button if there's no error */}
                                    <button type="button" className="btn button-md" onClick={handleSubmit}>
                                        Submit
                                    </button>
                                </div>
                            ) : (
                                <div className="col-lg-12 text-danger">
                                    <p>{error}</p>
                                </div>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
