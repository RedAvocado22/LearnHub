import { ErrorMessage, FieldArray, Form, Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import FormField from "../../../layouts/FormField";

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
    video: yup.mixed().required("Lesson video is required"),
    description: yup.string().required("Lesson description is required"),
    materials: yup.array().of(
        yup.object({
            name: yup.string().required("Material name is required"),
            file: yup.mixed().required("Material file is required")
        })
    )
});

interface LessonFormProps {
    initialValues: FormValues;
    onSubmit: (values: FormValues, actions: FormikHelpers<FormValues>) => void;
}

export default function LessonForm({ initialValues, onSubmit }: LessonFormProps) {
    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
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
                            <div className="form-group ">
                                <label className="col-form-label">Video file</label>
                                <div className="input-group">
                                    <input
                                        name="video"
                                        type="file"
                                        accept="video/*"
                                        onChange={(e) => setFieldValue("video", e.target.files?.[0])}
                                        className={`form-control ${touched.video && errors.video ? "is-invalid" : ""}`}
                                    />
                                    <ErrorMessage name="video" component="div" className="invalid-feedback" />
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
                                                    {values.materials.map((_, index) => (
                                                        <tr key={index} className="list-item">
                                                            <td>
                                                                <div className="row">
                                                                    <div className="col-md-5">
                                                                        <label className="col-form-label">
                                                                            Material name
                                                                        </label>
                                                                        <FormField name={`materials[${index}].name`} />
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
                                                                        <label className="col-form-label">Remove</label>
                                                                        <div className="form-group">
                                                                            <button
                                                                                onClick={() => remove(index)}
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
    );
}
