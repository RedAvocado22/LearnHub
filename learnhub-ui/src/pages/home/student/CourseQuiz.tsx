import { Link, useParams } from "react-router-dom";
import { HomeLayout } from "../../../layouts";
import { useEffect, useState } from "react";
import { API } from "../../../api";
import { toast } from "react-toastify";

interface QuizHistory {
    id: number;
    attemptedAt: string;
    grade: number;
}

interface Option {
    id: number;
    text: string;
}

interface Question {
    id: number;
    text: string;
    options: Option[];
}

interface Quiz {
    title: string;
    description: string;
    questions: Question[];
    history: QuizHistory[];
}
const temp: Quiz = {
    title: "Quiz Number 1",
    description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type.",
    questions: [
        {
            id: 1,
            text: " 1+1",
            options: [
                {
                    id: 1,
                    text: "A : 2"
                },
                {
                    id: 2,
                    text: "B : 3"
                },
                {
                    id: 3,
                    text: "C : 4"
                },
                {
                    id: 4,
                    text: "D : 5"
                }
            ]
        },
        {
            id: 2,
            text: " 1+2",
            options: [
                {
                    id: 1,
                    text: "A : 2"
                },
                {
                    id: 2,
                    text: "B : 3"
                },
                {
                    id: 3,
                    text: "C : 4"
                },
                {
                    id: 4,
                    text: "D : 5"
                }
            ]
        }
    ],
    history: [
        {
            id: 1,
            attemptedAt: "2025-02-12",
            grade: 6.5
        },
        {
            id: 2,
            attemptedAt: "2024-01-30",
            grade: 8.0
        },
        {
            id: 3,
            attemptedAt: "2024-01-29",
            grade: 4.5
        }
    ]
};

export default function CourseQuiz() {
    const { qid } = useParams();
    const [quiz, setQuiz] = useState<Quiz | null>(temp);
    useEffect(() => {
        API.get(`/students/me/quizes/${qid}`)
            .then((resp) => {
                console.log(resp.data);
                setQuiz(resp.data);
            })
            .catch((err) => {
                toast.error((err as Error).message);
            });
    }, [qid]);
    return (
        <HomeLayout>
            <main className="ttr-wrapper">
                <div className="container-fluid">
                    <div className="db-breadcrumb">
                        <h4 className="breadcrumb-title">{quiz?.title}</h4>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 m-b30">
                            <div className="widget-box">
                                <div className="widget-inner">
                                    <form className="edit-profile m-b30">
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="ml-auto">
                                                    <h3>1. Description</h3>
                                                </div>
                                            </div>
                                            <div className="form-group col-12">
                                                <p>{quiz?.description}</p>
                                            </div>
                                            <div className="seperator"></div>
                                            <div className="col-12 m-t20">
                                                <div className="ml-auto">
                                                    <h3 className="m-form__section">2. Quiz History</h3>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <table id="item-add" style={{ width: "100%" }}>
                                                    <tbody>
                                                        {quiz?.history.map((attempt) => (
                                                            <tr key={attempt.id} className="list-item">
                                                                <td>
                                                                    <div className="row">
                                                                        <div className="col-md-4">
                                                                            <label className="col-form-label">
                                                                                Attempted Date
                                                                            </label>
                                                                            <div>
                                                                                {new Date(
                                                                                    attempt.attemptedAt
                                                                                ).toDateString()}
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-3">
                                                                            <label className="col-form-label">
                                                                                Grade
                                                                            </label>
                                                                            <div>{attempt.grade}</div>
                                                                        </div>
                                                                        <div className="col-md-2">
                                                                            <label className="col-form-label">
                                                                                Details
                                                                            </label>
                                                                            <div className="form-group">
                                                                                <a className="delete" href="#">
                                                                                    <i className="fa fa-close"></i>
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
                                            <div className="col-12">
                                                <Link
                                                    to={`/quiz/${qid}/do-quiz`}
                                                    state={{ id: qid, questions: quiz?.questions }}
                                                    className="btn">
                                                    Do Quiz
                                                </Link>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </HomeLayout>
    );
}
