import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { API } from "../../api";
import { isAxiosError } from "axios";
import * as yup from "yup";
import { Form, Formik, FormikHelpers } from "formik";
import FormField from "../../layouts/FormField";

interface FormValues {
    email: string;
}

const validationSchema = yup.object({
    email: yup.string().email("Email is invalid").required("Email is required")
});

export default function ForgotPassword() {
    const navigate = useNavigate();
    const initialPayload: FormValues = { email: "" };
    const handleSubmit = async (values: FormValues, { setSubmitting, resetForm }: FormikHelpers<FormValues>) => {
        try {
            const resp = await API.post("/auth/forgot-password", { email: values.email });
            if (resp.status === 200) {
                toast.success("A reset link has been sent to your email.");
                navigate("/");
            }
        } catch (err) {
            let msg = "Something went wrong.";
            if (isAxiosError(err)) {
                switch (err.response?.status) {
                    case 404:
                        msg = "The email is not exist!";
                        break;
                    case 400:
                        msg = "Invalid email!";
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
            <div
                className="account-head"
                style={{
                    backgroundImage: "url(/assets/images/background/bg2.jpg)"
                }}>
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
                            Login Your Account <a href="/login">Click here</a>
                        </p>
                    </div>
                    <Formik initialValues={initialPayload} validationSchema={validationSchema} onSubmit={handleSubmit}>
                        {({ isSubmitting }) => (
                            <Form noValidate className="contact-bx">
                                <div className="row placeani">
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <FormField name="email" type="email" placeholder="Enter your email" />
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
