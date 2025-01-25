import logo from "/assets/images/logo.png";
import adv from "/assets/images/adv/adv.jpg";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Navbar() {
    const { account, logout } = useAuth();
    const [searchVisible, setSearchVisible] = useState(false);
    const navigate = useNavigate();
    const handleDisplaySearch = () => {
        setSearchVisible(true);
    };
    const handleCloseSearch = () => {
        setSearchVisible(false);
    };
    const handleLogout = async () => {
        try {
            logout();
            navigate("/");
        } catch (err) {
            toast.warning((err as Error).message);
        }
    };
    return (
        <div className="sticky-header navbar-expand-lg">
            <div className="menu-bar clearfix">
                <div className="container clearfix">
                    {/* Header Logo */}
                    <div className="menu-logo">
                        <a href="">
                            <img src={logo} alt="Logo" />
                        </a>
                    </div>
                    {/* Mobile Nav Button */}
                    <button
                        className="navbar-toggler collapsed menuicon justify-content-end"
                        type="button"
                        data-toggle="collapse"
                        data-target="#menuDropdown"
                        aria-controls="menuDropdown"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                    {/* Author Nav */}
                    <div className="secondary-menu">
                        <div className="secondary-inner">
                            <ul>
                                <li>
                                    <a href="#" className="btn-link">
                                        <i className="fa fa-facebook"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="btn-link">
                                        <i className="fa fa-google-plus"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="btn-link">
                                        <i className="fa fa-linkedin"></i>
                                    </a>
                                </li>
                                {/* Search Button */}
                                <li className="search-btn">
                                    <button
                                        id="quik-search-btn"
                                        onClick={handleDisplaySearch}
                                        type="button"
                                        className="btn-link">
                                        <i className="fa fa-search"></i>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {/* Search Box */}
                    {searchVisible && (
                        <div className="nav-search-bar On">
                            <form action="#">
                                <input
                                    name="search"
                                    type="text"
                                    className="form-control"
                                    placeholder="Type to search"
                                />
                                <span>
                                    <i className="ti-search"></i>
                                </span>
                            </form>
                            <span id="search-remove" onClick={handleCloseSearch}>
                                <i className="ti-close"></i>
                            </span>
                        </div>
                    )}
                    {/* Navigation Menu */}
                    <div className="menu-links navbar-collapse collapse justify-content-start" id="menuDropdown">
                        <div className="menu-logo">
                            <a href="">
                                <img src={logo} alt="Logo" />
                            </a>
                        </div>
                        <ul className="nav navbar-nav">
                            <li className="active">
                                <a href="#">
                                    Home <i className="fa fa-chevron-down"></i>
                                </a>
                                <ul className="sub-menu">
                                    <li>
                                        <a href="index.html">Home 1</a>
                                    </li>
                                    <li>
                                        <a href="index-2.html">Home 2</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="#">
                                    Pages <i className="fa fa-chevron-down"></i>
                                </a>
                                <ul className="sub-menu">
                                    <li>
                                        <a href="#">
                                            About<i className="fa fa-angle-right"></i>
                                        </a>
                                        <ul className="sub-menu">
                                            <li>
                                                <a href="about-1.html">About 1</a>
                                            </li>
                                            <li>
                                                <a href="about-2.html">About 2</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="#">
                                            Event<i className="fa fa-angle-right"></i>
                                        </a>
                                        <ul className="sub-menu">
                                            <li>
                                                <a href="event.html">Event</a>
                                            </li>
                                            <li>
                                                <a href="events-details.html">Events Details</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="#">
                                            FAQ's<i className="fa fa-angle-right"></i>
                                        </a>
                                        <ul className="sub-menu">
                                            <li>
                                                <a href="faq-1.html">FAQ's 1</a>
                                            </li>
                                            <li>
                                                <a href="faq-2.html">FAQ's 2</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="#">
                                            Contact Us<i className="fa fa-angle-right"></i>
                                        </a>
                                        <ul className="sub-menu">
                                            <li>
                                                <a href="contact-1.html">Contact Us 1</a>
                                            </li>
                                            <li>
                                                <a href="contact-2.html">Contact Us 2</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="portfolio.html">Portfolio</a>
                                    </li>
                                    <li>
                                        <a href="profile.html">Profile</a>
                                    </li>
                                    <li>
                                        <a href="membership.html">Membership</a>
                                    </li>
                                    <li>
                                        <a href="error-404.html">404 Page</a>
                                    </li>
                                </ul>
                            </li>
                            <li className="add-mega-menu">
                                <a href="#">
                                    Our Courses <i className="fa fa-chevron-down"></i>
                                </a>
                                <ul className="sub-menu add-menu">
                                    <li className="add-menu-left">
                                        <h5 className="menu-adv-title">Our Courses</h5>
                                        <ul>
                                            <li>
                                                <a href="courses.html">Courses </a>
                                            </li>
                                            <li>
                                                <a href="courses-details.html">Courses Details</a>
                                            </li>
                                            <li>
                                                <a href="profile.html">Instructor Profile</a>
                                            </li>
                                            <li>
                                                <a href="event.html">Upcoming Event</a>
                                            </li>
                                            <li>
                                                <a href="membership.html">Membership</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="add-menu-right">
                                        <img src={adv} />
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="#">
                                    Blog <i className="fa fa-chevron-down"></i>
                                </a>
                                <ul className="sub-menu">
                                    <li>
                                        <a href="blog-classic-grid.html">Blog Classic</a>
                                    </li>
                                    <li>
                                        <a href="blog-classic-sidebar.html">Blog Classic Sidebar</a>
                                    </li>
                                    <li>
                                        <a href="blog-list-sidebar.html">Blog List Sidebar</a>
                                    </li>
                                    <li>
                                        <a href="blog-standard-sidebar.html">Blog Standard Sidebar</a>
                                    </li>
                                    <li>
                                        <a href="blog-details.html">Blog Details</a>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-dashboard">
                                <a href="#">
                                    Dashboard <i className="fa fa-chevron-down"></i>
                                </a>
                                <ul className="sub-menu">
                                    <li>
                                        <a href="admin/index.html">Dashboard</a>
                                    </li>
                                    <li>
                                        <a href="admin/add-listing.html">Add Listing</a>
                                    </li>
                                    <li>
                                        <a href="admin/bookmark.html">Bookmark</a>
                                    </li>
                                    <li>
                                        <a href="admin/courses.html">Courses</a>
                                    </li>
                                    <li>
                                        <a href="admin/review.html">Review</a>
                                    </li>
                                    <li>
                                        <a href="admin/teacher-profile.html">Teacher Profile</a>
                                    </li>
                                    <li>
                                        <a href="admin/user-profile.html">User Profile</a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            Calendar<i className="fa fa-angle-right"></i>
                                        </a>
                                        <ul className="sub-menu">
                                            <li>
                                                <a href="admin/basic-calendar.html">Basic Calendar</a>
                                            </li>
                                            <li>
                                                <a href="admin/list-view-calendar.html">List View Calendar</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="#">
                                            Mailbox<i className="fa fa-angle-right"></i>
                                        </a>
                                        <ul className="sub-menu">
                                            <li>
                                                <a href="admin/mailbox.html">Mailbox</a>
                                            </li>
                                            <li>
                                                <a href="admin/mailbox-compose.html">Compose</a>
                                            </li>
                                            <li>
                                                <a href="admin/mailbox-read.html">Mail Read</a>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                            {account && (
                                <>
                                    <li>
                                        <a href="#">
                                            {account.firstname} {account.lastname}{" "}
                                            <i className="fa fa-chevron-down"></i>
                                        </a>
                                        <ul className="sub-menu">
                                            <li>
                                                <a href="#" onClick={handleLogout}>
                                                    Logout
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <Link to="/dummy">Dummy</Link>
                                    </li>
                                </>
                            )}
                        </ul>
                        <div className="nav-social-link">
                            <a href="#">
                                <i className="fa fa-facebook"></i>
                            </a>
                            <a href="#">
                                <i className="fa fa-google-plus"></i>
                            </a>
                            <a href="#">
                                <i className="fa fa-linkedin"></i>
                            </a>
                        </div>
                    </div>
                    {/* Navigation Menu END */}
                </div>
            </div>
        </div>
    );
}
