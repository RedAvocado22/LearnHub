import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../../api";
import { isAxiosError } from "axios";
import * as yup from "yup";
import * as validation from "../../utils/validation";
import { Form, Formik, FormikHelpers } from "formik";
import NotFound from "../error/NotFound";
import FormField from "../../layouts/FormField";

interface FormValues {
    password: string;
    confirmPassword: string;
}

interface ResetPasswordRequest {
    password: string;
    token: string;
}

const validationSchema = yup.object({
    password: validation.password.required("Password is required"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "Password must match")
        .required("Confirm password is required")
});

export default function ResetPassword() {
    const { token } = useParams();
    if (!token) {
        return <NotFound />;
    }
    const initialValues: FormValues = { password: "", confirmPassword: "" };
    const navigate = useNavigate();

    const handleSubmit = async (values: FormValues, { setSubmitting, resetForm }: FormikHelpers<FormValues>) => {
        try {
            const payload: ResetPasswordRequest = { password: values.password, token: token };
            const resp = await API.post("/auth/reset-password", payload);
            if (resp.status === 200) {
                toast.success("Reset your password successful.");
                navigate("/login");
            }
        } catch (err) {
            let msg = "Something went wrong";
            if (isAxiosError(err)) {
                switch (err.response?.status) {
                    case 404:
                        msg = "The account is not exist!";
                        break;
                    case 400:
                        msg = "Invalid request!";
                        break;
                }
            }
            toast.error(msg);
            resetForm();
        } finally {
            setSubmitting(false);
        }
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
                            Forget <span>Password</span>
                        </h2>
                        <p>
                            Login Your Account
                            <a href="/login">Click here</a>
                        </p>
                    </div>
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                        {({ isSubmitting }) => (
                            <Form noValidate className="contact-bx">
                                <div className="row placeani">
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <FormField
                                                name="password"
                                                type="password"
                                                placeholder="Your new password"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <FormField
                                                name="confirmPassword"
                                                type="password"
                                                placeholder="Confirm your password"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-12 m-b30">
                                        <button type="submit" className="btn button-md" disabled={isSubmitting}>
                                            {isSubmitting ? "Submitting..." : "Submit"}
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
