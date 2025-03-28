import { Link, useLocation } from "react-router-dom";
import { HomeLayout } from "../../../layouts";
import { StudentType, UserRole } from "../../../types/User";
import { API } from "../../../api";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import * as yup from "yup";
import * as validation from "../../../utils/validation";
import { Form, Formik, FormikHelpers } from "formik";
import { Contact, ContactSubject } from "../../../hooks/useContacts";
import FormField from "../../../layouts/FormField";

interface FormValues {
    firstName: string;
    lastName: string;
    email: string;
    role: UserRole;
    student?: {
        type: StudentType;
        school: string;
    };
    teacher?: {
        major: string;
        phone: string;
        workAddress: string;
        city: string;
        website: string;
        biography: string;
    };
    manager?: {
        department: string;
    };
    contactId?: number;
}

const validationSchema = yup.object({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup.string().email("Email is invalid").required("Email is required"),
    role: yup.mixed<UserRole>().oneOf(Object.values(UserRole), "Select a valid user role").required("Role is required"),
    student: yup.object().when("role", {
        is: UserRole.STUDENT,
        then: (schema) =>
            schema.shape({
                type: yup
                    .mixed<StudentType>()
                    .oneOf(Object.values(StudentType), "Select a valid student type")
                    .required("Grade is required"),
                school: yup.string()
            }),
        otherwise: (schema) => schema.notRequired()
    }),
    teacher: yup.object().when("role", {
        is: UserRole.TEACHER,
        then: (schema) =>
            schema.shape({
                major: yup.string().required("Major is required"),
                phone: validation.phone.required("Phone is required"),
                workAddress: yup.string().required("Work address is required"),
                city: yup.string(),
                website: yup.string(),
                biography: yup.string()
            }),
        otherwise: (schema) => schema.notRequired()
    }),
    manager: yup.object().when("role", {
        is: UserRole.COURSE_MANAGER,
        then: (schema) =>
            schema.shape({
                department: yup.string().required("Department is required")
            })
    })
});

export default function AddUser() {
    const location = useLocation();
    const contact: Contact | null | undefined = location.state?.contact;
    const initialValues: FormValues = {
        firstName: contact?.firstName || "",
        lastName: contact?.lastName || "",
        email: contact?.email || "",
        role:
            contact?.subject === ContactSubject.ADD_TEACHER
                ? UserRole.TEACHER
                : contact?.subject === ContactSubject.ADD_MANAGER
                  ? UserRole.COURSE_MANAGER
                  : UserRole.STUDENT,
        student: { type: StudentType.GRADE10, school: "" },
        teacher: {
            major: contact?.teacher?.major || "",
            phone: contact?.phone || "",
            workAddress: contact?.teacher?.workAddress || "",
            city: contact?.teacher?.city || "",
            website: contact?.teacher?.website || "",
            biography: contact?.teacher?.biography || ""
        },
        manager: { department: contact?.manager?.department || "" },
        contactId: contact?.id
    };

    const handleSubmit = async (values: FormValues, { setSubmitting, resetForm }: FormikHelpers<FormValues>) => {
        const { isConfirmed } = await Swal.fire({
            title: "Add new user?",
            icon: "warning",
            showCancelButton: true
        });
        if (!isConfirmed) return;
        try {
            const resp = await API.post("/users", values);
            if (resp.status === 200) {
                toast.success("Add user successfully");
            }
        } catch (err) {
            toast.error("Add user failed");
        } finally {
            resetForm();
            setSubmitting(false);
        }
    };

    return (
        <HomeLayout>
            <main className="ttr-wrapper">
                <div className="container-fluid">
                    <div className="db-breadcrumb">
                        <h4 className="breadcrumb-title">Add User</h4>
                        <ul className="db-breadcrumb-list">
                            <li>
                                <Link to="/admin/users">
                                    <i className="fa fa-home"></i>Users
                                </Link>
                            </li>
                            <li>Add User</li>
                        </ul>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 m-b30">
                            <div className="widget-box">
                                <div className="widget-inner">
                                    <Formik
                                        initialValues={initialValues}
                                        validationSchema={validationSchema}
                                        onSubmit={handleSubmit}>
                                        {({ values, isSubmitting }) => (
                                            <Form noValidate className="edit-profile m-b30">
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="ml-auto d-flex justify-content-between align-items-center">
                                                            <h3>1. Basic info</h3>
                                                            <button
                                                                type="submit"
                                                                className="btn"
                                                                disabled={isSubmitting}>
                                                                {isSubmitting ? "Submitting..." : "Submit"}
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="form-group col-6">
                                                        <label className="col-form-label">First name</label>
                                                        <FormField name="firstName" />
                                                    </div>
                                                    <div className="form-group col-6">
                                                        <label className="col-form-label">Last name</label>
                                                        <FormField name="lastName" />
                                                    </div>
                                                    <div className="form-group col-6">
                                                        <label className="col-form-label">Email</label>
                                                        <FormField type="email" name="email" />
                                                    </div>
                                                    <div className="form-group col-6">
                                                        <label className="col-form-label">Role</label>
                                                        <FormField as="select" name="role" className="form-select">
                                                            <option value={UserRole.STUDENT}>Student</option>
                                                            <option value={UserRole.TEACHER}>Teacher</option>
                                                            <option value={UserRole.COURSE_MANAGER}>
                                                                Course Manager
                                                            </option>
                                                        </FormField>
                                                    </div>
                                                    <div className="seperator"></div>

                                                    <div className="col-12 m-t20">
                                                        <div className="ml-auto m-b5">
                                                            <h3>2. More Details</h3>
                                                        </div>
                                                    </div>
                                                    {values.role === UserRole.STUDENT && (
                                                        <>
                                                            <div className="form-group col-6">
                                                                <label className="col-form-label">Grade</label>
                                                                <FormField
                                                                    as="select"
                                                                    name="student.type"
                                                                    className="form-select">
                                                                    <option value={StudentType.GRADE10}>
                                                                        Grade 10
                                                                    </option>
                                                                    <option value={StudentType.GRADE11}>
                                                                        Grade 11
                                                                    </option>
                                                                    <option value={StudentType.GRADE12}>
                                                                        Grade 12
                                                                    </option>
                                                                </FormField>
                                                            </div>
                                                            <div className="form-group col-6">
                                                                <label className="col-form-label">School</label>
                                                                <FormField name="student.school" />
                                                            </div>
                                                        </>
                                                    )}
                                                    {values.role === UserRole.TEACHER && (
                                                        <>
                                                            <div className="form-group col-6">
                                                                <label className="col-form-label">Major</label>
                                                                <FormField name="teacher.major" />
                                                            </div>
                                                            <div className="form-group col-6">
                                                                <label className="col-form-label">Phone</label>
                                                                <FormField name="teacher.phone" />
                                                            </div>
                                                            <div className="form-group col-4">
                                                                <label className="col-form-label">Work Address</label>
                                                                <FormField name="teacher.workAddress" />
                                                            </div>
                                                            <div className="form-group col-4">
                                                                <label className="col-form-label">City</label>
                                                                <FormField name="teacher.city" />
                                                            </div>
                                                            <div className="form-group col-4">
                                                                <label className="col-form-label">Website</label>
                                                                <FormField name="teacher.website" />
                                                            </div>
                                                            <div className="form-group col-12">
                                                                <label className="col-form-label">Biography</label>
                                                                <FormField as="textarea" name="teacher.biography" />
                                                            </div>
                                                        </>
                                                    )}
                                                    {values.role === UserRole.COURSE_MANAGER && (
                                                        <div className="form-group col-6">
                                                            <label className="col-form-label">Department</label>
                                                            <FormField name="manager.department" />
                                                        </div>
                                                    )}
                                                </div>
                                            </Form>
                                        )}
                                    </Formik>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </HomeLayout>
    );
}
