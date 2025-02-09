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

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [displaySidebar, setDisplaySidebar] = useState(false);
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
                        <i className="ti-menu ttr-open-icon"></i>
                        <i className="ti-close ttr-close-icon"></i>
                    </div>
                    <div className="ttr-logo-box">
                        <div>
                            <a href="/home" className="ttr-logo">
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
                                <a href="/home" className="ttr-material-button ttr-submenu-toggle">
                                    HOME
                                </a>
                            </li>
                            <li>
                                <a href="/courses" className="ttr-material-button ttr-submenu-toggle">
                                    COURSES
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
            {children}
            <div className="ttr-overlay"></div>
        </div>
    );
}
