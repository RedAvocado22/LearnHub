import prettyBytes from "pretty-bytes";
import { useRef } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";
import * as yup from "yup";
import { ErrorMessage, Form, Formik, FormikHelpers } from "formik";
import FormField from "../../layouts/FormField";
import { API } from "../../api";

interface FormValues {
    teacher?: {
        major: string;
        workAddress: string;
        city?: string;
        website?: string;
        biography?: string;
    };
    manager?: {
        department: string;
    };
    documents: File[];
}

const validateDocuments = yup.array().min(1, "You must upload at least 1 file").required("Documents is required");

const validationSchemas: Record<string, any> = {
    teacher: yup.object({
        teacher: yup.object({
            major: yup.string().required("Major is required"),
            workAddress: yup.string().required("Work Address is required"),
            city: yup.string().optional(),
            website: yup.string().optional(),
            biography: yup.string().optional()
        }),
        documents: validateDocuments
    }),
    manager: yup.object({
        manager: yup.object({
            department: yup.string().required("Department is required")
        }),
        documents: validateDocuments
    })
};

export default function AddContactDetails() {
    const { id, target } = useParams();
    const validationSchema = validationSchemas[target || ""] || yup.object({ documents: validateDocuments });
    const initialValues: FormValues = {
        teacher:
            target === "teacher" ? { major: "", workAddress: "", city: "", website: "", biography: "" } : undefined,
        manager: target === "manager" ? { department: "" } : undefined,
        documents: []
    };
    const fileUploadInput = useRef<HTMLInputElement>(null);

    const handleAddDocuments = async (values: FormValues, { setSubmitting, resetForm }: FormikHelpers<FormValues>) => {
        try {
            const data = new FormData();
            data.append(
                "details",
                new Blob([JSON.stringify({ teacher: values.teacher, manager: values.manager })], {
                    type: "application/json"
                })
            );
            values.documents.forEach((doc) => data.append("documents", doc));
            const resp = await API.post(`/public/contacts/${id}`, data, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            if (resp.status === 200) {
                toast.success("Update details successfully");
                resetForm();
            }
        } catch (err) {
            let msg = "Something went wrong";
            if (isAxiosError(err)) {
                msg = err.response?.data.error || msg;
            }
            toast.error(msg);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <main className="container mt-3">
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleAddDocuments}>
                {({ values, setFieldValue, isSubmitting }) => (
                    <Form noValidate>
                        <div className="card shadow-sm">
                            <div className="card-header">
                                <h2 className="mb-0">Add Details</h2>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    {target === "teacher" && (
                                        <>
                                            <div className="form-group col-6">
                                                <label className="col-form-label">Major</label>
                                                <FormField name="teacher.major" placeholder="What are you good at?" />
                                            </div>
                                            <div className="form-group col-6">
                                                <label className="col-form-label">Work Address</label>
                                                <FormField
                                                    name="teacher.workAddress"
                                                    placeholder="Where do you work?"
                                                />
                                            </div>
                                            <div className="form-group col-6">
                                                <label className="col-form-label">City</label>
                                                <FormField name="teacher.city" placeholder="Where do you live?" />
                                            </div>
                                            <div className="form-group col-6">
                                                <label className="col-form-label">Website</label>
                                                <FormField name="teacher.website" placeholder="A portfolio about you" />
                                            </div>
                                            <div className="form-group col-12">
                                                <label className="col-form-label">Biography</label>
                                                <FormField
                                                    as="textarea"
                                                    name="teacher.biography"
                                                    placeholder="Tell a bit about yourself"
                                                />
                                            </div>
                                        </>
                                    )}
                                    {target === "manager" && (
                                        <div className="form-group col-6">
                                            <label className="col-form-label">Department</label>
                                            <FormField name="manager.department" placeholder="What your specialty?" />
                                        </div>
                                    )}
                                    <div className="col-12">
                                        <table id="item-add" style={{ width: "100%" }}>
                                            <tbody>
                                                {values.documents.map((file, index) => (
                                                    <tr key={index} className="list-item">
                                                        <td>
                                                            <div className="row">
                                                                <div className="col-md-7">
                                                                    <label className="col-form-label">File name</label>
                                                                    <div>{file.name}</div>
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <label className="col-form-label">File size</label>
                                                                    <div>{prettyBytes(file.size)}</div>
                                                                </div>
                                                                <div className="col-md-2">
                                                                    <label className="col-form-label">Remove</label>
                                                                    <div className="form-group">
                                                                        <a
                                                                            className="delete"
                                                                            href="#"
                                                                            onClick={() =>
                                                                                setFieldValue(
                                                                                    "documents",
                                                                                    values.documents.filter(
                                                                                        (_, idx) => idx !== index
                                                                                    )
                                                                                )
                                                                            }>
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
                                            onChange={(e) => {
                                                const files = e.target.files;
                                                if (files && files.length > 0) {
                                                    setFieldValue("documents", [
                                                        ...values.documents,
                                                        ...Array.from(files)
                                                    ]);
                                                }
                                            }}
                                            multiple
                                        />
                                        <ErrorMessage name="documents" component="div" className="text-danger mt-2" />
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer">
                                <button type="submit" className="btn btn-block w-100" disabled={isSubmitting}>
                                    {isSubmitting ? "Submitting..." : "Submit"}
                                </button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </main>
    );
}
