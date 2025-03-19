import { ChapterMaterial, Course, CourseChapter } from "../../../hooks/useUser";

interface QuizDetailsProps {
    context: { course: Course; chapter: CourseChapter; material: ChapterMaterial };
}

export default function QuizDetails({ context }: QuizDetailsProps) {
    if (!context.material.quiz) {
        return null;
    }

    return (
        <div className="edit-profile m-b30">
            <div className="row">
                <div className="form-group col-12">
                    <label className="col-form-label">Pass Grade</label>
                    <div>{context.material.quiz.passGrade}</div>
                </div>
                <div className="form-group col-12">
                    <label className="col-form-label">Description</label>
                    <p>{context.material.description}</p>
                </div>
                {context.material.quiz.questions.map((question, index) => (
                    <div key={index} className="col-12">
                        <div className="my-3 card">
                            <div className="card-header">
                                <h5>{question.text}</h5>
                            </div>
                            <div className="card-body">
                                <ul>
                                    {question.options.map((option, optIndex) => (
                                        <li key={optIndex} className="card my-3">
                                            <div className="card-body">
                                                <div className="d-flex justify-content-between align-items-center w-100">
                                                    <div className="row w-100">
                                                        <div className="col-8">{option.text}</div>
                                                        {option.correct && (
                                                            <div className="col-auto text-success">Correct</div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                <div>
                                    <h6>Explanation</h6>
                                    <p>{question.explanation}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
