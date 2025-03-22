import { useNavigate, useParams } from "react-router-dom";
import { HomeLayout } from "../../../layouts";
import NotFound from "../../error/NotFound";
import { ChapterMaterial, Enrollment, useUser } from "../../../hooks/useUser";
import { MaterialType } from "../../../types/Course";
import { Field, Form, Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import { API } from "../../../api";
import { toast } from "react-toastify";

interface Option {
    id: number;
    chosen: boolean;
}

interface Question {
    id: number;
    answers: Option[];
}

interface FormValues {
    questions: Question[];
}

const findQuiz = (id: number, enrollment: Enrollment | null): ChapterMaterial | null => {
    if (!enrollment) {
        return null;
    }
    for (let i = 0; i < enrollment.course.chapters.length; i++) {
        const chapter = enrollment.course.chapters[i];
        for (let j = 0; j < chapter.materials.length; j++) {
            const material = chapter.materials[j];
            if (material.id === id && material.type === MaterialType.QUIZ && material.quiz) {
                return material;
            }
        }
    }
    return null;
};

const validationSchema = yup.object({
    questions: yup.array().of(
        yup.object({
            answers: yup.array().of(
                yup.object({
                    chosen: yup.boolean()
                })
            )
        })
    )
});

export default function DoQuiz() {
    const { cid, qid } = useParams();
    const id = parseInt(qid || "0");
    const { user, refreshUser } = useUser();
    const enrollment: Enrollment | null =
        user?.student?.enrollments.find((e) => e.course.id.toString() === cid) || null;
    const material = findQuiz(id, enrollment);
    const navigate = useNavigate();

    const handleSubmit = async (values: FormValues, { setSubmitting, resetForm }: FormikHelpers<FormValues>) => {
        if (!user || !enrollment || !material) {
            return;
        }
        try {
            const resp = await API.post(
                `/enrollments/students/${user.id}/courses/${enrollment.course.id}/quizzes/${material.id}/grade`,
                values
            );
            if (resp.status === 200) {
                const attemptId = resp.data;
                refreshUser();
                navigate(`/home/courses/${enrollment.course.id}/quizzes/${material.id}/result/${attemptId}`);
            }
        } catch (err) {
            toast.error("Failed to grade quiz");
            resetForm();
        } finally {
            setSubmitting(false);
        }
    };

    if (!user || !user.student || isNaN(id) || !enrollment || !material || !material.quiz) {
        return <NotFound />;
    }

    const initialValues: FormValues = {
        questions: material.quiz.questions.map((question) => ({
            id: question.id,
            answers: question.options.map((option) => ({
                id: option.id,
                chosen: false
            }))
        }))
    };

    return (
        <HomeLayout>
            <div className="container-fluid" style={{ marginTop: "80px", maxHeight: "calc(100vh - 80px)" }}>
                <h1 className="text-black my-2 ">{material.name}</h1>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                    {({ values, isSubmitting }) => (
                        <Form noValidate>
                            <ul className="m-0">
                                {material.quiz?.questions.map((question, qid) => (
                                    <li key={qid} className="row border-bottom border-top mb-4">
                                        <div className="col-2 border-right py-2 pb-4">
                                            <p className="my-1" style={{ lineHeight: "1.5" }}>
                                                Question{" "}
                                                <span className="font-weight-bold" style={{ fontSize: "20px" }}>
                                                    {qid + 1}
                                                </span>
                                                :
                                            </p>
                                            {values.questions[qid].answers.some((ans) => ans.chosen) ? (
                                                <p className="m-0 text-success" style={{ fontSize: "12px" }}>
                                                    Answered
                                                </p>
                                            ) : (
                                                <p className="m-0 text-danger" style={{ fontSize: "12px" }}>
                                                    Not answered
                                                </p>
                                            )}
                                        </div>
                                        <div className="col-10 p-0">
                                            <div className="py-2 border-bottom p-2 px-4">
                                                <h6 className="fw4 m-0">{question.text}</h6>
                                            </div>
                                            <div className="p-4">
                                                <h3 className="fw3 m-0" style={{ fontSize: "14px" }}>
                                                    Select one or more:
                                                </h3>
                                                <ul className="list-unstyled">
                                                    {question.options.map((option, oid) => (
                                                        <li key={oid} className="d-flex align-items-center">
                                                            <Field
                                                                className="mr-2"
                                                                type="checkbox"
                                                                id={`questions[${qid}].answers[${oid}].chosen`}
                                                                name={`questions[${qid}].answers[${oid}].chosen`}
                                                            />
                                                            <label
                                                                htmlFor={`questions[${qid}].answers[${oid}]chosen`}
                                                                className="my-0">
                                                                {option.text}
                                                            </label>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            <div
                                className="d-flex justify-content-end"
                                style={{ position: "fixed", bottom: "20px", right: "40px" }}>
                                <button type="submit" className="btn btn-secondary" disabled={isSubmitting}>
                                    {isSubmitting ? "Submitting..." : "Submit"}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </HomeLayout>
    );
}
