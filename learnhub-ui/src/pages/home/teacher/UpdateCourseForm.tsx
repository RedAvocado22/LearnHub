import { ErrorMessage, Form, Formik, FormikHelpers } from "formik";
import FormField from "../../../layouts/FormField";
import { Course, useUser } from "../../../hooks/useUser";
import defaultThumbnail from "/assets/images/blog/default/thum1.jpg";
import { API } from "../../../api";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useEffect, useState } from "react";

interface Category {
    id: number;
    name: string;
}

interface FormValues {
    metadata: {
        name: string;
        price: number;
        categoryId: number;
        description: string;
    };
    image: File | null;
}

interface UpdateCourseFormProps {
    course: Course;
    setPreviewImage: React.Dispatch<React.SetStateAction<string>>;
}

export default function UpdateCourseForm({ course, setPreviewImage }: UpdateCourseFormProps) {
    const { refreshUser } = useUser();
    const [categories, setCategories] = useState<Category[]>([]);

    const handleChangeImage = (
        e: React.ChangeEvent<HTMLInputElement>,
        setFieldValue: (field: string, value: any) => void
    ) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setPreviewImage(reader.result as string);
                setFieldValue("image", file);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (
        values: FormValues,
        { setSubmitting, resetForm, setFieldValue }: FormikHelpers<FormValues>
    ) => {
        try {
            const data = new FormData();
            data.append("metadata", new Blob([JSON.stringify(values.metadata)], { type: "application/json" }));
            if (values.image) {
                data.append("image", values.image);
            }
            const resp = await API.put(`/courses/${course.id}/teacher`, data, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            if (resp.status === 200) {
                toast.success("Update course successfully");
                refreshUser();
            }
        } catch (err) {
            toast.error("Update course failed");
            setPreviewImage(course?.image || defaultThumbnail);
            setFieldValue("image", null);
            resetForm();
        } finally {
            setSubmitting(false);
        }
    };

    useEffect(() => {
        API.get("/public/categories")
            .then((resp) => setCategories(resp.data || []))
            .catch(() => toast.error("Fetch course categories failed"));
    }, []);

    const validationSchema = yup.object({
        metadata: yup.object({
            name: yup.string().required("Course title is required"),
            price: yup.number().min(0, "Course price must greater than 0").required("Course price is required"),
            categoryId: yup
                .number()
                .oneOf(
                    categories.map((c) => c.id),
                    "Must choose a valid category"
                )
                .required("Category is required."),
            description: yup.string().required("Description is required")
        }),
        image: yup.mixed().nullable()
    });

    const initialValues: FormValues = {
        metadata: {
            name: course.name,
            price: course.price,
            categoryId: course.category.id,
            description: course.description
        },
        image: null
    };

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ errors, touched, isSubmitting, setFieldValue, resetForm }) => (
                <Form noValidate>
                    <div className="row">
                        <div className="col-md-12 col-lg-6 form-group">
                            <h5 className="m-b5">Course Title</h5>
                            <FormField name="metadata.name" />
                        </div>
                        <div className="col-md-12 col-lg-6 form-group">
                            <h5 className="m-b5">Course Thumbnail</h5>

                            <div className="input-group">
                                <input
                                    name="image"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleChangeImage(e, setFieldValue)}
                                    className={`form-control ${touched.image && errors.image ? "is-invalid" : ""}`}
                                />
                                <ErrorMessage name="image" component="div" className="invalid-feedback" />
                            </div>
                        </div>
                        <div className="col-md-12 col-lg-6 form-group">
                            <h5 className="m-b5">Course Price</h5>
                            <FormField name="metadata.price" type="number" />
                        </div>
                        <div className="col-md-12 col-lg-6 form-group">
                            <h5 className="m-b5">Category</h5>
                            <FormField name="metadata.categoryId" as="select" className="form-select">
                                {categories.map((c, index) => (
                                    <option key={index} value={c.id}>
                                        {c.name}
                                    </option>
                                ))}
                            </FormField>
                        </div>
                        <div className="col-md-12 col-lg-12 form-group">
                            <h5 className="m-b5">Course Description</h5>
                            <FormField name="metadata.description" as="textarea">
                                {course.description}
                            </FormField>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 col-lg-12">
                            <button type="submit" className="btn mr-2" disabled={isSubmitting}>
                                {isSubmitting ? "Saving..." : "Save changes"}
                            </button>
                            <button
                                type="reset"
                                className="btn-secondry"
                                onClick={() => {
                                    setPreviewImage(course.image || defaultThumbnail);
                                    setFieldValue("image", null);
                                    resetForm();
                                }}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    );
}
