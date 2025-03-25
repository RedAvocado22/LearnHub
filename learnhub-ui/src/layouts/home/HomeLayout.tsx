import { useState } from "react";
import NotificationList from "./NotificationList";
import { useUser } from "../../hooks/useUser";
import { Link } from "react-router-dom";
import { UserRole } from "../../types/User";

interface SidebarItem {
    label: string;
    icon: string;
    link?: string;
    submenu?: { label: string; link: string }[];
}

interface HeaderItem {
    label: string;
    icon: string;
    link?: string;
}
interface HomeLayoutProps {
    children: React.ReactNode;
}

const userMenus: Record<UserRole, SidebarItem[]> = {
    ADMIN: [
        { label: "Dashboard", icon: "ti-home", link: "/home" },
        { label: "Mailbox", icon: "ti-email", link: "/admin/contacts" },
        { label: "Manage Users", icon: "ti-user", link: "/admin/users" },
        { label: "Manage Course", icon: "ti-user", link: "/admin/courses" }
    ],
    COURSE_MANAGER: [
        { label: "Dashboard", icon: "ti-home", link: "/home" },
        { label: "Manage Courses", icon: "ti-book", link: "/manager/courses" }
    ],
    STUDENT: [
        { label: "Home", icon: "ti-home", link: "/home" },
        {
            label: "My Courses",
            icon: "ti-book",
            submenu: [
                { label: "In Progress", link: "/home/courses?status=progress" },
                { label: "Finished", link: "/home/courses?status=finished" }
            ]
        }
    ],
    TEACHER: [
        { label: "Dashboard", icon: "ti-home", link: "/home" },
        {
            label: "My Courses",
            icon: "ti-book",
            submenu: [
                { label: "All", link: "/home/courses" },
                { label: "Public", link: "/home/courses?status=public" },
                { label: "Private", link: "/home/courses?status=private" },
                { label: "Pending", link: "/home/courses?status=pending" },
                { label: "Canceled", link: "/home/courses?status=cancelled" }
            ]
        }
    ]
};

const userHeader: Record<UserRole, HeaderItem[]> = {
    STUDENT: [
        { label: "Home", icon: "ti-home", link: "/home" },
        { label: "My Courses", icon: "ti-book", link: "/courses" }
    ],
    TEACHER: [
        { label: "Dashboard", icon: "ti-home", link: "/home" },
        { label: "Courses", icon: "ti-book", link: "/home/courses" },
        { label: "Create Course", icon: "ti-book", link: "/home/courses/create" }
    ],
    COURSE_MANAGER: [],
    ADMIN: []
};

export default function HomeLayout({ children }: HomeLayoutProps) {
    const [displaySidebar, setDisplaySidebar] = useState(false);
    const [displayNotifList, setDisplayNotifList] = useState(false);
    const [displayProfile, setDisplayProfile] = useState(false);
    const [openSidebarItem, setOpenSidebarItem] = useState<number | null>(null);
    const { user, logout } = useUser();

    const menu: SidebarItem[] = userMenus[user?.role as UserRole] ?? [];
    const header: HeaderItem[] = userHeader[user?.role as UserRole] ?? [];

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
                            <a href="/" className="ttr-logo">
                                <img
                                    alt=""
                                    className="ttr-logo-mobile"
                                    src="/assets/images/logo-mobile.png"
                                    width="30"
                                    height="30"
                                />
                                <img
                                    alt=""
                                    className="ttr-logo-desktop"
                                    src="/assets/images/logo-white.png"
                                    width="160"
                                    height="27"
                                />
                            </a>
                        </div>
                    </div>
                    <div className="ttr-header-menu">
                        <ul className="ttr-header-navigation">
                            {header.map((item, index) => (
                                <li key={index}>
                                    <Link to={item.link || "/home"} className="ttr-material-button">
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
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
                                        <img
                                            alt=""
                                            src={
                                                user?.avatar
                                                    ? `https://learnhub-uploads.s3.ap-southeast-2.amazonaws.com/${user.avatar}`
                                                    : "/assets/images/avatar.png"
                                            }
                                            width="32"
                                            height="32"
                                        />
                                    </span>
                                </a>
                                <div
                                    className={`ttr-header-submenu${displayProfile ? " active" : ""}`}
                                    style={{ display: "block" }}>
                                    <ul>
                                        <li>
                                            <Link to="/profile">My profile</Link>
                                        </li>
                                        {user?.role === UserRole.STUDENT && (
                                            <li>
                                                <Link to="/transaction-history">My transaction</Link>
                                            </li>
                                        )}

                                        <li>
                                            <a href="#" onClick={logout}>
                                                Logout
                                            </a>
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
                            <img alt="" src="/assets/images/logo.png" width="122" height="27" />
                        </a>
                        <div onClick={() => setDisplaySidebar(false)} className="ttr-sidebar-toggle-button">
                            <i className="ti-arrow-left"></i>
                        </div>
                    </div>
                    <nav className="ttr-sidebar-navi">
                        <ul>
                            {menu.map((item, index) =>
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
                                                    <Link to={subItem.link} className="ttr-material-button">
                                                        <span className="ttr-label">{subItem.label}</span>
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                ) : (
                                    <li key={index}>
                                        <Link to={item.link || "/home"} className="ttr-material-button">
                                            <span className="ttr-icon">
                                                <i className={item.icon}></i>
                                            </span>
                                            <span className="ttr-label">{item.label}</span>
                                        </Link>
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
