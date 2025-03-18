import { Link, useNavigate, useParams } from "react-router-dom";
import { HomeLayout } from "../../../layouts";
import QuizForm from "./QuizForm";
import { FormikHelpers } from "formik";
import { toast } from "react-toastify";
import { API } from "../../../api";
import { MaterialType } from "../../../types/Course";
import { useUser } from "../../../hooks/useUser";

interface Option {
    text: string;
    correct: boolean;
}

interface Question {
    text: string;
    explanation: string;
    options: Option[];
}

interface FormValues {
    name: string;
    passGrade: number;
    description: string;
    questions: Question[];
}

export default function AddQuiz() {
    const { cid, chid } = useParams();
    const { refreshUser } = useUser();
    const navigate = useNavigate();

    const handleSubmit = async (values: FormValues, { setSubmitting, resetForm }: FormikHelpers<FormValues>) => {
        try {
            const resp = await API.post(`/courses/chapters/${chid}/materials`, {
                name: values.name,
                type: MaterialType.QUIZ,
                description: values.description,
                quiz: {
                    passGrade: values.passGrade,
                    questions: values.questions
                }
            });
            if (resp.status === 200) {
                toast.success("Add quiz successfully");
                refreshUser();
                navigate(`/home/courses/${cid}`);
            }
        } catch (err) {
            toast.error("Add Quiz failed");
            resetForm();
        } finally {
            setSubmitting(false);
        }
    };

    const initialValues = {
        name: "",
        passGrade: 0,
        description: "",
        questions: []
    };
    return (
        <HomeLayout>
            <main className="ttr-wrapper">
                <div className="container-fluid">
                    <div className="db-breadcrumb">
                        <h4 className="breadcrumb-title">Add Quiz</h4>
                        <ul className="db-breadcrumb-list">
                            <li>
                                <Link to={`/home/courses/${cid}`}>
                                    <i className="fa fa-home"></i>Course
                                </Link>
                            </li>
                            <li>Add Quiz</li>
                        </ul>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 m-b30">
                            <div className="widget-box">
                                <div className="widget-inner">
                                    <QuizForm initialValues={initialValues} onSubmit={handleSubmit} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </HomeLayout>
    );
}
