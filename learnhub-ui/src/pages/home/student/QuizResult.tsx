import { HomeLayout } from "../../../layouts";
import { Link, useParams } from "react-router-dom";
import NotFound from "../../error/NotFound";
import { ChapterMaterial, Enrollment, QuizAttempt, useUser } from "../../../hooks/useUser";
import { MaterialType } from "../../../types/Course";

const findAttempt = (
    id: number,
    enrollment: Enrollment | null
): { material: ChapterMaterial; attempt: QuizAttempt } | null => {
    if (!enrollment) {
        return null;
    }
    let attempt = null;
    for (let i = 0; i < enrollment.quizAttempts.length; i++) {
        const a = enrollment.quizAttempts[i];
        if (a.id === id) {
            attempt = a;
            break;
        }
    }
    if (!attempt) {
        return null;
    }
    for (let i = 0; i < enrollment.course.chapters.length; i++) {
        const chapter = enrollment.course.chapters[i];
        for (let j = 0; j < chapter.materials.length; j++) {
            const material = chapter.materials[j];
            if (material.id === attempt.quizId && material.type === MaterialType.QUIZ && material.quiz) {
                return { material, attempt };
            }
        }
    }
    return null;
};

const calculateGrade = (totalCorrect: number, total: number) => {
    if (total === 0) return 0;
    return parseFloat(((totalCorrect / total) * 10).toFixed(2));
};

export default function QuizResult() {
    const { cid, qid, rid } = useParams();
    const id = parseInt(rid || "0");
    const { user } = useUser();
    const enrollment: Enrollment | null =
        user?.student?.enrollments.find((e) => e.course.id.toString() === cid) || null;
    const result = findAttempt(id, enrollment);

    if (!user || !user.student || isNaN(id) || !enrollment || !result) {
        return <NotFound />;
    }
    const { material, attempt } = result;

    return (
        <HomeLayout>
            <main className="ttr-wrapper">
                <div className="container-fluid">
                    <div className="w-50">
                        <h1 className="my-2">Quiz Result</h1>
                        <div className="row px-2 mb-3">
                            <div className="col-3 px-0">
                                <ul className="list-unstyled m-0">
                                    <li
                                        className="fw6 border justify-content-end px-2 d-flex"
                                        style={{ fontSize: "16px", backgroundColor: "#f0f0f0" }}>
                                        State
                                    </li>
                                    <li
                                        className="fw6 border justify-content-end px-2 d-flex"
                                        style={{ fontSize: "16px", backgroundColor: "#f0f0f0" }}>
                                        Completed on
                                    </li>
                                    <li
                                        className="fw6 border justify-content-end px-2 d-flex"
                                        style={{ fontSize: "16px", backgroundColor: "#f0f0f0" }}>
                                        Marks
                                    </li>
                                    <li
                                        className="fw6 border justify-content-end px-2 d-flex"
                                        style={{ fontSize: "16px", backgroundColor: "#f0f0f0" }}>
                                        Grade
                                    </li>
                                </ul>
                            </div>
                            <div className="col-9 px-0">
                                <ul className="list-unstyled m-0">
                                    {attempt.passed ? (
                                        <li className="fw4 border px-2 text-success" style={{ fontSize: "16px" }}>
                                            Passed
                                        </li>
                                    ) : (
                                        <li className="fw4 border px-2 text-danger" style={{ fontSize: "16px" }}>
                                            Failed
                                        </li>
                                    )}
                                    <li className="fw4 border px-2 " style={{ fontSize: "16px" }}>
                                        {new Date(attempt.submittedAt).toDateString()}
                                    </li>
                                    <li className="fw4 border px-2 " style={{ fontSize: "16px" }}>
                                        {attempt.totalCorrect} / {material.quiz?.questions.length}
                                    </li>
                                    <li className="fw4 border px-2 " style={{ fontSize: "16px" }}>
                                        <span className="fw7">
                                            {calculateGrade(attempt.totalCorrect, material.quiz?.questions.length || 0)}
                                        </span>{" "}
                                        out of 10.00
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <ul className="m-0">
                        {material.quiz?.questions.map((question, questionIdx) => (
                            <li key={questionIdx} className="row border-bottom border-top mb-4">
                                <div className="col-2 border-right py-2 pb-4">
                                    <p className="my-1" style={{ lineHeight: "1.5" }}>
                                        Question{" "}
                                        <span className="font-weight-bold" style={{ fontSize: "20px" }}>
                                            {questionIdx + 1}
                                        </span>
                                        :
                                    </p>
                                    {attempt.answers[questionIdx].optionIds.length > 0 ? (
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
                                    <div className="pb-0 pt-4">
                                        <ul className="list-unstyled ">
                                            <div className="pb-4 px-4">
                                                {question.options.map((option, optionIdx) => (
                                                    <li
                                                        key={optionIdx}
                                                        className="d-flex align-items-center"
                                                        style={{
                                                            backgroundColor: option.correct
                                                                ? "#d4edda"
                                                                : attempt.answers[questionIdx].optionIds.includes(
                                                                        option.id
                                                                    )
                                                                  ? "#f8d7da"
                                                                  : "transparent",
                                                            color: option.correct
                                                                ? "#155724"
                                                                : attempt.answers[questionIdx].optionIds.includes(
                                                                        option.id
                                                                    )
                                                                  ? "#721c24"
                                                                  : "inherit",
                                                            border: "1px solid",
                                                            borderColor: option.correct
                                                                ? "#c3e6cb"
                                                                : attempt.answers[questionIdx].optionIds.includes(
                                                                        option.id
                                                                    )
                                                                  ? "#f5c6cb"
                                                                  : "transparent",
                                                            borderRadius: "4px",
                                                            padding: "10px",
                                                            marginBottom: "5px"
                                                        }}>
                                                        <div>
                                                            <input
                                                                className="mr-2"
                                                                type="checkbox"
                                                                id={`questions[${questionIdx}].answers[${optionIdx}].chosen`}
                                                                checked={attempt.answers[
                                                                    questionIdx
                                                                ].optionIds.includes(option.id)}
                                                                readOnly
                                                            />
                                                            <label
                                                                htmlFor={`questions[${questionIdx}].answers[${optionIdx}].chosen`}
                                                                className="my-0">
                                                                {option.text}
                                                            </label>
                                                        </div>
                                                        {option.correct && (
                                                            <i className="fa fa-check text-success ml-auto"></i>
                                                        )}
                                                    </li>
                                                ))}
                                            </div>
                                            <div className="px-0 py-3 px-2" style={{ backgroundColor: "#fcefdc" }}>
                                                <span>{question.explanation}</span>
                                            </div>
                                        </ul>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div
                        className="d-flex justify-content-end"
                        style={{ position: "fixed", bottom: "20px", right: "40px" }}>
                        <Link className="btn" to={`/home/courses/${cid}/materials/${qid}`}>
                            Return
                        </Link>
                    </div>
                </div>
            </main>
        </HomeLayout>
    );
}
