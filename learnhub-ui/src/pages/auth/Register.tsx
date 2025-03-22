import { StudentType } from "../../types/User";
import { register, RegisterRequest } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as yup from "yup";
import * as validation from "../../utils/validation";
import { Form, Formik, FormikHelpers } from "formik";
import FormField from "../../layouts/FormField";

interface FormValues {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    studentType: StudentType;
}

const validationSchema = yup.object({
    email: yup.string().email("Email is invalid").required("Email is required"),
    password: validation.password.required("Password is required"),
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    studentType: yup
        .mixed<StudentType>()
        .oneOf(Object.values(StudentType), "Select a valid student type")
        .required("Student type is required")
});

export default function Register() {
    const initialValues: FormValues = {
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        studentType: StudentType.GRADE10
    };
    const navigate = useNavigate();

    const handleRegister = async (values: FormValues, { setSubmitting, resetForm }: FormikHelpers<FormValues>) => {
        const payload: RegisterRequest = { ...values };
        const result = await register(payload);
        if (result) {
            Swal.fire({
                icon: "success",
                title: "Register successfully",
                text: "Register successfully. Check your email to activate the account."
            });
            navigate("/login");
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
                            Sign Up <span>Now</span>
                        </h2>
                        <p>
                            Login Your Account <a href="/login">Click here</a>
                        </p>
                    </div>
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleRegister}>
                        {({ isSubmitting }) => (
                            <Form noValidate className="contact-bx">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <FormField name="firstName" placeholder="Your First Name" />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <FormField name="lastName" placeholder="Your Last Name" />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <FormField name="email" type="email" placeholder="Your Email Address" />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <FormField name="password" type="password" placeholder="Your Password" />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <FormField name="studentType" as="select" className="form-select">
                                                <option value={StudentType.GRADE10}>Grade 10</option>
                                                <option value={StudentType.GRADE11}>Grade 11</option>
                                                <option value={StudentType.GRADE12}>Grade 12</option>
                                            </FormField>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 m-b30">
                                        <button type="submit" className="btn button-md" disabled={isSubmitting}>
                                            {isSubmitting ? "Signing up..." : "Sign Up"}
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
