import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { API } from "../../../api";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";
import { HomeLayout } from "../../../layouts";

interface Manager {
    id: number;
    name: string;
    email: string;
    department: string;
}

export default function AssignCourseManager() {
    const { courseId } = useParams();
    const location = useLocation();
    const course = location.state?.course || null;
    const navigate = useNavigate();
    const [managers, setManagers] = useState<Manager[]>([]);
    const [selectedManager, setSelectedManager] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        API.get("users/managers")
            .then((resp) => setManagers(resp.data))
            .catch((err) => {
                if (isAxiosError(err)) {
                    toast.error(err.response?.data || "Failed to load managers");
                }
                console.error((err as Error).message);
            });
    }, [courseId]);

    const handleAssignManager = async () => {
        if (!selectedManager) {
            toast.error("Please select a manager");
            return;
        }

        setLoading(true);
        try {
            await API.post(`courses/${courseId}/assign-manager`, {
                id: selectedManager
            });
            toast.success("Manager assigned successfully");
            navigate("/admin/courses");
        } catch (err) {
            if (isAxiosError(err)) {
                toast.error(err.response?.data || "Failed to assign manager");
            }
            console.error((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <HomeLayout>
            <main className="ttr-wrapper">
                <div className="container-fluid">
                    <div className="db-breadcrumb">
                        <h4 className="breadcrumb-title">Assign Course Manager</h4>
                        <ul className="db-breadcrumb-list">
                            <li>
                                <a href="#">
                                    <i className="fa fa-home"></i>Home
                                </a>
                            </li>
                            <li>
                                <a href="/admin/courses">Courses</a>
                            </li>
                            <li>Assign Manager</li>
                        </ul>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 m-b30">
                            <div className="widget-box">
                                <div className="widget-inner">
                                    <div className="card">
                                        <div className="card-header">
                                            <h4>Assign Manager to Course: {course?.name}</h4>
                                        </div>
                                        <div className="card-body">
                                            <div className="form-group">
                                                <label className="col-form-label">Teacher</label>
                                                <div>{course?.teacherEmail}</div>
                                            </div>
                                            <div className="form-group">
                                                <label className="col-form-label">Category</label>
                                                <div>{course?.category.name}</div>
                                            </div>
                                            <div className="form-group">
                                                <label className="col-form-label">Select Manager</label>
                                                <select
                                                    className="form-control"
                                                    value={selectedManager || ""}
                                                    onChange={(e) => setSelectedManager(Number(e.target.value))}>
                                                    <option value="">-- Select a Manager --</option>
                                                    {managers.map((manager) => (
                                                        <option key={manager.id} value={manager.id}>
                                                            {manager.name} ({manager.email}) - Department:{" "}
                                                            {manager.department}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <button
                                                    className="btn btn-primary"
                                                    onClick={handleAssignManager}
                                                    disabled={loading}>
                                                    {loading ? "Processing..." : "Assign Manager"}
                                                </button>
                                                <button
                                                    className="btn btn-light ml-2"
                                                    onClick={() => navigate("/admin/courses")}
                                                    disabled={loading}>
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </HomeLayout>
    );
}
