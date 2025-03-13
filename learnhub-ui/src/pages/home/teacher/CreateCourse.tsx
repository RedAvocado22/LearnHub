import React, { useEffect, useState } from "react";
import { HomeLayout } from "../../../layouts";
import { API } from "../../../api";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";
import { useNavigate } from "react-router-dom";

interface Category {
    id: number;
    name: string;
}

const CreateCourse: React.FC = () => {
    const [imagePreview, setImagePreview] = useState<File | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);

    const navigate = useNavigate();

    useEffect(() => {
        API.get<Category[]>("/categories").then((res) => {
            setCategories(res?.data);
        });
    }, []);

    const handleSave = async (values: any) => {
        try {
            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("category", values.category);
            formData.append("price", values.price);
            formData.append("description", values.description);
            formData.append("image", values.image);

            const res = await API.post("/courses/teacher", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            if (res.status === 200) {
                toast.success("Course created successfully");
                navigate("/home/courses/private");
            }
        } catch (error) {
            if (isAxiosError(error)) {
                toast.error(error.response?.data.message);
            }
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, setFieldValue: any) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
                setFieldValue("image", file);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
            setFieldValue("image", null);
        }
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Course Name is required"),
        category: Yup.string().required("Category is required"),
        price: Yup.number().required("Price is required").positive("Price must be positive"),
        description: Yup.string().max(150, "Description must be 150 words or less").required("Description is required"),
        image: Yup.mixed().required("Image is required")
    });

    return (
        <HomeLayout>
            <main className="ttr-wrapper">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12 m-b30">
                            <div className="widget-box">
                                <div className="wc-title">
                                    <h4>Create Course</h4>
                                </div>
                                <div className="widget-inner">
                                    <Formik
                                        initialValues={{
                                            name: "",
                                            category: "",
                                            price: "",
                                            description: "",
                                            image: null
                                        }}
                                        validationSchema={validationSchema}
                                        onSubmit={(values) => {
                                            handleSave(values);
                                        }}>
                                        {({ setFieldValue }) => (
                                            <Form className="edit-profile m-b30">
                                                <div className="">
                                                    <div className="form-group row">
                                                        <label className="col-sm-2 col-form-label">Course Name</label>
                                                        <div className="col-sm-7">
                                                            <Field
                                                                className="form-control"
                                                                type="text"
                                                                id="name"
                                                                name="name"
                                                            />
                                                            <ErrorMessage
                                                                name="name"
                                                                component="div"
                                                                className="text-danger small-font"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-sm-2 col-form-label">Category</label>
                                                        <div className="col-sm-3">
                                                            <Field
                                                                as="select"
                                                                className="form-control"
                                                                id="category"
                                                                name="category">
                                                                <option value="">Select Category</option>
                                                                {categories &&
                                                                    categories.map((category) => (
                                                                        <option key={category.id} value={category.id}>
                                                                            {category.name}
                                                                        </option>
                                                                    ))}
                                                            </Field>
                                                            <ErrorMessage
                                                                name="category"
                                                                component="div"
                                                                className="text-danger small-font"
                                                            />
                                                        </div>
                                                        <label className="col-sm-1 col-form-label">Price</label>
                                                        <div className="col-sm-3">
                                                            <Field
                                                                className="form-control"
                                                                type="number"
                                                                id="price"
                                                                name="price"
                                                            />
                                                            <ErrorMessage
                                                                name="price"
                                                                component="div"
                                                                className="text-danger small-font"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-sm-2 col-form-label">
                                                            Description (150 words)
                                                        </label>
                                                        <div className="col-sm-7">
                                                            <Field
                                                                as="textarea"
                                                                className="form-control"
                                                                id="description"
                                                                name="description"
                                                                maxLength={150}
                                                            />
                                                            <ErrorMessage
                                                                name="description"
                                                                component="div"
                                                                className="text-danger small-font"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-sm-2 col-form-label">
                                                            Upload Course Image
                                                        </label>
                                                        <div className="col-sm-7">
                                                            <input
                                                                className="form-control"
                                                                type="file"
                                                                id="image"
                                                                name="image"
                                                                accept="image/*"
                                                                onChange={(e) => handleImageChange(e, setFieldValue)}
                                                            />
                                                            <ErrorMessage
                                                                name="image"
                                                                component="div"
                                                                className="text-danger small-font"
                                                            />
                                                            {imagePreview && (
                                                                <div className="mt-2" style={{ position: "relative" }}>
                                                                    <img
                                                                        src={imagePreview}
                                                                        alt="Image Preview"
                                                                        style={{
                                                                            width: "100%",
                                                                            maxWidth: "265px",
                                                                            height: "auto",
                                                                            borderRadius: "6px",
                                                                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
                                                                        }}
                                                                    />
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-2"></div>
                                                    <div className="col-sm-7">
                                                        <button type="submit" className="btn mr-2">
                                                            Create Course
                                                        </button>
                                                        <button type="reset" className="btn-secondry">
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
};

export default CreateCourse;
