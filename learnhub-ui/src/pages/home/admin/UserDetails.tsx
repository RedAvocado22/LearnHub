import { Link, useParams } from "react-router-dom";
import { HomeLayout } from "../../../layouts";
import NotFound from "../../error/NotFound";
import { StudentType, UserRole, UserStatus } from "../../../types/User";
import prettyBytes from "pretty-bytes";
import { API } from "../../../api";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";

interface Document {
    fileName: string;
    fileSize: number;
    downloadLink: string;
}

interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: UserRole;
    status: UserStatus;
    createdAt: Date;
    student?: Student;
    teacher?: Teacher;
    documents: Document[];
}

interface Student {
    type: StudentType;
    school: string;
}

interface Teacher {
    major: string;
    phone: string;
    workAddress: string;
    city: string;
    website: string;
    biography: string;
    documents: Document[];
}

export default function UserDetails() {
    const { id } = useParams();
    const [user, setUser] = useState<User | null>(null);
    const [uploadFiles, setUploadFiles] = useState<File[]>([]);
    const [deleteFiles, setDeleteFiles] = useState<string[]>([]);
    const fileUploadInput = useRef<HTMLInputElement>(null);
    useEffect(() => {
        API.get(`/users/${id}`)
            .then((resp) => setUser(resp.data))
            .catch((err) => {
                if (isAxiosError(err)) {
                    toast.error(err.response?.data || "Something went wrong");
                }
                console.error((err as Error).message);
            });
    }, []);
    if (!user) {
        return <NotFound />;
    }
    const handleDownloadDocument = async (fileName: string, link: string) => {
        try {
            const resp = await API.get(`/users/${link}`, { responseType: "blob" });
            const href = URL.createObjectURL(resp.data);
            const a = document.createElement("a");
            a.href = href;
            a.setAttribute("download", fileName);
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(href);
        } catch (err) {
            if (isAxiosError(err)) {
                toast.error(err.response?.data || "Something went wrong");
            }
            console.error((err as Error).message);
        }
    };

    const handleUploadDocument = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setUploadFiles([...uploadFiles, files[0]]);
        }
    };

    const handleSaveDocumentChanges = async () => {
        for (const url of deleteFiles) {
            try {
                const resp = await API.delete(`/users/${user.id}/${url}`);
                if (resp.status === 200) {
                    toast.success("Delete file successfully");
                }
            } catch (err) {
                if (isAxiosError(err)) {
                    toast.error(err.response?.data || "Something went wrong");
                }
                console.error((err as Error).message);
            }
        }
        const formData = new FormData();
        for (const file of uploadFiles) {
            if (!file) continue;
            formData.append("files", file);
        }
        if (Array.from(formData.entries()).length > 0) {
            try {
                const resp = await API.post(`/users/${user.id}/documents`, formData, {
                    headers: { "Content-Type": "multipart/form-data" }
                });
                if (resp.status === 200) {
                    toast.success("Upload file successfully");
                }
            } catch (err) {
                if (isAxiosError(err)) {
                    toast.error(err.response?.data || "Something went wrong");
                }
                console.error((err as Error).message);
            }
        }
    };

    const handleBanUser = async () => {
        const { value } = await Swal.fire({
            title: "Ban Reason",
            input: "textarea",
            inputPlaceholder: "Type your message here...",
            showCancelButton: true
        });
        if (value) {
            // TODO: Handle ban user
            console.log(value);
        }
    };

    return (
        <HomeLayout>
            <main className="ttr-wrapper">
                <div className="container-fluid">
                    <div className="db-breadcrumb">
                        <h4 className="breadcrumb-title">User Details</h4>
                        <ul className="db-breadcrumb-list">
                            <li>
                                <Link to="/admin/users">
                                    <i className="fa fa-home"></i>Users
                                </Link>
                            </li>
                            <li>User Details</li>
                        </ul>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 m-b30">
                            <div className="widget-box">
                                <div className="wc-title d-flex justify-content-between align-items-center">
                                    <h4>
                                        {user.firstName} {user.lastName}
                                    </h4>
                                    <button type="button" className="btn" onClick={handleBanUser}>
                                        Ban User
                                    </button>
                                </div>
                                <div className="widget-inner">
                                    <form className="edit-profile m-b30">
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="ml-auto">
                                                    <h3>1. Basic info</h3>
                                                </div>
                                            </div>
                                            <div className="form-group col-6">
                                                <label className="col-form-label">First name</label>
                                                <div>{user.firstName}</div>
                                            </div>
                                            <div className="form-group col-6">
                                                <label className="col-form-label">Last name</label>
                                                <div>{user.lastName}</div>
                                            </div>
                                            <div className="form-group col-6">
                                                <label className="col-form-label">Email</label>
                                                <div>{user.email}</div>
                                            </div>
                                            <div className="form-group col-6">
                                                <label className="col-form-label">Role</label>
                                                <div>{user.role}</div>
                                            </div>
                                            <div className="form-group col-6">
                                                <label className="col-form-label">Joined Date</label>
                                                <div>{new Date(user.createdAt).toDateString()}</div>
                                            </div>
                                            <div className="form-group col-6">
                                                <label className="col-form-label">Account Status</label>
                                                <div
                                                    className={
                                                        user.status === UserStatus.ACTIVE
                                                            ? "text-success"
                                                            : "text-danger"
                                                    }>
                                                    {user.status}
                                                </div>
                                            </div>
                                            <div className="seperator"></div>

                                            <div className="col-12 m-t20">
                                                <div className="ml-auto m-b5">
                                                    <h3>2. More Details</h3>
                                                </div>
                                            </div>
                                            {user.role === UserRole.STUDENT && user.student && (
                                                <>
                                                    <div className="form-group col-6">
                                                        <label className="col-form-label">Grade</label>
                                                        <div>{user.student.type}</div>
                                                    </div>
                                                    <div className="form-group col-6">
                                                        <label className="col-form-label">School</label>
                                                        <div>{user.student.school}</div>
                                                    </div>
                                                </>
                                            )}
                                            {user.role === UserRole.TEACHER && user.teacher && (
                                                <>
                                                    <div className="form-group col-6">
                                                        <label className="col-form-label">Major</label>
                                                        <div>{user.teacher.major}</div>
                                                    </div>
                                                    <div className="form-group col-6">
                                                        <label className="col-form-label">Phone</label>
                                                        <div>{user.teacher.phone}</div>
                                                    </div>
                                                    <div className="form-group col-6">
                                                        <label className="col-form-label">Website</label>
                                                        <div>
                                                            <a href={user.teacher.website} target="_blank">
                                                                {user.teacher.website}
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="form-group col-6">
                                                        <label className="col-form-label">Work At</label>
                                                        <div>{user.teacher.workAddress}</div>
                                                    </div>
                                                    <div className="form-group col-6">
                                                        <label className="col-form-label">City</label>
                                                        <div>{user.teacher.city}</div>
                                                    </div>
                                                    <div className="form-group col-12">
                                                        <label className="col-form-label">Biography</label>
                                                        <div>
                                                            <p>{user.teacher.biography}</p>
                                                        </div>
                                                    </div>
                                                </>
                                            )}
                                            {(user.role === UserRole.TEACHER ||
                                                user.role === UserRole.COURSE_MANAGER) && (
                                                <>
                                                    <div className="col-12 m-t20">
                                                        <div className="ml-auto">
                                                            <h3 className="m-form__section">3. Documents</h3>
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <table id="item-add" style={{ width: "100%" }}>
                                                            <tbody>
                                                                {(user as User | Teacher).documents
                                                                    ?.filter(
                                                                        (doc) => !deleteFiles.includes(doc.downloadLink)
                                                                    )
                                                                    .map((doc, index) => (
                                                                        <tr key={index} className="list-item">
                                                                            <td>
                                                                                <div className="row">
                                                                                    <div className="col-md-4">
                                                                                        <label className="col-form-label">
                                                                                            File name
                                                                                        </label>
                                                                                        <div>{doc.fileName}</div>
                                                                                    </div>
                                                                                    <div className="col-md-3">
                                                                                        <label className="col-form-label">
                                                                                            File size
                                                                                        </label>
                                                                                        <div>
                                                                                            {prettyBytes(doc.fileSize)}
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-md-2">
                                                                                        <label className="col-form-label">
                                                                                            Close
                                                                                        </label>
                                                                                        <div className="form-group">
                                                                                            <a
                                                                                                className="delete"
                                                                                                href="#"
                                                                                                onClick={() =>
                                                                                                    setDeleteFiles([
                                                                                                        ...deleteFiles,
                                                                                                        doc.downloadLink
                                                                                                    ])
                                                                                                }>
                                                                                                <i className="fa fa-close"></i>
                                                                                            </a>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-md-2">
                                                                                        <label className="col-form-label">
                                                                                            Download
                                                                                        </label>
                                                                                        <div className="form-group">
                                                                                            <a
                                                                                                className="download"
                                                                                                href="#"
                                                                                                onClick={() =>
                                                                                                    handleDownloadDocument(
                                                                                                        doc.fileName,
                                                                                                        doc.downloadLink
                                                                                                    )
                                                                                                }>
                                                                                                <i className="fa fa-download"></i>
                                                                                            </a>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                    ))}
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
                                                        <button
                                                            type="button"
                                                            className="btn"
                                                            onClick={handleSaveDocumentChanges}>
                                                            Save changes
                                                        </button>
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
