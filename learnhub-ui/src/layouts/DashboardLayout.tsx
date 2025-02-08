export default function DashboardLayout() {
    return (
        <div className="ttr-opened-sidebar ttr-pinned-sidebar">
            <header className="ttr-header">
                <div className="ttr-header-wrapper">
                    <div className="ttr-toggle-sidebar ttr-material-button">
                        <i className="ti-close ttr-open-icon"></i>
                        <i className="ti-menu ttr-close-icon"></i>
                    </div>
                    <div className="ttr-logo-box">
                        <div>
                            <a href="/" className="ttr-logo">
                                <img
                                    alt=""
                                    className="ttr-logo-mobile"
                                    src="assets/images/logo-mobile.png"
                                    width="30"
                                    height="30"
                                />
                                <img
                                    alt=""
                                    className="ttr-logo-desktop"
                                    src="assets/images/logo-white.png"
                                    width="160"
                                    height="27"
                                />
                            </a>
                        </div>
                    </div>
                    <div className="ttr-header-menu">
                        <ul className="ttr-header-navigation">
                            <li>
                                <a href="/" className="ttr-material-button ttr-submenu-toggle">
                                    HOME
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="ttr-header-right ttr-with-seperator">
                        <ul className="ttr-header-navigation">
                            <li>
                                <a href="#" className="ttr-material-button ttr-submenu-toggle">
                                    <i className="fa fa-bell"></i>
                                </a>
                                <div className="ttr-header-submenu noti-menu">
                                    <div className="ttr-notify-header">
                                        <span className="ttr-notify-text-top">9 New</span>
                                        <span className="ttr-notify-text">User Notifications</span>
                                    </div>
                                    <div className="noti-box-list">
                                        <ul>
                                            <li>
                                                <span className="notification-icon dashbg-gray">
                                                    <i className="fa fa-check"></i>
                                                </span>
                                                <span className="notification-text">
                                                    <span>Sneha Jogi</span> sent you a message.
                                                </span>
                                                <span className="notification-time">
                                                    <a href="#" className="fa fa-close"></a>
                                                    <span> 02:14</span>
                                                </span>
                                            </li>
                                            <li>
                                                <span className="notification-icon dashbg-yellow">
                                                    <i className="fa fa-shopping-cart"></i>
                                                </span>
                                                <span className="notification-text">
                                                    <a href="#">Your order is placed</a> sent you a message.
                                                </span>
                                                <span className="notification-time">
                                                    <a href="#" className="fa fa-close"></a>
                                                    <span> 7 Min</span>
                                                </span>
                                            </li>
                                            <li>
                                                <span className="notification-icon dashbg-red">
                                                    <i className="fa fa-bullhorn"></i>
                                                </span>
                                                <span className="notification-text">
                                                    <span>Your item is shipped</span> sent you a message.
                                                </span>
                                                <span className="notification-time">
                                                    <a href="#" className="fa fa-close"></a>
                                                    <span> 2 May</span>
                                                </span>
                                            </li>
                                            <li>
                                                <span className="notification-icon dashbg-green">
                                                    <i className="fa fa-comments-o"></i>
                                                </span>
                                                <span className="notification-text">
                                                    <a href="#">Sneha Jogi</a> sent you a message.
                                                </span>
                                                <span className="notification-time">
                                                    <a href="#" className="fa fa-close"></a>
                                                    <span> 14 July</span>
                                                </span>
                                            </li>
                                            <li>
                                                <span className="notification-icon dashbg-primary">
                                                    <i className="fa fa-file-word-o"></i>
                                                </span>
                                                <span className="notification-text">
                                                    <span>Sneha Jogi</span> sent you a message.
                                                </span>
                                                <span className="notification-time">
                                                    <a href="#" className="fa fa-close"></a>
                                                    <span> 15 Min</span>
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <a href="#" className="ttr-material-button ttr-submenu-toggle">
                                    <span className="ttr-user-avatar">
                                        <img alt="" src="assets/images/testimonials/pic3.jpg" width="32" height="32" />
                                    </span>
                                </a>
                                <div className="ttr-header-submenu">
                                    <ul>
                                        <li>
                                            <a href="user-profile.html">My profile</a>
                                        </li>
                                        <li>
                                            <a href="list-view-calendar.html">Activity</a>
                                        </li>
                                        <li>
                                            <a href="mailbox.html">Messages</a>
                                        </li>
                                        <li>
                                            <a href="../login.html">Logout</a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>
            <div className="ttr-sidebar">
                <div className="ttr-sidebar-wrapper content-scroll">
                    <div className="ttr-sidebar-logo">
                        <a href="#">
                            <img alt="" src="assets/images/logo.png" width="122" height="27" />
                        </a>
                        <div className="ttr-sidebar-toggle-button">
                            <i className="ti-arrow-left"></i>
                        </div>
                    </div>
                    <nav className="ttr-sidebar-navi">
                        <ul>
                            <li>
                                <a href="index.html" className="ttr-material-button">
                                    <span className="ttr-icon">
                                        <i className="ti-home"></i>
                                    </span>
                                    <span className="ttr-label">Dashborad</span>
                                </a>
                            </li>
                            <li>
                                <a href="courses.html" className="ttr-material-button">
                                    <span className="ttr-icon">
                                        <i className="ti-book"></i>
                                    </span>
                                    <span className="ttr-label">Courses</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="ttr-material-button">
                                    <span className="ttr-icon">
                                        <i className="ti-email"></i>
                                    </span>
                                    <span className="ttr-label">Mailbox</span>
                                    <span className="ttr-arrow-icon">
                                        <i className="fa fa-angle-down"></i>
                                    </span>
                                </a>
                                <ul>
                                    <li>
                                        <a href="mailbox.html" className="ttr-material-button">
                                            <span className="ttr-label">Mail Box</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="mailbox-compose.html" className="ttr-material-button">
                                            <span className="ttr-label">Compose</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="mailbox-read.html" className="ttr-material-button">
                                            <span className="ttr-label">Mail Read</span>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="#" className="ttr-material-button">
                                    <span className="ttr-icon">
                                        <i className="ti-calendar"></i>
                                    </span>
                                    <span className="ttr-label">Calendar</span>
                                    <span className="ttr-arrow-icon">
                                        <i className="fa fa-angle-down"></i>
                                    </span>
                                </a>
                                <ul>
                                    <li>
                                        <a href="basic-calendar.html" className="ttr-material-button">
                                            <span className="ttr-label">Basic Calendar</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="list-view-calendar.html" className="ttr-material-button">
                                            <span className="ttr-label">List View</span>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="bookmark.html" className="ttr-material-button">
                                    <span className="ttr-icon">
                                        <i className="ti-bookmark-alt"></i>
                                    </span>
                                    <span className="ttr-label">Bookmarks</span>
                                </a>
                            </li>
                            <li>
                                <a href="review.html" className="ttr-material-button">
                                    <span className="ttr-icon">
                                        <i className="ti-comments"></i>
                                    </span>
                                    <span className="ttr-label">Review</span>
                                </a>
                            </li>
                            <li>
                                <a href="add-listing.html" className="ttr-material-button">
                                    <span className="ttr-icon">
                                        <i className="ti-layout-accordion-list"></i>
                                    </span>
                                    <span className="ttr-label">Add listing</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="ttr-material-button">
                                    <span className="ttr-icon">
                                        <i className="ti-user"></i>
                                    </span>
                                    <span className="ttr-label">My Profile</span>
                                    <span className="ttr-arrow-icon">
                                        <i className="fa fa-angle-down"></i>
                                    </span>
                                </a>
                                <ul>
                                    <li>
                                        <a href="user-profile.html" className="ttr-material-button">
                                            <span className="ttr-label">User Profile</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="teacher-profile.html" className="ttr-material-button">
                                            <span className="ttr-label">Teacher Profile</span>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li className="ttr-seperate"></li>
                        </ul>
                    </nav>
                </div>
            </div>
            <main className="ttr-wrapper">
                <div className="container-fluid">
                    <div className="db-breadcrumb">
                        <h4 className="breadcrumb-title">Mailbox</h4>
                        <ul className="db-breadcrumb-list">
                            <li>
                                <a href="#">
                                    <i className="fa fa-home"></i>Home
                                </a>
                            </li>
                            <li>Mailbox</li>
                        </ul>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 m-b30">
                            <div className="widget-box">
                                <div className="email-wrapper">
                                    <div className="email-menu-bar">
                                        <div className="compose-mail">
                                            <a href="mailbox-compose.html" className="btn btn-block">
                                                Compose
                                            </a>
                                        </div>
                                        <div className="email-menu-bar-inner">
                                            <ul>
                                                <li className="active">
                                                    <a href="mailbox.html">
                                                        <i className="fa fa-envelope-o"></i>Inbox{" "}
                                                        <span className="badge badge-success">8</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="mailbox.html">
                                                        <i className="fa fa-send-o"></i>Sent
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="mailbox.html">
                                                        <i className="fa fa-file-text-o"></i>Drafts{" "}
                                                        <span className="badge badge-warning">8</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="mailbox.html">
                                                        <i className="fa fa-cloud-upload"></i>Outbox{" "}
                                                        <span className="badge badge-danger">8</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="mailbox.html">
                                                        <i className="fa fa-trash-o"></i>Trash
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="mail-list-container">
                                        <div className="mail-toolbar">
                                            <div className="check-all">
                                                <div className="custom-control custom-checkbox checkbox-st1">
                                                    <input
                                                        type="checkbox"
                                                        className="custom-control-input"
                                                        id="check1"
                                                    />
                                                    <label className="custom-control-label" htmlFor="check1"></label>
                                                </div>
                                            </div>
                                            <div className="mail-search-bar">
                                                <input type="text" className="form-control" placeholder="Search" />
                                            </div>
                                            <div className="dropdown all-msg-toolbar">
                                                <span className="btn btn-info-icon" data-toggle="dropdown">
                                                    <i className="fa fa-ellipsis-v"></i>
                                                </span>
                                                <ul className="dropdown-menu">
                                                    <li>
                                                        <a href="#">
                                                            <i className="fa fa-trash-o"></i> Delete
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            <i className="fa fa-arrow-down"></i> Archive
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            <i className="fa fa-clock-o"></i> Snooze
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            <i className="fa fa-envelope-open"></i> Mark as unread
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="next-prev-btn">
                                                <a href="#">
                                                    <i className="fa fa-angle-left"></i>
                                                </a>{" "}
                                                <a href="#">
                                                    <i className="fa fa-angle-right"></i>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="mail-box-list">
                                            <div className="mail-list-info">
                                                <div className="checkbox-list">
                                                    <div className="custom-control custom-checkbox checkbox-st1">
                                                        <input
                                                            type="checkbox"
                                                            className="custom-control-input"
                                                            id="check2"
                                                        />
                                                        <label
                                                            className="custom-control-label"
                                                            htmlFor="check2"></label>
                                                    </div>
                                                </div>
                                                <div className="mail-rateing">
                                                    <span>
                                                        <i className="fa fa-star-o"></i>
                                                    </span>
                                                </div>
                                                <div className="mail-list-title">
                                                    <h6>David Moore</h6>
                                                </div>
                                                <div className="mail-list-title-info">
                                                    <p>Change the password for your Micr</p>
                                                </div>
                                                <div className="mail-list-time">
                                                    <span>10:59 AM</span>
                                                </div>
                                                <ul className="mailbox-toolbar">
                                                    <li data-toggle="tooltip" title="Delete">
                                                        <i className="fa fa-trash-o"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Archive">
                                                        <i className="fa fa-arrow-down"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Snooze">
                                                        <i className="fa fa-clock-o"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Mark as unread">
                                                        <i className="fa fa-envelope-open"></i>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="mail-list-info">
                                                <div className="checkbox-list">
                                                    <div className="custom-control custom-checkbox checkbox-st1">
                                                        <input
                                                            type="checkbox"
                                                            className="custom-control-input"
                                                            id="check3"
                                                        />
                                                        <label
                                                            className="custom-control-label"
                                                            htmlFor="check3"></label>
                                                    </div>
                                                </div>
                                                <div className="mail-rateing">
                                                    <span>
                                                        <i className="fa fa-star-o"></i>
                                                    </span>
                                                </div>
                                                <div className="mail-list-title">
                                                    <h6>David Moore</h6>
                                                </div>
                                                <div className="mail-list-title-info">
                                                    <p>Change the password for your Micr</p>
                                                </div>
                                                <div className="mail-list-time">
                                                    <span>10:59 AM</span>
                                                </div>
                                                <ul className="mailbox-toolbar">
                                                    <li data-toggle="tooltip" title="Delete">
                                                        <i className="fa fa-trash-o"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Archive">
                                                        <i className="fa fa-arrow-down"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Snooze">
                                                        <i className="fa fa-clock-o"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Mark as unread">
                                                        <i className="fa fa-envelope-open"></i>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="mail-list-info">
                                                <div className="checkbox-list">
                                                    <div className="custom-control custom-checkbox checkbox-st1">
                                                        <input
                                                            type="checkbox"
                                                            className="custom-control-input"
                                                            id="check4"
                                                        />
                                                        <label
                                                            className="custom-control-label"
                                                            htmlFor="check4"></label>
                                                    </div>
                                                </div>
                                                <div className="mail-rateing">
                                                    <span>
                                                        <i className="fa fa-star-o"></i>
                                                    </span>
                                                </div>
                                                <div className="mail-list-title">
                                                    <h6>David Moore</h6>
                                                </div>
                                                <div className="mail-list-title-info">
                                                    <p>Change the password for your Micr</p>
                                                </div>
                                                <div className="mail-list-time">
                                                    <span>10:59 AM</span>
                                                </div>
                                                <ul className="mailbox-toolbar">
                                                    <li data-toggle="tooltip" title="Delete">
                                                        <i className="fa fa-trash-o"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Archive">
                                                        <i className="fa fa-arrow-down"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Snooze">
                                                        <i className="fa fa-clock-o"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Mark as unread">
                                                        <i className="fa fa-envelope-open"></i>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="mail-list-info">
                                                <div className="checkbox-list">
                                                    <div className="custom-control custom-checkbox checkbox-st1">
                                                        <input
                                                            type="checkbox"
                                                            className="custom-control-input"
                                                            id="check5"
                                                        />
                                                        <label
                                                            className="custom-control-label"
                                                            htmlFor="check5"></label>
                                                    </div>
                                                </div>
                                                <div className="mail-rateing">
                                                    <span>
                                                        <i className="fa fa-star-o"></i>
                                                    </span>
                                                </div>
                                                <div className="mail-list-title">
                                                    <h6>David Moore</h6>
                                                </div>
                                                <div className="mail-list-title-info">
                                                    <p>Change the password for your Micr</p>
                                                </div>
                                                <div className="mail-list-time">
                                                    <span>10:59 AM</span>
                                                </div>
                                                <ul className="mailbox-toolbar">
                                                    <li data-toggle="tooltip" title="Delete">
                                                        <i className="fa fa-trash-o"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Archive">
                                                        <i className="fa fa-arrow-down"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Snooze">
                                                        <i className="fa fa-clock-o"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Mark as unread">
                                                        <i className="fa fa-envelope-open"></i>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="mail-list-info">
                                                <div className="checkbox-list">
                                                    <div className="custom-control custom-checkbox checkbox-st1">
                                                        <input
                                                            type="checkbox"
                                                            className="custom-control-input"
                                                            id="check6"
                                                        />
                                                        <label
                                                            className="custom-control-label"
                                                            htmlFor="check6"></label>
                                                    </div>
                                                </div>
                                                <div className="mail-rateing">
                                                    <span>
                                                        <i className="fa fa-star-o"></i>
                                                    </span>
                                                </div>
                                                <div className="mail-list-title">
                                                    <h6>David Moore</h6>
                                                </div>
                                                <div className="mail-list-title-info">
                                                    <p>Change the password for your Micr</p>
                                                </div>
                                                <div className="mail-list-time">
                                                    <span>10:59 AM</span>
                                                </div>
                                                <ul className="mailbox-toolbar">
                                                    <li data-toggle="tooltip" title="Delete">
                                                        <i className="fa fa-trash-o"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Archive">
                                                        <i className="fa fa-arrow-down"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Snooze">
                                                        <i className="fa fa-clock-o"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Mark as unread">
                                                        <i className="fa fa-envelope-open"></i>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="mail-list-info">
                                                <div className="checkbox-list">
                                                    <div className="custom-control custom-checkbox checkbox-st1">
                                                        <input
                                                            type="checkbox"
                                                            className="custom-control-input"
                                                            id="check7"
                                                        />
                                                        <label
                                                            className="custom-control-label"
                                                            htmlFor="check7"></label>
                                                    </div>
                                                </div>
                                                <div className="mail-rateing">
                                                    <span>
                                                        <i className="fa fa-star-o"></i>
                                                    </span>
                                                </div>
                                                <div className="mail-list-title">
                                                    <h6>David Moore</h6>
                                                </div>
                                                <div className="mail-list-title-info">
                                                    <p>Change the password for your Micr</p>
                                                </div>
                                                <div className="mail-list-time">
                                                    <span>10:59 AM</span>
                                                </div>
                                                <ul className="mailbox-toolbar">
                                                    <li data-toggle="tooltip" title="Delete">
                                                        <i className="fa fa-trash-o"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Archive">
                                                        <i className="fa fa-arrow-down"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Snooze">
                                                        <i className="fa fa-clock-o"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Mark as unread">
                                                        <i className="fa fa-envelope-open"></i>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="mail-list-info">
                                                <div className="checkbox-list">
                                                    <div className="custom-control custom-checkbox checkbox-st1">
                                                        <input
                                                            type="checkbox"
                                                            className="custom-control-input"
                                                            id="check8"
                                                        />
                                                        <label
                                                            className="custom-control-label"
                                                            htmlFor="check8"></label>
                                                    </div>
                                                </div>
                                                <div className="mail-rateing">
                                                    <span>
                                                        <i className="fa fa-star-o"></i>
                                                    </span>
                                                </div>
                                                <div className="mail-list-title">
                                                    <h6>David Moore</h6>
                                                </div>
                                                <div className="mail-list-title-info">
                                                    <p>Change the password for your Micr</p>
                                                </div>
                                                <div className="mail-list-time">
                                                    <span>10:59 AM</span>
                                                </div>
                                                <ul className="mailbox-toolbar">
                                                    <li data-toggle="tooltip" title="Delete">
                                                        <i className="fa fa-trash-o"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Archive">
                                                        <i className="fa fa-arrow-down"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Snooze">
                                                        <i className="fa fa-clock-o"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Mark as unread">
                                                        <i className="fa fa-envelope-open"></i>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="mail-list-info">
                                                <div className="checkbox-list">
                                                    <div className="custom-control custom-checkbox checkbox-st1">
                                                        <input
                                                            type="checkbox"
                                                            className="custom-control-input"
                                                            id="check9"
                                                        />
                                                        <label
                                                            className="custom-control-label"
                                                            htmlFor="check9"></label>
                                                    </div>
                                                </div>
                                                <div className="mail-rateing">
                                                    <span>
                                                        <i className="fa fa-star-o"></i>
                                                    </span>
                                                </div>
                                                <div className="mail-list-title">
                                                    <h6>David Moore</h6>
                                                </div>
                                                <div className="mail-list-title-info">
                                                    <p>Change the password for your Micr</p>
                                                </div>
                                                <div className="mail-list-time">
                                                    <span>10:59 AM</span>
                                                </div>
                                                <ul className="mailbox-toolbar">
                                                    <li data-toggle="tooltip" title="Delete">
                                                        <i className="fa fa-trash-o"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Archive">
                                                        <i className="fa fa-arrow-down"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Snooze">
                                                        <i className="fa fa-clock-o"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Mark as unread">
                                                        <i className="fa fa-envelope-open"></i>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="mail-list-info">
                                                <div className="checkbox-list">
                                                    <div className="custom-control custom-checkbox checkbox-st1">
                                                        <input
                                                            type="checkbox"
                                                            className="custom-control-input"
                                                            id="check10"
                                                        />
                                                        <label
                                                            className="custom-control-label"
                                                            htmlFor="check10"></label>
                                                    </div>
                                                </div>
                                                <div className="mail-rateing">
                                                    <span>
                                                        <i className="fa fa-star-o"></i>
                                                    </span>
                                                </div>
                                                <div className="mail-list-title">
                                                    <h6>David Moore</h6>
                                                </div>
                                                <div className="mail-list-title-info">
                                                    <p>Change the password for your Micr</p>
                                                </div>
                                                <div className="mail-list-time">
                                                    <span>10:59 AM</span>
                                                </div>
                                                <ul className="mailbox-toolbar">
                                                    <li data-toggle="tooltip" title="Delete">
                                                        <i className="fa fa-trash-o"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Archive">
                                                        <i className="fa fa-arrow-down"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Snooze">
                                                        <i className="fa fa-clock-o"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Mark as unread">
                                                        <i className="fa fa-envelope-open"></i>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="mail-list-info">
                                                <div className="checkbox-list">
                                                    <div className="custom-control custom-checkbox checkbox-st1">
                                                        <input
                                                            type="checkbox"
                                                            className="custom-control-input"
                                                            id="check11"
                                                        />
                                                        <label
                                                            className="custom-control-label"
                                                            htmlFor="check11"></label>
                                                    </div>
                                                </div>
                                                <div className="mail-rateing">
                                                    <span>
                                                        <i className="fa fa-star-o"></i>
                                                    </span>
                                                </div>
                                                <div className="mail-list-title">
                                                    <h6>David Moore</h6>
                                                </div>
                                                <div className="mail-list-title-info">
                                                    <p>Change the password for your Micr</p>
                                                </div>
                                                <div className="mail-list-time">
                                                    <span>10:59 AM</span>
                                                </div>
                                                <ul className="mailbox-toolbar">
                                                    <li data-toggle="tooltip" title="Delete">
                                                        <i className="fa fa-trash-o"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Archive">
                                                        <i className="fa fa-arrow-down"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Snooze">
                                                        <i className="fa fa-clock-o"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Mark as unread">
                                                        <i className="fa fa-envelope-open"></i>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="mail-list-info">
                                                <div className="checkbox-list">
                                                    <div className="custom-control custom-checkbox checkbox-st1">
                                                        <input
                                                            type="checkbox"
                                                            className="custom-control-input"
                                                            id="check12"
                                                        />
                                                        <label
                                                            className="custom-control-label"
                                                            htmlFor="check12"></label>
                                                    </div>
                                                </div>
                                                <div className="mail-rateing">
                                                    <span>
                                                        <i className="fa fa-star-o"></i>
                                                    </span>
                                                </div>
                                                <div className="mail-list-title">
                                                    <h6>David Moore</h6>
                                                </div>
                                                <div className="mail-list-title-info">
                                                    <p>Change the password for your Micr</p>
                                                </div>
                                                <div className="mail-list-time">
                                                    <span>10:59 AM</span>
                                                </div>
                                                <ul className="mailbox-toolbar">
                                                    <li data-toggle="tooltip" title="Delete">
                                                        <i className="fa fa-trash-o"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Archive">
                                                        <i className="fa fa-arrow-down"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Snooze">
                                                        <i className="fa fa-clock-o"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Mark as unread">
                                                        <i className="fa fa-envelope-open"></i>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="mail-list-info">
                                                <div className="checkbox-list">
                                                    <div className="custom-control custom-checkbox checkbox-st1">
                                                        <input
                                                            type="checkbox"
                                                            className="custom-control-input"
                                                            id="check13"
                                                        />
                                                        <label
                                                            className="custom-control-label"
                                                            htmlFor="check13"></label>
                                                    </div>
                                                </div>
                                                <div className="mail-rateing">
                                                    <span>
                                                        <i className="fa fa-star-o"></i>
                                                    </span>
                                                </div>
                                                <div className="mail-list-title">
                                                    <h6>David Moore</h6>
                                                </div>
                                                <div className="mail-list-title-info">
                                                    <p>Change the password for your Micr</p>
                                                </div>
                                                <div className="mail-list-time">
                                                    <span>10:59 AM</span>
                                                </div>
                                                <ul className="mailbox-toolbar">
                                                    <li data-toggle="tooltip" title="Delete">
                                                        <i className="fa fa-trash-o"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Archive">
                                                        <i className="fa fa-arrow-down"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Snooze">
                                                        <i className="fa fa-clock-o"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Mark as unread">
                                                        <i className="fa fa-envelope-open"></i>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="mail-list-info">
                                                <div className="checkbox-list">
                                                    <div className="custom-control custom-checkbox checkbox-st1">
                                                        <input
                                                            type="checkbox"
                                                            className="custom-control-input"
                                                            id="check14"
                                                        />
                                                        <label
                                                            className="custom-control-label"
                                                            htmlFor="check14"></label>
                                                    </div>
                                                </div>
                                                <div className="mail-rateing">
                                                    <span>
                                                        <i className="fa fa-star-o"></i>
                                                    </span>
                                                </div>
                                                <div className="mail-list-title">
                                                    <h6>David Moore</h6>
                                                </div>
                                                <div className="mail-list-title-info">
                                                    <p>Change the password for your Micr</p>
                                                </div>
                                                <div className="mail-list-time">
                                                    <span>10:59 AM</span>
                                                </div>
                                                <ul className="mailbox-toolbar">
                                                    <li data-toggle="tooltip" title="Delete">
                                                        <i className="fa fa-trash-o"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Archive">
                                                        <i className="fa fa-arrow-down"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Snooze">
                                                        <i className="fa fa-clock-o"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Mark as unread">
                                                        <i className="fa fa-envelope-open"></i>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="mail-list-info">
                                                <div className="checkbox-list">
                                                    <div className="custom-control custom-checkbox checkbox-st1">
                                                        <input
                                                            type="checkbox"
                                                            className="custom-control-input"
                                                            id="check15"
                                                        />
                                                        <label
                                                            className="custom-control-label"
                                                            htmlFor="check15"></label>
                                                    </div>
                                                </div>
                                                <div className="mail-rateing">
                                                    <span>
                                                        <i className="fa fa-star-o"></i>
                                                    </span>
                                                </div>
                                                <div className="mail-list-title">
                                                    <h6>David Moore</h6>
                                                </div>
                                                <div className="mail-list-title-info">
                                                    <p>Change the password for your Micr</p>
                                                </div>
                                                <div className="mail-list-time">
                                                    <span>10:59 AM</span>
                                                </div>
                                                <ul className="mailbox-toolbar">
                                                    <li data-toggle="tooltip" title="Delete">
                                                        <i className="fa fa-trash-o"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Archive">
                                                        <i className="fa fa-arrow-down"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Snooze">
                                                        <i className="fa fa-clock-o"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Mark as unread">
                                                        <i className="fa fa-envelope-open"></i>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="mail-list-info">
                                                <div className="checkbox-list">
                                                    <div className="custom-control custom-checkbox checkbox-st1">
                                                        <input
                                                            type="checkbox"
                                                            className="custom-control-input"
                                                            id="check16"
                                                        />
                                                        <label
                                                            className="custom-control-label"
                                                            htmlFor="check16"></label>
                                                    </div>
                                                </div>
                                                <div className="mail-rateing">
                                                    <span>
                                                        <i className="fa fa-star-o"></i>
                                                    </span>
                                                </div>
                                                <div className="mail-list-title">
                                                    <h6>David Moore</h6>
                                                </div>
                                                <div className="mail-list-title-info">
                                                    <p>Change the password for your Micr</p>
                                                </div>
                                                <div className="mail-list-time">
                                                    <span>10:59 AM</span>
                                                </div>
                                                <ul className="mailbox-toolbar">
                                                    <li data-toggle="tooltip" title="Delete">
                                                        <i className="fa fa-trash-o"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Archive">
                                                        <i className="fa fa-arrow-down"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Snooze">
                                                        <i className="fa fa-clock-o"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Mark as unread">
                                                        <i className="fa fa-envelope-open"></i>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="mail-list-info">
                                                <div className="checkbox-list">
                                                    <div className="custom-control custom-checkbox checkbox-st1">
                                                        <input
                                                            type="checkbox"
                                                            className="custom-control-input"
                                                            id="check17"
                                                        />
                                                        <label
                                                            className="custom-control-label"
                                                            htmlFor="check17"></label>
                                                    </div>
                                                </div>
                                                <div className="mail-rateing">
                                                    <span>
                                                        <i className="fa fa-star-o"></i>
                                                    </span>
                                                </div>
                                                <div className="mail-list-title">
                                                    <h6>David Moore</h6>
                                                </div>
                                                <div className="mail-list-title-info">
                                                    <p>Change the password for your Micr</p>
                                                </div>
                                                <div className="mail-list-time">
                                                    <span>10:59 AM</span>
                                                </div>
                                                <ul className="mailbox-toolbar">
                                                    <li data-toggle="tooltip" title="Delete">
                                                        <i className="fa fa-trash-o"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Archive">
                                                        <i className="fa fa-arrow-down"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Snooze">
                                                        <i className="fa fa-clock-o"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Mark as unread">
                                                        <i className="fa fa-envelope-open"></i>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="mail-list-info">
                                                <div className="checkbox-list">
                                                    <div className="custom-control custom-checkbox checkbox-st1">
                                                        <input
                                                            type="checkbox"
                                                            className="custom-control-input"
                                                            id="check18"
                                                        />
                                                        <label
                                                            className="custom-control-label"
                                                            htmlFor="check18"></label>
                                                    </div>
                                                </div>
                                                <div className="mail-rateing">
                                                    <span>
                                                        <i className="fa fa-star-o"></i>
                                                    </span>
                                                </div>
                                                <div className="mail-list-title">
                                                    <h6>David Moore</h6>
                                                </div>
                                                <div className="mail-list-title-info">
                                                    <p>Change the password for your Micr</p>
                                                </div>
                                                <div className="mail-list-time">
                                                    <span>10:59 AM</span>
                                                </div>
                                                <ul className="mailbox-toolbar">
                                                    <li data-toggle="tooltip" title="Delete">
                                                        <i className="fa fa-trash-o"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Archive">
                                                        <i className="fa fa-arrow-down"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Snooze">
                                                        <i className="fa fa-clock-o"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Mark as unread">
                                                        <i className="fa fa-envelope-open"></i>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="mail-list-info">
                                                <div className="checkbox-list">
                                                    <div className="custom-control custom-checkbox checkbox-st1">
                                                        <input
                                                            type="checkbox"
                                                            className="custom-control-input"
                                                            id="check19"
                                                        />
                                                        <label
                                                            className="custom-control-label"
                                                            htmlFor="check19"></label>
                                                    </div>
                                                </div>
                                                <div className="mail-rateing">
                                                    <span>
                                                        <i className="fa fa-star-o"></i>
                                                    </span>
                                                </div>
                                                <div className="mail-list-title">
                                                    <h6>David Moore</h6>
                                                </div>
                                                <div className="mail-list-title-info">
                                                    <p>Change the password for your Micr</p>
                                                </div>
                                                <div className="mail-list-time">
                                                    <span>10:59 AM</span>
                                                </div>
                                                <ul className="mailbox-toolbar">
                                                    <li data-toggle="tooltip" title="Delete">
                                                        <i className="fa fa-trash-o"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Archive">
                                                        <i className="fa fa-arrow-down"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Snooze">
                                                        <i className="fa fa-clock-o"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Mark as unread">
                                                        <i className="fa fa-envelope-open"></i>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <div className="ttr-overlay"></div>
        </div>
    );
}
