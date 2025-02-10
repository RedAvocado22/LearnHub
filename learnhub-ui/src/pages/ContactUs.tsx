import { useState } from "react";
import { Footer, Header } from "../layouts";
import { API } from "../api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";

export default function ContactUs() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            const resp = await API.post("/contact", { firstName, lastName, email, phone, subject, message });
            if (resp.status === 200) {
                navigate("/");
                toast.success("Sent successful!");
            }
        } catch (error) {
            if (isAxiosError(error)) {
                switch (error.status) {
                    case 400:
                        toast.error("Invalid email or phone. Try again!");
                        break;
                }
            }
        }
    };

    return (
        <div className="page-wraper">
            <Header />
            <div className="page-content bg-white">
                {/* inner page banner */}
                <div
                    className="page-banner ovbl-dark"
                    style={{ backgroundImage: "url(assets/images/banner/banner2.jpg)" }}>
                    <div className="container">
                        <div className="page-banner-entry">
                            <h1 className="text-white">Contact Us</h1>
                        </div>
                    </div>
                </div>
                <div className="page-banner contact-page">
                    <div className="container-fuild">
                        <div className="row m-lr0">
                            <div className="col-lg-6 col-md-6 p-lr0 d-flex">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.375076021871!2d105.5204183!3d21.0124166!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135abc60e7d3f19%3A0x2be9d7d0b5abcbf4!2sFPT%20University!5e0!3m2!1sen!2s!4v1706965401234"
                                    className="align-self-stretch d-flex"
                                    style={{ width: "100%", minHeight: "300px" }}
                                    allowFullScreen></iframe>
                            </div>
                            <div className="col-lg-6 col-md-6 section-sp2 p-lr30">
                                <form
                                    className="contact-bx ajax-form"
                                    action="http://educhamp.themetrades.com/demo/assets/script/contact.php">
                                    <div className="ajax-message"></div>
                                    <div className="heading-bx left p-r15">
                                        <h2 className="title-head">
                                            Get In <span>Touch</span>
                                        </h2>
                                        <p>
                                            It is a long established fact that a reader will be distracted by the
                                            readable content of a page
                                        </p>
                                    </div>
                                    <div className="row placeani">
                                        <div className="col-lg-6 ">
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <input
                                                        value={firstName}
                                                        onChange={(e) => setFirstName(e.target.value)}
                                                        name="name"
                                                        type="text"
                                                        placeholder="Your First Name"
                                                        required
                                                        className="form-control valid-character"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 ">
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <input
                                                        value={lastName}
                                                        onChange={(e) => setLastName(e.target.value)}
                                                        name="name"
                                                        type="text"
                                                        placeholder="Your Last Name"
                                                        required
                                                        className="form-control valid-character"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <input
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        name="email"
                                                        type="email"
                                                        placeholder="Email address"
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
                                                        value={phone}
                                                        onChange={(e) => setPhone(e.target.value)}
                                                        name="phone"
                                                        type="text"
                                                        placeholder="Phone"
                                                        required
                                                        className="form-control int-value"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <select
                                                        className="form-control form-select"
                                                        value={subject}
                                                        onChange={(e) => setSubject(e.target.value)}>
                                                        <option value={"want to become a teacher"}>
                                                            I want to become a teacher
                                                        </option>
                                                        <option value={"have a problem"}>I have a problem</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <textarea
                                                        value={message}
                                                        onChange={(e) => setMessage(e.target.value)}
                                                        name="message"
                                                        rows={4}
                                                        placeholder="type message"
                                                        className="form-control"
                                                        required></textarea>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <div
                                                        className="g-recaptcha"
                                                        data-sitekey="6Lf2gYwUAAAAAJLxwnZTvpJqbYFWqVyzE-8BWhVe"
                                                        data-callback="verifyRecaptchaCallback"
                                                        data-expired-callback="expiredRecaptchaCallback"></div>
                                                    <input
                                                        className="form-control d-none"
                                                        style={{ display: "none" }}
                                                        data-recaptcha="true"
                                                        required
                                                        data-error="Please complete the Captcha"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <button
                                                onClick={handleSubmit}
                                                name="submit"
                                                type="button"
                                                value="Submit"
                                                className="btn button-md">
                                                {" "}
                                                Send Message
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
