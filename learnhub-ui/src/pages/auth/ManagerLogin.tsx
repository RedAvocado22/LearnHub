import { toast } from "react-toastify";
import { LoginRequest, useUser } from "../../hooks/useUser";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import FormField from "../../layouts/FormField";
import { Form, Formik, FormikHelpers } from "formik";

interface FormValues {
    email: string;
    password: string;
}

const validationSchema = yup.object({
    email: yup.string().required("Email is required"),
    password: yup.string().required("Password is required")
});

export default function ManagerLogin() {
    const initialValues: FormValues = { email: "", password: "" };
    const { login } = useUser();
    const navigate = useNavigate();

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
            <div className="account-form-inner">
                <div className="account-container">
                    <div className="heading-bx left">
                        <h2 className="title-head">
                            Manager <span>Login</span>
                        </h2>
                    </div>
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleLogin}>
                        {({ isSubmitting }) => (
                            <Form noValidate className="contact-bx">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <FormField name="email" placeholder="Username" />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <FormField name="password" type="password" placeholder="Password" />
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
