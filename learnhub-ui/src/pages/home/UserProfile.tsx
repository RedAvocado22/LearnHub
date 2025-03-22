import { useUser } from "../../hooks/useUser";
import * as yup from "yup";
import * as validation from "../../utils/validation";
import { StudentType, UserRole } from "../../types/User";
import { toast } from "react-toastify";
import { Form, Formik, FormikHelpers } from "formik";
import NotFound from "../error/NotFound";
import { API } from "../../api";
import { HomeLayout } from "../../layouts";
import FormField from "../../layouts/FormField";

interface UserFormValues {
    firstName: string;
    lastName: string;
    student?: {
        type: StudentType;
        school?: string;
    };
    teacher?: {
        major: string;
        phone: string;
        workAddress: string;
        city: string;
        website?: string;
        biography?: string;
    };
}

interface PasswordFormValues {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}

const baseSchema = {
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required")
};

const studentSchema = {
    student: yup.object({
        type: yup
            .mixed<StudentType>()
            .oneOf(Object.values(StudentType), "Select a valid student type")
            .required("Student type is required"),
        school: yup.string()
    })
};

const teacherSchema = {
    teacher: yup.object({
        major: yup.string().required("Major is required"),
        phone: validation.phone.required("Phone is required"),
        workAddress: yup.string().required("Work address is required"),
        city: yup.string().required("City is required"),
        website: yup.string(),
        biography: yup.string()
    })
};

const updatePasswordSchema = yup.object({
    oldPassword: yup.string().required("Old password is required"),
    newPassword: validation.password.required("New password is required"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("newPassword")], "Password must match")
        .required("Confirm password is required")
});

export default function UserProfile() {
    const { user, refreshUser } = useUser();

    if (!user) {
        return <NotFound />;
    }

    let updateUserSchema = yup.object({ ...baseSchema });
    let initialUserValues: UserFormValues = {
        firstName: user.firstName,
        lastName: user.lastName
    };
    const initialPasswordValues: PasswordFormValues = {
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    };
    if (user.role === UserRole.STUDENT && user.student) {
        updateUserSchema = yup.object({ ...baseSchema, ...studentSchema });
        initialUserValues.student = {
            type: user.student.type,
            school: user.student.school
        };
    } else if (user.role === UserRole.TEACHER && user.teacher) {
        updateUserSchema = yup.object({ ...baseSchema, ...teacherSchema });
        initialUserValues.teacher = {
            major: user.teacher.major,
            phone: user.teacher.phone,
            workAddress: user.teacher.workAddress,
            city: user.teacher.city,
            website: user.teacher.website,
            biography: user.teacher.biography
        };
    }

    const handleUpdateUser = async (
        values: UserFormValues,
        { setSubmitting, resetForm }: FormikHelpers<UserFormValues>
    ) => {
        try {
            const resp = await API.put("/users/me", { ...values });
            if (resp.status === 200) {
                toast.success("Update profile successfully");
                refreshUser();
            }
        } catch (err) {
            let msg = "Something went wrong";
            toast.error(msg);
            resetForm();
        } finally {
            setSubmitting(false);
        }
    };

    const handleUpdatePassword = async (
        values: PasswordFormValues,
        { setSubmitting, resetForm }: FormikHelpers<PasswordFormValues>
    ) => {
        try {
            const resp = await API.put("/users/me/password", {
                oldPassword: values.oldPassword,
                newPassword: values.newPassword
            });
            if (resp.status === 200) {
                toast.success("Change password successfully");
            }
        } catch (err) {
            let msg = "Something went wrong";
            toast.error(msg);
            resetForm();
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <HomeLayout>
            <main className="ttr-wrapper">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12 m-b30">
                            <div className="widget-box">
                                <div className="wc-title">
                                    <h4>User Profile</h4>
                                </div>
                                <div className="widget-inner">
                                    <Formik
                                        initialValues={initialUserValues}
                                        validationSchema={updateUserSchema}
                                        onSubmit={handleUpdateUser}>
                                        {({ values, isSubmitting, resetForm }) => (
                                            <Form noValidate className="edit-profile m-b30">
                                                <div className="">
                                                    <div className="form-group row">
                                                        <div className="col-sm-10  ml-auto">
                                                            <h3>1. Personal Details</h3>
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-sm-2 col-form-label">First Name</label>
                                                        <div className="col-sm-7">
                                                            <FormField name="firstName" />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-sm-2 col-form-label">Last Name</label>
                                                        <div className="col-sm-7">
                                                            <FormField name="lastName" />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-sm-2 col-form-label">Email</label>
                                                        <div className="col-sm-7">
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                value={user.email}
                                                                readOnly
                                                            />
                                                        </div>
                                                    </div>
                                                    {user.role === UserRole.STUDENT && values.student && (
                                                        <>
                                                            <div className="form-group row">
                                                                <label className="col-sm-2 col-form-label">
                                                                    Education Level
                                                                </label>
                                                                <div className="col-sm-7">
                                                                    <FormField
                                                                        name="student.type"
                                                                        as="select"
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
                                                            </div>
                                                            <div className="form-group row">
                                                                <label className="col-sm-2 col-form-label">
                                                                    School
                                                                </label>
                                                                <div className="col-sm-7">
                                                                    <FormField name="student.school" />
                                                                </div>
                                                            </div>
                                                        </>
                                                    )}
                                                    {user.role === UserRole.TEACHER && values.teacher && (
                                                        <>
                                                            <div className="form-group row">
                                                                <label className="col-sm-2 col-form-label">Major</label>
                                                                <div className="col-sm-7">
                                                                    <FormField name="teacher.major" />
                                                                </div>
                                                            </div>
                                                            <div className="form-group row">
                                                                <label className="col-sm-2 col-form-label">Phone</label>
                                                                <div className="col-sm-7">
                                                                    <FormField name="teacher.phone" />
                                                                </div>
                                                            </div>
                                                            <div className="form-group row">
                                                                <label className="col-sm-2 col-form-label">
                                                                    Work At
                                                                </label>
                                                                <div className="col-sm-7">
                                                                    <FormField name="teacher.workAddress" />
                                                                </div>
                                                            </div>
                                                            <div className="form-group row">
                                                                <label className="col-sm-2 col-form-label">City</label>
                                                                <div className="col-sm-7">
                                                                    <FormField name="teacher.city" />
                                                                </div>
                                                            </div>
                                                            <div className="form-group row">
                                                                <label className="col-sm-2 col-form-label">
                                                                    Website
                                                                </label>
                                                                <div className="col-sm-7">
                                                                    <FormField name="teacher.website" />
                                                                </div>
                                                            </div>
                                                            <div className="form-group row">
                                                                <label className="col-sm-2 col-form-label">
                                                                    Biography
                                                                </label>
                                                                <div className="col-sm-7">
                                                                    <FormField name="teacher.biography" as="textarea" />
                                                                </div>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                                <div className="">
                                                    <div className="">
                                                        <div className="row">
                                                            <div className="col-sm-2"></div>
                                                            <div className="col-sm-7">
                                                                <button
                                                                    type="submit"
                                                                    className="btn"
                                                                    disabled={isSubmitting}>
                                                                    {isSubmitting ? "Saving" : "Save changes"}
                                                                </button>{" "}
                                                                <button
                                                                    type="reset"
                                                                    className="btn-secondry"
                                                                    onClick={() => resetForm()}>
                                                                    Cancel
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Form>
                                        )}
                                    </Formik>
                                    <Formik
                                        initialValues={initialPasswordValues}
                                        validationSchema={updatePasswordSchema}
                                        onSubmit={handleUpdatePassword}>
                                        {({ isSubmitting, resetForm }) => (
                                            <Form noValidate className="edit-profile">
                                                <div className="">
                                                    <div className="form-group row">
                                                        <div className="col-sm-10 ml-auto">
                                                            <h3>2. Password</h3>
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-sm-2 col-form-label">
                                                            Current Password
                                                        </label>
                                                        <div className="col-sm-7">
                                                            <FormField name="oldPassword" type="password" />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-sm-2 col-form-label">New Password</label>
                                                        <div className="col-sm-7">
                                                            <FormField name="newPassword" type="password" />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-sm-2 col-form-label">
                                                            Re Type Password
                                                        </label>
                                                        <div className="col-sm-7">
                                                            <FormField name="confirmPassword" type="password" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-2"></div>
                                                    <div className="col-sm-7">
                                                        <button type="submit" className="btn" disabled={isSubmitting}>
                                                            {isSubmitting ? "Saving..." : "Save changes"}
                                                        </button>{" "}
                                                        <button
                                                            type="reset"
                                                            className="btn-secondry"
                                                            onClick={() => resetForm()}>
                                                            Cancel
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
            </main>
        </HomeLayout>
    );
}
