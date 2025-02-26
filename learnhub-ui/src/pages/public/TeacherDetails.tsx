import { useEffect, useState } from "react";
import { Footer, Header } from "../../layouts";
import { API } from "../../api";
import { useParams } from "react-router-dom";
import NotFound from "../error/NotFound";
import { isAxiosError } from "axios";
interface Course {
    id: number;
    name: string;
    category: { id: number; name: string };
    price: number;
}

interface Teacher {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    major: string;
    phone: string;
    school: string;
    address: string;
    city: string;
    website: string;
    about: string;
    courses: Course[];
}

export default function TeacherDetails() {
    const { id } = useParams();

    const [notFound, setNotFound] = useState(false);
    const [teacher, setTeacher] = useState<Teacher>({
        id: parseInt(id || "0"),
        email: "",
        firstName: "",
        lastName: "",
        major: "",
        phone: "",
        school: "",
        address: "",
        city: "",
        website: "",
        about: "",
        courses: []
    });

    useEffect(() => {
        const fetchTeacherData = async () => {
            try {
                const response = await API.get(`public/teachers/${id}`);
                setTeacher(response?.data);
                console.log(response);
            } catch (error) {
                if (isAxiosError(error) && error.response?.status === 404) {
                    setNotFound(true);
                }
            }
        };

        fetchTeacherData();
    }, [id]);

    if (!id || isNaN(parseInt(id)) || notFound) {
        return <NotFound />;
    }

    return (
        <div className="page-content bg-white">
            <Header />
            <div className="page-banner ovbl-dark" style={{ backgroundImage: "url(assets/images/banner/banner1.jpg)" }}>
                <div className="container">
                    <div className="page-banner-entry">
                        <h1 className="text-white">Profile</h1>
                    </div>
                </div>
            </div>
            <div className="content-block">
                <div className="section-area section-sp1">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3 col-md-4 col-sm-12 m-b30">
                                <div className="profile-bx text-center">
                                    <div className="user-profile-thumb">
                                        <img src="/assets/images/profile/pic1.jpg" alt="" />
                                    </div>
                                    <div className="profile-info">
                                        <h4>
                                            {teacher.firstName} {teacher.lastName}
                                        </h4>
                                        <span>{teacher.email}</span>
                                    </div>
                                    <div className="profile-tabnav">
                                        <ul className="nav nav-tabs">
                                            <li className="nav-item">
                                                <a className="nav-link active" data-toggle="tab" href="#courses">
                                                    <i className="ti-book"></i>Courses
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="tab" href="#edit-profile">
                                                    <i className="ti-pencil-alt"></i>Teacher information
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-9 col-md-8 col-sm-12 m-b30">
                                <div className="profile-content-bx">
                                    <div className="tab-content">
                                        <div className="tab-pane active" id="courses">
                                            <div className="profile-head">
                                                <h3>Courses</h3>
                                            </div>
                                            <div className="courses-filter">
                                                <div className="clearfix">
                                                    <ul id="masonry" className="ttr-gallery-listing magnific-image row">
                                                        {teacher.courses.map((course: Course) => (
                                                            <div
                                                                key={course.id}
                                                                className="action-card col-xl-4 col-lg-6 col-md-12 col-sm-6 publish">
                                                                <div className="cours-bx">
                                                                    <div className="action-box">
                                                                        <img
                                                                            src="/assets/images/courses/pic1.jpg"
                                                                            alt=""
                                                                        />
                                                                        <a href="#" className="btn">
                                                                            Read More
                                                                        </a>
                                                                    </div>
                                                                    <div className="info-bx text-center">
                                                                        <h5>
                                                                            <a href="#">{course.name}</a>
                                                                        </h5>
                                                                        <span>{course.category.name}</span>
                                                                    </div>
                                                                    <div className="cours-more-info">
                                                                        <div className="review">
                                                                            <span>3 Review</span>
                                                                            <ul className="cours-star">
                                                                                <li className="active">
                                                                                    <i className="fa fa-star"></i>
                                                                                </li>
                                                                                <li className="active">
                                                                                    <i className="fa fa-star"></i>
                                                                                </li>
                                                                                <li className="active">
                                                                                    <i className="fa fa-star"></i>
                                                                                </li>
                                                                                <li>
                                                                                    <i className="fa fa-star"></i>
                                                                                </li>
                                                                                <li>
                                                                                    <i className="fa fa-star"></i>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                        <div className="price">
                                                                            <h5>${course.price}</h5>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tab-pane" id="edit-profile">
                                            <div className="profile-head">
                                                <h3>Teacher deatails</h3>
                                            </div>
                                            <form className="edit-profile">
                                                <div className="">
                                                    <div className="form-group row">
                                                        <div className="col-12 col-sm-9 col-md-9 col-lg-10 ml-auto">
                                                            <h3>1. About</h3>
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-12 col-sm-3 col-md-3 col-lg-2 col-form-label"></label>
                                                        <span className="col-12 col-sm-9 col-md-9 col-lg-7">
                                                            {teacher.about}
                                                        </span>
                                                    </div>
                                                    <div className="seperator"></div>
                                                    <div className="form-group row">
                                                        <div className="col-12 col-sm-9 col-md-9 col-lg-10 ml-auto">
                                                            <h3>2. Personal Details</h3>
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-12 col-sm-3 col-md-3 col-lg-2 col-form-label">
                                                            First name
                                                        </label>
                                                        <input
                                                            className="col-12 col-sm-9 col-md-9 col-lg-7"
                                                            value={teacher.firstName}
                                                            readOnly></input>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-12 col-sm-3 col-md-3 col-lg-2 col-form-label">
                                                            Last name
                                                        </label>
                                                        <input
                                                            className="col-12 col-sm-9 col-md-9 col-lg-7"
                                                            value={teacher.lastName}
                                                            readOnly></input>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-12 col-sm-3 col-md-3 col-lg-2 col-form-label">
                                                            Email
                                                        </label>
                                                        <input
                                                            className="col-12 col-sm-9 col-md-9 col-lg-7"
                                                            value={teacher.email}
                                                            readOnly></input>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-12 col-sm-3 col-md-3 col-lg-2 col-form-label">
                                                            Phone
                                                        </label>
                                                        <input
                                                            className="col-12 col-sm-9 col-md-9 col-lg-7"
                                                            value={teacher.phone || ""}
                                                            readOnly></input>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-12 col-sm-3 col-md-3 col-lg-2 col-form-label">
                                                            Website
                                                        </label>
                                                        <a
                                                            className="col-12 col-sm-9 col-md-9 col-lg-7"
                                                            style={{ cursor: "pointer" }}
                                                            href={teacher.website}
                                                            target="_blank"
                                                            rel="noopener noreferrer">
                                                            {teacher.website}
                                                        </a>
                                                    </div>
                                                    <div className="seperator"></div>
                                                </div>
                                                <div className="form-group row">
                                                    <div className="col-12 col-sm-9 col-md-9 col-lg-10 ml-auto">
                                                        <h3>3. Address</h3>
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-12 col-sm-3 col-md-3 col-lg-2 col-form-label">
                                                        Address
                                                    </label>
                                                    <input
                                                        className="col-12 col-sm-9 col-md-9 col-lg-7"
                                                        value={teacher.address || ""}
                                                        readOnly></input>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-12 col-sm-3 col-md-3 col-lg-2 col-form-label">
                                                        City
                                                    </label>
                                                    <input
                                                        className="col-12 col-sm-9 col-md-9 col-lg-7"
                                                        value={teacher.city || ""}
                                                        readOnly></input>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-12 col-sm-3 col-md-3 col-lg-2 col-form-label">
                                                        School
                                                    </label>
                                                    <input
                                                        className="col-12 col-sm-9 col-md-9 col-lg-7"
                                                        value={teacher.school || ""}
                                                        readOnly></input>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
