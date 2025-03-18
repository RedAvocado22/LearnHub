import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { activateAccount } from "../../api/auth";
import { LoginRequest, useUser } from "../../hooks/useUser";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import * as yup from "yup";
import { Form, Formik, FormikHelpers } from "formik";
import FormField from "../../layouts/FormField";

interface FormValues {
    email: string;
    password: string;
}

const validationSchema = yup.object({
    email: yup.string().required("Email is required"),
    password: yup.string().required("Password is required")
});

export default function Login() {
    const { token } = useParams();
    const initialValues: FormValues = { email: "", password: "" };
    const { login } = useUser();
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

    const handleLogin = async (values: FormValues, { setSubmitting, resetForm }: FormikHelpers<FormValues>) => {
        const payload: LoginRequest = { email: values.email, password: values.password };
        const result = await login(payload);
        if (result) {
            toast.success("Login successfully");
            navigate("/home");
        } else {
            resetForm();
        }
        setSubmitting(false);
    };
    return (
        <div className="account-form">
            <div className="account-head" style={{ backgroundImage: "url(/assets/images/background/bg2.jpg)" }}>
                <a href="/">
                    <img src="/assets/images/logo-white-2.png" alt="" />
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
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleLogin}>
                        {({ isSubmitting }) => (
                            <Form noValidate className="contact-bx">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <FormField name="email" type="email" placeholder="Your Email" />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <FormField name="password" type="password" placeholder="Your Password" />
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
                                        <button type="submit" className="btn button-md" disabled={isSubmitting}>
                                            {isSubmitting ? "Logging in..." : "Login"}
                                        </button>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
}
