import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { API } from "../api";

export default function ForgotPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");

    async function handleSubmit() {
        try {
            const resp = await API.post("/auth/forgot-password", { email });

            if (resp.status === 200) {
                toast.success("Sent to your email.");
                navigate("/");
            } else {
                throw new Error("Something wrong!");
            }
        } catch (error) {
            toast.error((error as Error).message);
        }
    }

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
                                            name="email"
                                            type="email"
                                            required
                                            className="form-control"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter your email"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12 m-b30">
                                <button type="button" className="btn button-md" onClick={handleSubmit}>
                                    Submit
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
