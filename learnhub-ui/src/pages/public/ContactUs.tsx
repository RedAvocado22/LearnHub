import { MainLayout } from "../../layouts";
import { API } from "../../api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";
import * as yup from "yup";
import * as validation from "../../utils/validation";
import { Form, Formik, FormikHelpers } from "formik";
import FormField from "../../layouts/FormField";

interface FormValues {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
}

const validationSchema = yup.object({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup.string().email("Email is invalid").required("Email is required"),
    phone: validation.phone.required("Phone is required"),
    subject: yup.string().required("Subject is required"),
    message: yup.string().required("Message is required")
});

export default function ContactUs() {
    const initialValues: FormValues = {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
    };
    const navigate = useNavigate();

    const handleSubmit = async (values: FormValues, { setSubmitting, resetForm }: FormikHelpers<FormValues>) => {
        try {
            const resp = await API.post("/public/contacts", { ...values });
            if (resp.status === 200) {
                navigate("/");
                toast.success("Sent successful!");
            }
        } catch (err) {
            let msg = "Something went wrong";
            if (isAxiosError(err)) {
                switch (err.response?.status) {
                    case 400:
                        msg = "Invalid request";
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
        <MainLayout>
            <div className="page-content bg-white">
                {/* inner page banner */}
                <div
                    className="page-banner ovbl-dark"
                    style={{ backgroundImage: "url(/assets/images/banner/banner2.jpg)" }}>
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
                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={validationSchema}
                                    onSubmit={handleSubmit}>
                                    {({ isSubmitting }) => (
                                        <Form className="contact-bx">
                                            <div className="heading-bx left p-r15">
                                                <h2 className="title-head">
                                                    Get In <span>Touch</span>
                                                </h2>
                                                <p>Let we hear your hope and dream!</p>
                                            </div>
                                            <div className="row placeani">
                                                <div className="col-lg-6 ">
                                                    <div className="form-group">
                                                        <FormField name="firstName" placeholder="Your first name" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 ">
                                                    <div className="form-group">
                                                        <FormField name="lastName" placeholder="Your last name" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <FormField
                                                            name="email"
                                                            type="email"
                                                            placeholder="Email address"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <FormField name="phone" placeholder="Phone number" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <FormField name="subject" as="select" className="form-select">
                                                            <option value="Want to become a teacher">
                                                                I want to become a teacher
                                                            </option>
                                                            <option value="Want to become a course manager">
                                                                I want to become a manager
                                                            </option>
                                                            <option value="Have a problem">I have a problem</option>
                                                        </FormField>
                                                    </div>
                                                </div>
                                                <div className="col-lg-12">
                                                    <div className="form-group">
                                                        <FormField
                                                            name="message"
                                                            as="textarea"
                                                            placeholder="Your message"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-12">
                                                    <button
                                                        type="submit"
                                                        className="btn button-md"
                                                        disabled={isSubmitting}>
                                                        {isSubmitting ? "Sending..." : "Send Message"}
                                                    </button>
                                                </div>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
