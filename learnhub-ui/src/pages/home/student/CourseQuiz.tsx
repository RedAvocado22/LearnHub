import { Link } from "react-router-dom";
import { ChapterMaterial, Course, QuizAttempt } from "../../../hooks/useUser";

interface CourseQuizProps {
    course: Course;
    material: ChapterMaterial;
    attempts: QuizAttempt[];
}

const calculateGrade = (totalCorrect: number, total: number) => {
    if (total === 0) return 0;
    return parseFloat(((totalCorrect / total) * 10).toFixed(2));
};

export default function CourseQuiz({ course, material, attempts }: CourseQuizProps) {
    if (!material.quiz) {
        return null;
    }
    const quiz = material.quiz;
    return (
        <>
            <h4 className="m-0">{material.name}</h4>
            <div className="mt-3">
                <h5 className="m-0">Description</h5>
                <p>{material.description}</p>
                <p>
                    You need to achieve {calculateGrade(material.quiz.passGrade, material.quiz.questions.length)} /
                    10.00 to passed
                </p>
            </div>
            <div className="mt-3">
                <h5 className="m-0">Summary of your previous attempts :</h5>
                <table className="table table-striped  table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Attempt</th>
                            <th scope="col">State</th>
                            <th scope="col" className="text-center">
                                Corrects
                            </th>
                            <th scope="col" className="text-center">
                                Marks
                            </th>
                            <th scope="col" className="text-center">
                                Preview
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {attempts.map((a, idx) => (
                            <tr key={idx}>
                                <th scope="row">{idx + 1}</th>
                                <td>
                                    {a.passed ? (
                                        <p className="m-0 text-success">Passed</p>
                                    ) : (
                                        <p className="m-0 text-danger">Failed</p>
                                    )}
                                    <p className="m-0">Submitted on {new Date(a.submittedAt).toDateString()}</p>
                                </td>
                                <td className="text-center">
                                    {a.totalCorrect} / {quiz.questions.length}
                                </td>
                                <td className="text-center">{calculateGrade(a.totalCorrect, quiz.questions.length)}</td>
                                <td className="text-center">
                                    <Link
                                        to={`/home/courses/${course.id}/quizzes/${material.id}/result/${a.id}`}
                                        style={{ textDecoration: "underline" }}>
                                        Preview
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {attempts.length > 0 && (
                <h5>
                    Highest grade:{" "}
                    {Math.max(...attempts.map((a) => calculateGrade(a.totalCorrect, quiz.questions.length)))} / 10.00.
                </h5>
            )}
        </>
    );
}
