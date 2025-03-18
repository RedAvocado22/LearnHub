import { ErrorMessage, FieldArray, Form, Formik, FormikHelpers } from "formik";
import { ChapterMaterial, Course, CourseChapter, useUser } from "../../../hooks/useUser";
import * as yup from "yup";
import FormField from "../../../layouts/FormField";
import { toast } from "react-toastify";
import { API } from "../../../api";

interface LessonMaterial {
    name: string;
    file: File | null;
}

interface FormValues {
    name: string;
    video: File | null;
    description: string;
    materials: LessonMaterial[];
}

const validationSchema = yup.object({
    name: yup.string().required("Lesson name is required"),
    video: yup.mixed().nullable(),
    description: yup.string().required("Lesson description is required"),
    materials: yup.array().of(
        yup.object({
            name: yup.string().required("Material name is required"),
            file: yup.mixed().required("Material file is required")
        })
    )
});

interface LessonDetailsProps {
    context: { course: Course; chapter: CourseChapter; material: ChapterMaterial };
    editable: boolean;
}

export default function LessonDetails({ context, editable }: LessonDetailsProps) {
    const { refreshUser } = useUser();
    if (!context.material.lesson) {
        return null;
    }

    const handleDeleteMaterial = async (fileUrl: string) => {
        try {
            const resp = await API.delete(`/courses/chapters/materials/lessons/${context.material.id}`, {
                data: { fileUrl }
            });
            if (resp.status === 200) {
                toast.success("Delete lesson material successfully");
                refreshUser();
            }
        } catch {
            toast.error("Delete lesson material failed");
        }
    };

    const handleSubmit = async (
        values: FormValues,
        { setSubmitting, resetForm, setFieldValue }: FormikHelpers<FormValues>
    ) => {
        try {
            const resp = await API.put(`/courses/chapters/materials/${context.material.id}`, {
                name: values.name,
                description: values.description
            });
            if (resp.status === 200) {
                const data = new FormData();
                let hasData = false;
                if (values.video) {
                    data.append("video", values.video);
                    hasData = true;
                }
                values.materials.forEach((m) => {
                    data.append("materialNames", m.name);
                    if (m.file) {
                        data.append("materialFiles", m.file);
                    }
                    hasData = true;
                });
                if (hasData) {
                    try {
                        const resp2 = await API.put(
                            `/courses/chapters/materials/lessons/${context.material.id}`,
                            data,
                            {
                                headers: { "Content-Type": "multipart/form-data" }
                            }
                        );
                        if (resp2.status === 200) {
                            toast.success("Add lesson files successfully");
                        }
                    } catch (err) {
                        toast.error("Add Lesson files failed");
                    }
                }
                toast.success("Update lesson successfully");
            }
        } catch (err) {
            toast.error("Add Lesson failed");
        } finally {
            refreshUser();
            setFieldValue("video", null);
            resetForm();
            setSubmitting(false);
        }
    };

    const initialValues: FormValues = {
        name: context.material.name,
        video: null,
        description: context.material.description,
        materials: []
    };

    return (
        <div className="row">
            <div className="col-12 ">
                <div className="embed-responsive embed-responsive-21by9">
                    <video className="embed-responsive-item object-fit-cover" controls>
                        <source
                            src={`http://d3dpldjcl8ur47.cloudfront.net/${context.material.lesson.videoUrl}`}
                            type="video/mp4"
                        />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>

            {!editable && (
                <>
                    <div className="col-12">
                        <div className="ml-auto d-flex justify-content-between align-items-center">
                            <h3>1. Description</h3>
                        </div>
                        <div>
                            <p>{context.material.description}</p>
                        </div>
                    </div>
                    <div className="seperator"></div>

                    <div className="col-12 m-t20">
                        <div className="ml-auto m-b5">
                            <h3>2. Materials</h3>
                        </div>
                    </div>
                    <div className="col-12">
                        <table id="item-add" style={{ width: "100%" }}>
                            <tbody>
                                {context.material.lesson.materials.map((m, index) => (
                                    <tr key={index} className="list-item">
                                        <td>
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <label className="col-form-label">Name</label>
                                                    <div>{m.name}</div>
                                                </div>
                                                <div className="col-md-2">
                                                    <label className="col-form-label">Download</label>
                                                    <div className="form-group">
                                                        <a
                                                            className="download"
                                                            target="_blank"
                                                            href={`https://learnhub-uploads.s3.ap-southeast-2.amazonaws.com/${m.fileUrl}`}
                                                            download>
                                                            <i className="fa fa-download"></i>
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
                </>
            )}
            {editable && (
                <>
                    <div className="seperator"></div>
                    <div className="col-12 m-t20">
                        <div className="ml-auto m-b5">
                            <h3>I.Update</h3>
                        </div>
                    </div>
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                        {({ values, errors, touched, isSubmitting, setFieldValue }) => (
                            <Form noValidate className="edit-profile w-100 px-3">
                                <div className="row">
                                    <div className="col-6">
                                        <div className="">
                                            <div className="ml-auto d-flex justify-content-between align-items-center">
                                                <h3>1. Basic info</h3>
                                            </div>
                                        </div>
                                        <div className="form-group ">
                                            <label className="col-form-label">Lesson title</label>
                                            <FormField name="name" />
                                        </div>
                                        <div className="form-group row">
                                            <div className="col-10">
                                                <label className="col-form-label">Video file</label>
                                                <div className="input-group">
                                                    <input
                                                        name="video"
                                                        type="file"
                                                        accept="video/*"
                                                        onChange={(e) => setFieldValue("video", e.target.files?.[0])}
                                                        className={`form-control ${touched.video && errors.video ? "is-invalid" : ""}`}
                                                    />
                                                    <ErrorMessage
                                                        name="video"
                                                        component="div"
                                                        className="invalid-feedback"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-2">
                                                <label className="col-form-label">Download</label>
                                                <div className="form-group">
                                                    <a
                                                        className="download"
                                                        target="_blank"
                                                        href={`https://learnhub-uploads.s3.ap-southeast-2.amazonaws.com/${context.material.lesson?.videoUrl}`}
                                                        download>
                                                        <i className="fa fa-download"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="seperator"></div>
                                        <div className="form-group ">
                                            <label className="col-form-label">Lesson description</label>
                                            <FormField name="description" as="textarea" />
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="col-12 m-t20">
                                            <div className="ml-auto">
                                                <h3 className="m-form__section">2. Lesson Materials</h3>
                                            </div>
                                        </div>
                                        <FieldArray name="materials">
                                            {({ push, remove }) => (
                                                <>
                                                    <div className="col-12">
                                                        <table id="item-add" style={{ width: "100%" }}>
                                                            <tbody>
                                                                {context.material.lesson?.materials.map((m, index) => (
                                                                    <tr key={index} className="list-item">
                                                                        <td>
                                                                            <div className="row">
                                                                                <div className="col-md-5">
                                                                                    <label className="col-form-label">
                                                                                        Material name
                                                                                    </label>
                                                                                    <div>{m.name}</div>
                                                                                </div>
                                                                                <div className="col-md-5">
                                                                                    <label className="col-form-label">
                                                                                        Download
                                                                                    </label>
                                                                                    <div className="form-group">
                                                                                        <a
                                                                                            className="download"
                                                                                            target="_blank"
                                                                                            href={`https://learnhub-uploads.s3.ap-southeast-2.amazonaws.com/${m.fileUrl}`}
                                                                                            download>
                                                                                            <i className="fa fa-download"></i>
                                                                                        </a>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-md-2">
                                                                                    <label className="col-form-label">
                                                                                        Remove
                                                                                    </label>
                                                                                    <div className="form-group">
                                                                                        <button
                                                                                            onClick={() =>
                                                                                                handleDeleteMaterial(
                                                                                                    m.fileUrl
                                                                                                )
                                                                                            }
                                                                                            className="delete">
                                                                                            <i className="fa fa-close" />
                                                                                        </button>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                ))}
                                                                {values.materials.map((_, index) => (
                                                                    <tr key={index} className="list-item">
                                                                        <td>
                                                                            <div className="row">
                                                                                <div className="col-md-5">
                                                                                    <label className="col-form-label">
                                                                                        Material name
                                                                                    </label>
                                                                                    <FormField
                                                                                        name={`materials[${index}].name`}
                                                                                    />
                                                                                </div>
                                                                                <div className="col-md-5">
                                                                                    <label className="col-form-label">
                                                                                        Material file
                                                                                    </label>
                                                                                    <div className="input-group">
                                                                                        <input
                                                                                            name={`materials[${index}].file`}
                                                                                            type="file"
                                                                                            accept="*"
                                                                                            className="text-sm text-truncate "
                                                                                            onChange={(e) =>
                                                                                                setFieldValue(
                                                                                                    `materials[${index}].file`,
                                                                                                    e.target.files?.[0]
                                                                                                )
                                                                                            }
                                                                                        />
                                                                                        <ErrorMessage
                                                                                            name={`materials[${index}].file`}
                                                                                            component="div"
                                                                                            className="text-sm text-danger"
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-md-2">
                                                                                    <label className="col-form-label">
                                                                                        Remove
                                                                                    </label>
                                                                                    <div className="form-group">
                                                                                        <button
                                                                                            onClick={() =>
                                                                                                remove(index)
                                                                                            }
                                                                                            className="delete">
                                                                                            <i className="fa fa-close" />
                                                                                        </button>
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
                                                            onClick={() => push({ name: "", file: null })}
                                                            className="btn-secondry add-item m-r5">
                                                            <i className="fa fa-fw fa-plus-circle"></i>Add Material
                                                        </button>
                                                    </div>
                                                </>
                                            )}
                                        </FieldArray>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-end">
                                    <button type="submit" className="btn " disabled={isSubmitting}>
                                        {isSubmitting ? "Saving..." : "Save"}
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </>
            )}
        </div>
    );
}
