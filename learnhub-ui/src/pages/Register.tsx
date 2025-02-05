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
    const [studentType, setStudentType] = useState<StudentType>(StudentType.GRADE10);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const navigate = useNavigate();

    // Password validation: at least 6 characters, one uppercase letter, and one special character
    const validatePassword = (password: string) => {
        const regex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{6,}$/;
        return regex.test(password);
    };

    const validateEmail = (email: string) => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return regex.test(email.trim());
    };

    // Handle registration
    const handleRegister = async () => {
        // Validate required fields
        if (!email || !password || !firstname || !lastname) {
            setErrorMessage("All fields are required.");
            return;
        }

        // Validate password
        if (!validatePassword(password)) {
            setErrorMessage(
                "Password must be at least 6 characters long, with at least one uppercase letter, one special character, and at least one number."
            );
            return;
        }

        if (!validateEmail(email)) {
            setErrorMessage("Please enter a valid email address.");
            return;
        }

        // Clear error message if validation passes
        setErrorMessage("");

        // Proceed with registration
        const result = await register({ email, password, firstname, lastname, studentType });
        if (result) {
            Swal.fire({
                icon: "success",
                title: "Register successfully",
                text: "Register successfully. Check your email to activate the account."
            });
            navigate("/login");
        } else {
            setEmail("");
            setPassword("");
            setFirstname("");
            setLastname("");
            setStudentType(StudentType.GRADE10);
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
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <div className="input-group">
                                        <select
                                            className="form-control form-select"
                                            value={studentType}
                                            onChange={(e) => setStudentType(e.target.value as StudentType)}>
                                            <option value={StudentType.GRADE10}>Grade 10</option>
                                            <option value={StudentType.GRADE11}>Grade 11</option>
                                            <option value={StudentType.GRADE12}>Grade 12</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12 m-b30">
                                <button type="button" onClick={handleRegister} className="btn button-md">
                                    Sign Up
                                </button>
                            </div>
                            {errorMessage && (
                                <div className="col-lg-12 text-danger">
                                    <p>{errorMessage}</p>
                                </div>
                            )}
                            <div className="col-lg-12">
                                <h6>Sign Up with Social media</h6>
                                <div className="d-flex">
                                    <a className="btn flex-fill m-r5 facebook" href="#">
                                        <i className="fa fa-facebook"></i>Facebook
                                    </a>
                                    <a className="btn flex-fill m-l5 google-plus" href="#">
                                        <i className="fa fa-google-plus"></i>Google
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
