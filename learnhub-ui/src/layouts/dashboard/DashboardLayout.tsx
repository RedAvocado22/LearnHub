import { useState } from "react";
import NotificationList from "./NotificationList";

interface SidebarItem {
    label: string;
    icon: string;
    link?: string;
    submenu?: { label: string; link: string }[];
}

// NOTE: This is mock list, pass this as props later
const items: SidebarItem[] = [
    { label: "Dashboard", icon: "ti-home", link: "index.html" },
    { label: "Courses", icon: "ti-book", link: "courses.html" },
    {
        label: "Mailbox",
        icon: "ti-email",
        submenu: [
            { label: "Mail Box", link: "mailbox.html" },
            { label: "Compose", link: "mailbox-compose.html" },
            { label: "Mail Read", link: "mailbox-read.html" }
        ]
    },
    {
        label: "Calendar",
        icon: "ti-calendar",
        submenu: [
            { label: "Basic Calendar", link: "basic-calendar.html" },
            { label: "List View", link: "list-view-calendar.html" }
        ]
    },
    { label: "Bookmarks", icon: "ti-bookmark-alt", link: "bookmark.html" },
    { label: "Review", icon: "ti-comments", link: "review.html" },
    { label: "Add Listing", icon: "ti-layout-accordion-list", link: "add-listing.html" },
    {
        label: "My Profile",
        icon: "ti-user",
        submenu: [
            { label: "User Profile", link: "user-profile.html" },
            { label: "Teacher Profile", link: "teacher-profile.html" }
        ]
    }
];

export default function DashboardLayout() {
    const [displaySidebar, setDisplaySidebar] = useState(true);
    const [displayNotifList, setDisplayNotifList] = useState(false);
    const [displayProfile, setDisplayProfile] = useState(false);
    const [openSidebarItem, setOpenSidebarItem] = useState<number | null>(null);

    const handleToggleSidebarItem = (index: number) => {
        setOpenSidebarItem(openSidebarItem === index ? null : index);
    };
    return (
        <div className={`${displaySidebar ? "ttr-opened-sidebar " : ""}ttr-pinned-sidebar`}>
            <header className="ttr-header">
                <div className="ttr-header-wrapper">
                    <div
                        onClick={() => setDisplaySidebar(!displaySidebar)}
                        className="ttr-toggle-sidebar ttr-material-button">
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
                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        e.preventDefault();
                                        setDisplayNotifList(!displayNotifList);
                                    }}
                                    className="ttr-material-button ttr-submenu-toggle">
                                    <i className="fa fa-bell"></i>
                                </a>
                                <div
                                    className={`ttr-header-submenu noti-menu${displayNotifList ? " active" : ""}`}
                                    style={{ display: "block" }}>
                                    <NotificationList />
                                </div>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        e.preventDefault();
                                        setDisplayProfile(!displayProfile);
                                    }}
                                    className="ttr-material-button ttr-submenu-toggle">
                                    <span className="ttr-user-avatar">
                                        <img alt="" src="assets/images/testimonials/pic3.jpg" width="32" height="32" />
                                    </span>
                                </a>
                                <div
                                    className={`ttr-header-submenu${displayProfile ? " active" : ""}`}
                                    style={{ display: "block" }}>
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
                        <div onClick={() => setDisplaySidebar(false)} className="ttr-sidebar-toggle-button">
                            <i className="ti-arrow-left"></i>
                        </div>
                    </div>
                    <nav className="ttr-sidebar-navi">
                        <ul>
                            {items.map((item, index) =>
                                item.submenu ? (
                                    <li key={index} className={openSidebarItem === index ? "show" : ""}>
                                        <a
                                            href="#"
                                            className="ttr-material-button"
                                            onClick={() => handleToggleSidebarItem(index)}>
                                            <span className="ttr-icon">
                                                <i className={item.icon}></i>
                                            </span>
                                            <span className="ttr-label">{item.label}</span>
                                            <span className="ttr-arrow-icon">
                                                <i className="fa fa-angle-down"></i>
                                            </span>
                                        </a>
                                        <ul style={{ display: openSidebarItem === index ? "block" : "none" }}>
                                            {item.submenu.map((subItem, subIndex) => (
                                                <li key={subIndex}>
                                                    <a href={subItem.link} className="ttr-material-button">
                                                        <span className="ttr-label">{subItem.label}</span>
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                ) : (
                                    <li key={index}>
                                        <a href={item.link} className="ttr-material-button">
                                            <span className="ttr-icon">
                                                <i className={item.icon}></i>
                                            </span>
                                            <span className="ttr-label">{item.label}</span>
                                        </a>
                                    </li>
                                )
                            )}
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
