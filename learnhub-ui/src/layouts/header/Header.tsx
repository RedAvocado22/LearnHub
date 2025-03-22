import logo from "/assets/images/logo.png";
import "./Header.css";
import Topbar from "./Topbar";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useUser } from "../../hooks/useUser";

export default function Header() {
    const { user } = useUser();
    const [searchVisible, setSearchVisible] = useState(false);
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    const handleDisplaySearch = () => {
        setSearchVisible(true);
    };
    const handleCloseSearch = () => {
        setSearchVisible(false);
    };
    return (
        <header className="header rs-nav">
            {!user && <Topbar />}
            <div className="sticky-header navbar-expand-lg">
                <div className="menu-bar clearfix">
                    <div className="container clearfix">
                        {/* Header Logo */}
                        <div className="menu-logo">
                            <a href="/">
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
                                        <button onClick={handleDisplaySearch} type="button" className="btn-link">
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
                                <span onClick={handleCloseSearch}>
                                    <i className="ti-close"></i>
                                </span>
                            </div>
                        )}
                        {/* Navigation Menu */}
                        <div className="menu-links navbar-collapse collapse justify-content-start" id="menuDropdown">
                            <div className="menu-logo">
                                <Link to="/">
                                    <img src={logo} alt="Logo" />
                                </Link>
                            </div>
                            <ul className="nav navbar-nav">
                                {user && (
                                    <li className={isActive("/home") ? "active" : ""}>
                                        <Link to="/home">Home</Link>
                                    </li>
                                )}
                                <li className={isActive("/courses") ? "active" : ""}>
                                    <Link to="/courses">Courses</Link>
                                </li>
                                <li className={isActive("/about") ? "active" : ""}>
                                    <Link to="/about">About</Link>
                                </li>
                                <li className={isActive("/about") ? "active" : ""}>
                                    <Link to="/faq">FAQ</Link>
                                </li>
                                <li className={isActive("/contact") ? "active" : ""}>
                                    <Link to="/contact">Contact Us</Link>
                                </li>
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
        </header>
    );
}
