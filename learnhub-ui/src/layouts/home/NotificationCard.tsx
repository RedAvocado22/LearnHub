import { formatDistanceToNow } from "date-fns";
import { Notification, useNotifications } from "../../hooks/useNotifications";
import {
    isContactSubmitted,
    isContactUpdated,
    isCourseAssigned,
    isCoursePublishedAdmin,
    isCoursePublishedTeacher,
    isCourseRejected,
    isCourseSubmitted,
    isCourseUpdated,
    isStudentEnrolled,
    isUserRegistered
} from "../../types/Notification";
import { Link } from "react-router-dom";

interface NotificationCardProps {
    notif: Notification;
    textWidth?: number | string;
}

export default function NotificationCard({ notif, textWidth = "auto" }: NotificationCardProps) {
    const { deleteNotif } = useNotifications();
    return (
        <>
            {isCourseSubmitted(notif.type, notif.context) ? (
                <>
                    <span className="notification-icon dashbg-yellow">
                        <i className="fa fa-bullhorn"></i>
                    </span>
                    <span className="notification-text">
                        <Link
                            to={
                                notif.context.isManager
                                    ? `/manager/courses/${notif.context.id}`
                                    : `/admin/courses/${notif.context.id}/assign-manager`
                            }>
                            <span className="d-inline-block text-truncate" style={{ maxWidth: textWidth }}>
                                {notif.context.teacherName}
                            </span>
                            <br />
                            submitted a course
                        </Link>
                    </span>
                </>
            ) : isCoursePublishedAdmin(notif.type, notif.context) ? (
                <>
                    <span className="notification-icon dashbg-yellow">
                        <i className="fa fa-bullhorn"></i>
                    </span>
                    <span className="notification-text">
                        <Link to={`/admin/courses?status=public`}>
                            <span className="d-inline-block text-truncate" style={{ maxWidth: textWidth }}>
                                {notif.context.managerName}
                            </span>
                            <br />
                            published a course
                        </Link>
                    </span>
                </>
            ) : isCoursePublishedTeacher(notif.type, notif.context) ? (
                <>
                    <span className="notification-icon dashbg-yellow">
                        <i className="fa fa-bullhorn"></i>
                    </span>
                    <span className="notification-text">
                        <Link to={`/home/courses/${notif.context.id}`}>
                            <span className="d-inline-block text-truncate" style={{ maxWidth: textWidth }}>
                                {notif.context.courseName}
                            </span>
                            <br />
                            is published
                        </Link>
                    </span>
                </>
            ) : isCourseRejected(notif.type, notif.context) ? (
                <>
                    <span className="notification-icon dashbg-yellow">
                        <i className="fa fa-bullhorn"></i>
                    </span>
                    <span className="notification-text">
                        <Link to={`/home/courses/${notif.context.id}`}>
                            <span className="d-inline-block text-truncate" style={{ maxWidth: textWidth }}>
                                {notif.context.courseName}
                            </span>
                            <br />
                            is rejected
                        </Link>
                    </span>
                </>
            ) : isCourseUpdated(notif.type, notif.context) ? (
                <>
                    <span className="notification-icon dashbg-yellow">
                        <i className="fa fa-bullhorn"></i>
                    </span>
                    <span className="notification-text">
                        <Link to={`/home/courses/${notif.context.id}`}>
                            <span className="d-inline-block text-truncate" style={{ maxWidth: textWidth }}>
                                {notif.context.courseName}
                            </span>
                            <br />
                            is updated
                        </Link>
                    </span>
                </>
            ) : isCourseAssigned(notif.type, notif.context) ? (
                <>
                    <span className="notification-icon dashbg-yellow">
                        <i className="fa fa-bullhorn"></i>
                    </span>
                    <span className="notification-text">
                        <Link to={`/manager/courses/${notif.context.id}`}>You have a new course assigned</Link>
                    </span>
                </>
            ) : isContactSubmitted(notif.type, notif.context) ? (
                <>
                    <span className="notification-icon dashbg-yellow">
                        <i className="fa fa-bullhorn"></i>
                    </span>
                    <span className="notification-text">
                        <Link to={`/admin/contacts/${notif.context.id}`}>You received a new contact</Link>
                    </span>
                </>
            ) : isContactUpdated(notif.type, notif.context) ? (
                <>
                    <span className="notification-icon dashbg-yellow">
                        <i className="fa fa-bullhorn"></i>
                    </span>
                    <span className="notification-text">
                        <Link to={`/admin/contacts/${notif.context.id}`}>
                            <span className="d-inline-block text-truncate" style={{ maxWidth: textWidth }}>
                                {notif.context.contactName}
                            </span>
                            <br />
                            updated their contact
                        </Link>
                    </span>
                </>
            ) : isStudentEnrolled(notif.type, notif.context) ? (
                <>
                    <span className="notification-icon dashbg-yellow">
                        <i className="fa fa-bullhorn"></i>
                    </span>
                    <span className="notification-text">
                        <span className="d-inline-block text-truncate" style={{ maxWidth: textWidth }}>
                            {notif.context.courseName}
                        </span>
                        <br /> has a new enrollment
                    </span>
                </>
            ) : isUserRegistered(notif.type, notif.context) ? (
                <>
                    <span className="notification-icon dashbg-yellow">
                        <i className="fa fa-bullhorn"></i>
                    </span>
                    <span className="notification-text">
                        <span>A new user</span> has registered
                    </span>
                </>
            ) : (
                <></>
            )}
            <span className="notification-time">
                <a href="#" onClick={() => deleteNotif(notif.id)} className="fa fa-close"></a>
                <span> {formatDistanceToNow(notif.timeSent, { addSuffix: true })}</span>
            </span>
        </>
    );
}
