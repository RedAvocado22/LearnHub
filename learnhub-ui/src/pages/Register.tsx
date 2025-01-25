import { useState } from "react";
import { StudentType } from "../types/auth";
import { register } from "../api/auth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [studentType, setStudentType] = useState<StudentType>(StudentType.ELEMENTARY);

    const navigate = useNavigate();
    const handleRegister = async () => {
        const result = await register({ email, password, firstname, lastname, studentType });
        if (result) {
            Swal.fire({
                icon: "success",
                title: "Register successfully",
                text: "Register successfully. Check your email to activate the account."
            });
            navigate("/");
        } else {
            setEmail("");
            setPassword("");
            setFirstname("");
            setLastname("");
            setStudentType(StudentType.ELEMENTARY);
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
                            Sign Up <span>Now</span>
                        </h2>
                        <p>
                            Login Your Account <a href="/login">Click here</a>
                        </p>
                    </div>
                    <form className="contact-bx">
                        <div className="row placeani">
                            <div className="col-lg-6">
                                <div className="form-group">
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            placeholder="Your First Name"
                                            value={firstname}
                                            onChange={(e) => setFirstname(e.target.value)}
                                            className="form-control"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="form-group">
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            placeholder="Your Last Name"
                                            value={lastname}
                                            onChange={(e) => setLastname(e.target.value)}
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
                                            type="email"
                                            placeholder="Your Email Address"
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
                            {/* Fix this combo box style */}
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <div className="input-group">
                                        <select
                                            className="form-control form-select"
                                            value={studentType}
                                            onChange={(e) => setStudentType(e.target.value as StudentType)}>
                                            <option value={StudentType.ELEMENTARY}>Elementary student</option>
                                            <option value={StudentType.SECONDARY}>Secondary student</option>
                                            <option value={StudentType.HIGHSCHOOL}>Highschool student</option>
                                            <option value={StudentType.UNDER_GRADUATE}>
                                                University/College student
                                            </option>
                                            <option value={StudentType.MASTER}>I have master degree</option>
                                            <option value={StudentType.DOCTORATE}>I have doctorate degree</option>
                                            <option value={StudentType.WORKING}>I'm working</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12 m-b30">
                                <button type="button" onClick={handleRegister} className="btn button-md">
                                    Sign Up
                                </button>
                            </div>
                            <div className="col-lg-12">
                                <h6>Sign Up with Social media</h6>
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
