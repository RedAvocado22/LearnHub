import { Link } from "react-router-dom";
import { HomeLayout } from "../../../layouts";
import { useEffect, useState } from "react";
import { API } from "../../../api";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

interface Category {
    id: number;
    name: string;
    totalCourses: number;
}

export default function AddCategory() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [ready, setReady] = useState(false);

    const fetchCategories = async () => {
        try {
            const resp = await API.get("/categories");
            if (resp.data) {
                setCategories(resp.data);
            }
        } catch (err) {
            toast.error("Can't fetch categories");
        }
    };

    const handleAdd = async () => {
        const { value } = await Swal.fire({
            title: "Add new category",
            input: "text",
            inputPlaceholder: "Type the name here...",
            showCancelButton: true
        });
        if (value) {
            try {
                const resp = await API.post("/categories", { name: value });
                if (resp.status === 200) {
                    toast.success("Add category successfully");
                    await fetchCategories();
                }
            } catch (err) {
                toast.error("Can't add category");
            }
        }
    };

    useEffect(() => {
        fetchCategories().finally(() => setReady(true));
        return () => setReady(false);
    }, []);

    if (!ready) return null;

    return (
        <HomeLayout>
            <main className="ttr-wrapper">
                <div className="container-fluid">
                    <div className="db-breadcrumb">
                        <h4 className="breadcrumb-title">Add Category</h4>
                        <ul className="db-breadcrumb-list">
                            <li>
                                <Link to="/admin/courses">
                                    <i className="fa fa-home"></i>Courses
                                </Link>
                            </li>
                            <li>Add Category</li>
                        </ul>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 m-b30">
                            <div className="widget-box">
                                <div className="wc-title d-flex justify-content-between align-items-center">
                                    <h4>Add Category</h4>
                                    <button type="button" className="btn" onClick={handleAdd}>
                                        Add Category
                                    </button>
                                </div>
                                <div className="widget-inner">
                                    <div className="edit-profile m-b30">
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="ml-auto m-b5">
                                                    <h3>All Categories</h3>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <table className="table table-striped table-hover">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">Index</th>
                                                            <th scope="col">Category</th>
                                                            <th scope="col">No. Courses</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {categories.map((cat, idx) => (
                                                            <tr key={idx}>
                                                                <th>{idx + 1}</th>
                                                                <td>{cat.name}</td>
                                                                <td>{cat.totalCourses}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
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
