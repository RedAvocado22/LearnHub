import { useLocation, useNavigate } from "react-router-dom";
import { HomeLayout } from "../../../layouts";
import { useState } from "react";
import { API } from "../../../api";
import NotFound from "../../error/NotFound";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";

interface Option {
    id: number;
    text: string;
}

interface Question {
    id: number;
    text: string;
    options: Option[];
}

export default function DoQuiz() {
    const location = useLocation();
    console.log(location.state.questions);
    const quizId = location.state.id;
    if (!quizId) {
        return <NotFound />;
    }
    const questions: Question[] = location.state.questions || [];
    const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
    const navigate = useNavigate();
    const onChange = (id: number, checked: boolean) => {
        if (selectedOptions.includes(id) && checked === false) {
            setSelectedOptions(selectedOptions.filter((optionId) => optionId !== id));
        } else if (!selectedOptions.includes(id) && checked === true) {
            setSelectedOptions([...selectedOptions, id]);
        }
    };
    const submit = async () => {
        try {
            const resp = await API.post(`/students/me/quizes/${quizId}/grade`, selectedOptions);
            if (resp.status === 200) {
                navigate(`/quiz/result/${resp.data}`);
            }
        } catch (err) {
            if (isAxiosError(err)) {
                console.error(err.response?.data);
            } else {
                console.error((err as Error).message);
            }
            toast.error("Failed to submit quiz");
        }
    };
    return (
        <HomeLayout>
            <main className="ttr-wrapper">
                <div className="container-fluid">
                    <div className="db-breadcrumb">
                        <h4 className="breadcrumb-title">Do Quiz</h4>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 m-b30">
                            <div className="widget-box">
                                <div className="widget-inner">
                                    <form className="edit-profile m-b30">
                                        {questions.map((question, index) => (
                                            <div key={question.id} className="row">
                                                <div className="col-12">
                                                    <div className="ml-auto">
                                                        <h3>
                                                            {index + 1}. {question.text}
                                                        </h3>
                                                    </div>
                                                </div>
                                                {question.options.map((option) => (
                                                    <div key={option.id} className="form-group col-6">
                                                        <input
                                                            type="checkbox"
                                                            id={`option_${option.id}`}
                                                            checked={selectedOptions.includes(option.id)}
                                                            onChange={(e) => onChange(option.id, e.target.checked)}
                                                        />
                                                        <label htmlFor={`option_${option.id}`}>{option.text}</label>
                                                    </div>
                                                ))}
                                            </div>
                                        ))}
                                        <div className="row">
                                            <div className="col-12">
                                                <button onClick={submit} type="button" className="btn">
                                                    Submit
                                                </button>
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
