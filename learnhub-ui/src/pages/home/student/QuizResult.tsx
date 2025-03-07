import { useEffect, useState } from "react";
import { HomeLayout } from "../../../layouts";
import { useParams } from "react-router-dom";
import NotFound from "../../error/NotFound";
import { API } from "../../../api";
import { toast } from "react-toastify";

export default function QuizResult() {
    const { id } = useParams();
    if (!id) {
        return <NotFound />;
    }
    const [grade, setGrade] = useState(0);
    useEffect(() => {
        API.get(`/students/me/quizes/attempts/${id}`)
            .then((resp) => setGrade(resp.data))
            .catch(() => toast.error("Can't get quiz grade"));
    }, [id]);
    return (
        <HomeLayout>
            <main className="ttr-wrapper">
                <div className="container-fluid">
                    <div className="db-breadcrumb">
                        <h4 className="breadcrumb-title">Do Quiz</h4>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 m-b30">You scored: {grade}</div>
                    </div>
                </div>
            </main>
        </HomeLayout>
    );
}
