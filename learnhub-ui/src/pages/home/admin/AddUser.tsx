import { Link, useLocation } from "react-router-dom";
import { HomeLayout } from "../../../layouts";
import { useRef, useState } from "react";
import { StudentType, UserRole } from "../../../types/User";
import prettyBytes from "pretty-bytes";
import { API } from "../../../api";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";
import Swal from "sweetalert2";
import * as yup from "yup";
import { useFormik } from "formik";

interface AddUserRequest {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: UserRole;
    studentType?: StudentType;
    major?: string;
}

interface Contact {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
}

const validationSchema = yup.object({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup.string().email("Email is invalid").required("Email is required"),
    phone: yup
        .string()
        .matches(/^[0-9]{10,11}/, "Phone must be 10-11 digits long")
        .required("Phone is required"),
    role: yup.mixed<UserRole>().oneOf(Object.values(UserRole), "Select a valid user role").required("Role is required"),
    studentGrade: yup
        .mixed<StudentType>()
        .oneOf(Object.values(StudentType), "Select a valid student type")
        .required("Grade is required"),
    major: yup.string().required("Major is required")
});
export default function AddUser() {
    const location = useLocation();
    const contact: Contact = location.state?.contact;
    const formik = useFormik({
        initialValues: {
            firstName: contact?.firstName || "",
            lastName: contact?.lastName || "",
            email: contact?.email || "",
            phone: contact?.phone || "",
            role: UserRole.STUDENT,
            studentGrade: StudentType.GRADE10,
            major: ""
        },
        validationSchema,
        onSubmit: () => {}
    });
    const [uploadFiles, setUploadFiles] = useState<File[]>([]);
    const fileUploadInput = useRef<HTMLInputElement>(null);

    const handleUploadDocument = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setUploadFiles([...uploadFiles, files[0]]);
        }
    };

    const handleAddUser = async () => {
        const errors = await formik.validateForm();
        if (Object.keys(errors).length !== 0) {
            formik.setTouched({
                firstName: true,
                lastName: true,
                email: true,
                phone: true,
                role: true,
                studentGrade: true,
                major: true
            });
            return;
        }
        const values = formik.values;
        const { isConfirmed } = await Swal.fire({
            title: "Add new user?",
            icon: "warning",
            showCancelButton: true
        });
        if (isConfirmed) {
            let url = "/users";
            let payload: AddUserRequest = {
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                phone: values.phone,
                role: values.role
            };
            if (values.role === UserRole.STUDENT) {
                url = "/students";
                payload.studentType = values.studentGrade;
            } else if (values.role === UserRole.TEACHER) {
                url = "/teachers";
                payload.major = values.major;
            }
            try {
                const resp = await API.post(url, payload);
                if (resp.status === 200) {
                    const id = resp.data;
                    const formData = new FormData();
                    for (const file of uploadFiles) {
                        if (!file) continue;
                        formData.append("files", file);
                    }
                    if (Array.from(formData.entries()).length > 0) {
                        try {
                            const resp = await API.post(`/users/${id}/documents`, formData, {
                                headers: { "Content-Type": "multipart/form-data" }
                            });
                            if (resp.status === 200) {
                                toast.success("Add user successfully");
                            }
                        } catch (err) {
                            if (isAxiosError(err)) {
                                toast.error(err.response?.data || "Something went wrong");
                            }
                            console.error((err as Error).message);
                        }
                    }
                }
            } catch (err) {
                if (isAxiosError(err)) {
                    toast.error(err.response?.data || "Something went wrong");
                }
                console.error((err as Error).message);
            }
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
                                    <form className="edit-profile m-b30">
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="ml-auto d-flex justify-content-between align-items-center">
                                                    <h3>1. Basic info</h3>
                                                    <button type="button" className="btn" onClick={handleAddUser}>
                                                        Save
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="form-group col-6">
                                                <label className="col-form-label">First name</label>
                                                <div>
                                                    <input
                                                        type="text"
                                                        name="firstName"
                                                        value={formik.values.firstName}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        className={`form-control${formik.touched.firstName && formik.errors.firstName ? " is-invalid" : ""}`}
                                                    />
                                                    {formik.touched.firstName && formik.errors.firstName && (
                                                        <div className="invalid-feedback">
                                                            {formik.errors.firstName}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="form-group col-6">
                                                <label className="col-form-label">Last name</label>
                                                <div>
                                                    <input
                                                        type="text"
                                                        name="lastName"
                                                        value={formik.values.lastName}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        className={`form-control${formik.touched.lastName && formik.errors.lastName ? " is-invalid" : ""}`}
                                                    />
                                                    {formik.touched.lastName && formik.errors.lastName && (
                                                        <div className="invalid-feedback">{formik.errors.lastName}</div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="form-group col-6">
                                                <label className="col-form-label">Email</label>
                                                <div>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        value={formik.values.email}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        className={`form-control${formik.touched.email && formik.errors.email ? " is-invalid" : ""}`}
                                                    />
                                                    {formik.touched.email && formik.errors.email && (
                                                        <div className="invalid-feedback">{formik.errors.email}</div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="form-group col-6">
                                                <label className="col-form-label">Phone</label>
                                                <div>
                                                    <input
                                                        type="text"
                                                        name="phone"
                                                        value={formik.values.phone}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        className={`form-control${formik.touched.phone && formik.errors.phone ? " is-invalid" : ""}`}
                                                    />
                                                    {formik.touched.phone && formik.errors.phone && (
                                                        <div className="invalid-feedback">{formik.errors.phone}</div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="form-group col-6">
                                                <label className="col-form-label">Role</label>
                                                <div>
                                                    <select
                                                        name="role"
                                                        value={formik.values.role}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        className={`form-control form-select${formik.touched.role && formik.errors.role ? " is-invalid" : ""}`}>
                                                        <option value={UserRole.STUDENT}>Student</option>
                                                        <option value={UserRole.TEACHER}>Teacher</option>
                                                        <option value={UserRole.COURSE_MANAGER}>Course Manager</option>
                                                    </select>
                                                    {formik.touched.role && formik.errors.role && (
                                                        <div className="invalid-feedback">{formik.errors.role}</div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="seperator"></div>

                                            <div className="col-12 m-t20">
                                                <div className="ml-auto m-b5">
                                                    <h3>2. More Details</h3>
                                                </div>
                                            </div>
                                            {formik.values.role === UserRole.STUDENT && (
                                                <div className="form-group col-6">
                                                    <label className="col-form-label">Grade</label>
                                                    <div>
                                                        <select
                                                            name="studentGrade"
                                                            value={formik.values.studentGrade}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            className={`form-control form-select${formik.touched.studentGrade && formik.errors.studentGrade ? " is-invalid" : ""}`}>
                                                            <option value={StudentType.GRADE10}>Grade 10</option>
                                                            <option value={StudentType.GRADE11}>Grade 11</option>
                                                            <option value={StudentType.GRADE12}>Grade 12</option>
                                                        </select>
                                                        {formik.touched.studentGrade && formik.errors.studentGrade && (
                                                            <div className="invalid-feedback">
                                                                {formik.errors.studentGrade}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                            {formik.values.role === UserRole.TEACHER && (
                                                <div className="form-group col-6">
                                                    <label className="col-form-label">Major</label>
                                                    <div>
                                                        <input
                                                            name="major"
                                                            type="text"
                                                            value={formik.values.major}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            className={`form-control${formik.touched.major && formik.errors.major ? " is-invalid" : ""}`}
                                                        />
                                                        {formik.touched.major && formik.errors.major && (
                                                            <div className="invalid-feedback">
                                                                {formik.errors.major}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                            {(formik.values.role === UserRole.TEACHER ||
                                                formik.values.role === UserRole.COURSE_MANAGER) && (
                                                <>
                                                    <div className="col-12 m-t20">
                                                        <div className="ml-auto">
                                                            <h3 className="m-form__section">3. Documents</h3>
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <table id="item-add" style={{ width: "100%" }}>
                                                            <tbody>
                                                                {uploadFiles.map((file, index) => (
                                                                    <tr key={index} className="list-item">
                                                                        <td>
                                                                            <div className="row">
                                                                                <div className="col-md-4">
                                                                                    <label className="col-form-label">
                                                                                        File name
                                                                                    </label>
                                                                                    <div>{file.name}</div>
                                                                                </div>
                                                                                <div className="col-md-3">
                                                                                    <label className="col-form-label">
                                                                                        File size
                                                                                    </label>
                                                                                    <div>{prettyBytes(file.size)}</div>
                                                                                </div>
                                                                                <div className="col-md-2">
                                                                                    <label className="col-form-label">
                                                                                        Close
                                                                                    </label>
                                                                                    <div className="form-group">
                                                                                        <a
                                                                                            className="delete"
                                                                                            href="#"
                                                                                            onClick={() => {
                                                                                                setUploadFiles(
                                                                                                    uploadFiles.filter(
                                                                                                        (_, idx) =>
                                                                                                            idx != index
                                                                                                    )
                                                                                                );
                                                                                            }}>
                                                                                            <i className="fa fa-close"></i>
                                                                                        </a>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    <div className="col-12">
                                                        <button
                                                            type="button"
                                                            onClick={() => fileUploadInput.current?.click()}
                                                            className="btn-secondry add-item m-r5">
                                                            <i className="fa fa-fw fa-plus-circle"></i>Add Item
                                                        </button>
                                                        <input
                                                            type="file"
                                                            ref={fileUploadInput}
                                                            hidden
                                                            onChange={handleUploadDocument}
                                                            multiple
                                                        />
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </HomeLayout>
    );
}
