import { useEffect, useState } from "react";
import { Footer, Header } from "../layouts";
import { API } from "../api";
import { useParams } from "react-router-dom";

export default function TeacherProfile() {
    const [courses, setCourses] = useState([]);

    const { id } = useParams();

    const [profile, setProfile] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNo: "",
        major: "",
        address: "",
        city: "",
        school: ""
    });

    useEffect(() => {
        API.get(`/teacher/${id}`).then((resp) => {
            setProfile(resp?.data);
        });
        API.get(`/courses?teacherId=${id}`).then((resp) => {
            setCourses(resp?.data || []);
            console.log(courses);
        });
    }, []);
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

            <div className="breadcrumb-row">
                <div className="container">
                    <ul className="list-inline">
                        <li>
                            <a href="#">Home</a>
                        </li>
                        <li>Profile</li>
                    </ul>
                </div>
            </div>

            <div className="content-block">
                <div className="section-area section-sp1">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3 col-md-4 col-sm-12 m-b30">
                                <div className="profile-bx text-center">
                                    <div className="user-profile-thumb">
                                        <img src="assets/images/profile/pic1.jpg" alt="" />
                                    </div>
                                    <div className="profile-info">
                                        <h4>
                                            {profile.firstName} {profile.lastName}
                                        </h4>
                                        <span>{profile.email}</span>
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
                                                <h3>My Courses</h3>
                                            </div>
                                            <div className="courses-filter">
                                                <div className="clearfix">
                                                    <ul id="masonry" className="ttr-gallery-listing magnific-image row">
                                                        {courses.map((course) => (
                                                            <li
                                                                key={course.id}
                                                                className="action-card col-xl-4 col-lg-6 col-md-12 col-sm-6 publish">
                                                                <div className="cours-bx">
                                                                    <div className="action-box">
                                                                        <img
                                                                            src="assets/images/courses/pic1.jpg"
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
                                                                        <span>Programming</span>
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
                                                                            <del>$190</del>
                                                                            <h5>${course.price}</h5>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>
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
                                                            <h3> 1.Personal Details</h3>
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-12 col-sm-3 col-md-3 col-lg-2 col-form-label">
                                                            First name
                                                        </label>
                                                        <div className="col-12 col-sm-9 col-md-9 col-lg-7">
                                                            {profile.firstName}
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-12 col-sm-3 col-md-3 col-lg-2 col-form-label">
                                                            Last name
                                                        </label>
                                                        <div className="col-12 col-sm-9 col-md-9 col-lg-7">
                                                            {profile.lastName}
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-12 col-sm-3 col-md-3 col-lg-2 col-form-label">
                                                            Email
                                                        </label>
                                                        <div className="col-12 col-sm-9 col-md-9 col-lg-7">
                                                            {profile.email}
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-12 col-sm-3 col-md-3 col-lg-2 col-form-label">
                                                            Phone No.
                                                        </label>
                                                        <div className="col-12 col-sm-9 col-md-9 col-lg-7">
                                                            {profile.phoneNo}
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-12 col-sm-3 col-md-3 col-lg-2 col-form-label">
                                                            Major
                                                        </label>
                                                        <div className="col-12 col-sm-9 col-md-9 col-lg-7">
                                                            {profile.major}
                                                        </div>
                                                    </div>
                                                    <div className="seperator"></div>
                                                </div>
                                                <div className="form-group row">
                                                    <div className="col-12 col-sm-9 col-md-9 col-lg-10 ml-auto">
                                                        <h3>2. Address</h3>
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-12 col-sm-3 col-md-3 col-lg-2 col-form-label">
                                                        Address
                                                    </label>
                                                    <div className="col-12 col-sm-9 col-md-9 col-lg-7">
                                                        {profile.address}
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-12 col-sm-3 col-md-3 col-lg-2 col-form-label">
                                                        City
                                                    </label>
                                                    <div className="col-12 col-sm-9 col-md-9 col-lg-7">
                                                        {profile.city}
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-12 col-sm-3 col-md-3 col-lg-2 col-form-label">
                                                        State
                                                    </label>
                                                    <div className="col-12 col-sm-9 col-md-9 col-lg-7"></div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-12 col-sm-3 col-md-3 col-lg-2 col-form-label">
                                                        School
                                                    </label>
                                                    <div className="col-12 col-sm-9 col-md-9 col-lg-7">
                                                        {profile.school}
                                                    </div>
                                                </div>

                                                <div className="m-form__seperator m-form__seperator--dashed m-form__seperator--space-2x"></div>
                                                <div className="form-group row">
                                                    <div className="col-12 col-sm-9 col-md-9 col-lg-10 ml-auto">
                                                        <h3>3. Description</h3>
                                                    </div>
                                                    <p></p>
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
