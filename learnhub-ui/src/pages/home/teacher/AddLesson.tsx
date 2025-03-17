import { Link, useNavigate, useParams } from "react-router-dom";
import { HomeLayout } from "../../../layouts";
import { FormikHelpers } from "formik";
import { toast } from "react-toastify";
import { API } from "../../../api";
import { useUser } from "../../../hooks/useUser";
import LessonForm from "./LessonForm";
import { MaterialType } from "../../../types/Course";

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

export default function AddLesson() {
    const { cid, chid } = useParams();
    const { refreshUser } = useUser();
    const navigate = useNavigate();

    const handleSubmit = async (
        values: FormValues,
        { setSubmitting, resetForm, setFieldValue }: FormikHelpers<FormValues>
    ) => {
        try {
            const resp = await API.post(`/courses/chapters/${chid}/materials`, {
                name: values.name,
                type: MaterialType.LESSON,
                description: values.description
            });
            if (resp.status === 200) {
                const lessonId = resp.data;
                if (lessonId) {
                    const data = new FormData();
                    if (!values.video) {
                        throw new Error("No Video");
                    }
                    data.append("video", values.video);
                    values.materials.forEach((material) => {
                        data.append("materialNames", material.name);
                        if (material.file) {
                            data.append("materialFiles", material.file);
                        }
                    });
                    try {
                        const resp2 = await API.post(`/courses/chapters/materials/lessons/${lessonId}`, data, {
                            headers: { "Content-Type": "multipart/form-data" }
                        });
                        if (resp2.status === 200) {
                            toast.success("Add lesson successfully");
                            refreshUser();
                            navigate(`/home/courses/${cid}`);
                        }
                    } catch (err) {
                        toast.error("Add Lesson files failed");
                        setFieldValue("video", null);
                        resetForm();
                    }
                }
            }
        } catch (err) {
            console.error((err as Error).message);
            toast.error("Add Lesson failed");
            setFieldValue("video", null);
            resetForm();
        } finally {
            setSubmitting(false);
        }
    };

    const initialValues: FormValues = {
        name: "",
        video: null,
        description: "",
        materials: []
    };

    return (
        <HomeLayout>
            <main className="ttr-wrapper">
                <div className="container-fluid">
                    <div className="db-breadcrumb">
                        <h4 className="breadcrumb-title">Add Lesson</h4>
                        <ul className="db-breadcrumb-list">
                            <li>
                                <Link to={`/home/courses/${cid}`}>
                                    <i className="fa fa-home"></i>Course
                                </Link>
                            </li>
                            <li>Add Lesson</li>
                        </ul>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 m-b30">
                            <div className="widget-box">
                                <div className="widget-inner">
                                    <LessonForm initialValues={initialValues} onSubmit={handleSubmit} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </HomeLayout>
    );
}
