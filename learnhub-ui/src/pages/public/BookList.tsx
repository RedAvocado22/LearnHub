import { useEffect, useState } from "react";
import { MainLayout } from "../../layouts";
import { API } from "../../api";

interface Course {
    id: number;
    name: string;
    category: { id: number; name: string };
    price: number;
    teacher: { id: number; name: string };
}
export default function BookList() {
    const [courses, setCourses] = useState<Course[]>([]);
    useEffect(() => {
        API.get("/public/coursesId/{id}").then((resp) => {
            setCourses(resp?.data || []);
            console.log(courses);
        });
    }, []);
    return (
        <MainLayout>
            <main className="ttr-wrapper">
                <div className="container-fluid">
                    <div className="db-breadcrumb">
                        <h4 className="breadcrumb-title">Add listing</h4>
                        <ul className="db-breadcrumb-list">
                            <li>
                                <a href="#">
                                    <i className="fa fa-home"></i>Home
                                </a>
                            </li>
                            <li>Add listing</li>
                        </ul>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 m-b30">
                            <div className="widget-box">
                                <div className="wc-title">
                                    <h4>Add listing</h4>
                                </div>
                                <div className="widget-inner">
                                    <form className="edit-profile m-b30">
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="ml-auto">
                                                    <h3>1. Basic info</h3>
                                                </div>
                                            </div>
                                            <div className="form-group col-6">
                                                <label className="col-form-label">Course title</label>
                                                <div>
                                                    <input className="form-control" type="text" value="" />
                                                </div>
                                            </div>
                                            <div className="form-group col-6">
                                                <label className="col-form-label">Course title</label>
                                                <div>
                                                    <input className="form-control" type="text" value="" />
                                                </div>
                                            </div>
                                            <div className="form-group col-6">
                                                <label className="col-form-label">Course start</label>
                                                <div>
                                                    <input className="form-control" type="text" value="" />
                                                </div>
                                            </div>
                                            <div className="form-group col-6">
                                                <label className="col-form-label">Course expire</label>
                                                <div>
                                                    <input className="form-control" type="text" value="" />
                                                </div>
                                            </div>
                                            <div className="form-group col-6">
                                                <label className="col-form-label">Teacher name</label>
                                                <div>
                                                    <input className="form-control" type="text" value="" />
                                                </div>
                                            </div>
                                            <div className="seperator"></div>

                                            <div className="col-12 m-t20">
                                                <div className="ml-auto m-b5">
                                                    <h3>2. Description</h3>
                                                </div>
                                            </div>
                                            <div className="form-group col-12">
                                                <label className="col-form-label">Course description</label>
                                                <div>
                                                    <textarea className="form-control"> </textarea>
                                                </div>
                                            </div>
                                            <div className="col-12 m-t20">
                                                <div className="ml-auto">
                                                    <h3 className="m-form__section">3. Add Item</h3>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <table id="item-add" style={{ width: "100%" }}>
                                                    <tr className="list-item">
                                                        <td>
                                                            <div className="row">
                                                                <div className="col-md-4">
                                                                    <label className="col-form-label">
                                                                        Course Name
                                                                    </label>
                                                                    <div>
                                                                        <input
                                                                            className="form-control"
                                                                            type="text"
                                                                            value=""
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <label className="col-form-label">
                                                                        Course Category
                                                                    </label>
                                                                    <div>
                                                                        <input
                                                                            className="form-control"
                                                                            type="text"
                                                                            value=""
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <label className="col-form-label">
                                                                        Course Category
                                                                    </label>
                                                                    <div>
                                                                        <input
                                                                            className="form-control"
                                                                            type="text"
                                                                            value=""
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-2">
                                                                    <label className="col-form-label">Close</label>
                                                                    <div className="form-group">
                                                                        <a className="delete" href="#">
                                                                            <i className="fa fa-close"></i>
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </div>
                                            <div className="col-12">
                                                <button type="button" className="btn-secondry add-item m-r5">
                                                    <i className="fa fa-fw fa-plus-circle"></i>Add Item
                                                </button>
                                                <button type="reset" className="btn">
                                                    Save changes
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
            <div className="ttr-overlay"></div>
        </MainLayout>
    );
}
