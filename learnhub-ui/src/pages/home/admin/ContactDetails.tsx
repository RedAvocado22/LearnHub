import { Link, useParams } from "react-router-dom";
import { HomeLayout } from "../../../layouts";
import MailboxLayout from "../admin/MailboxLayout";
import NotFound from "../../error/NotFound";
import { ContactSubject, useContacts } from "../../../hooks/useContacts";
import Swal from "sweetalert2";
import { API } from "../../../api";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";

export default function ContactDetails() {
    const { id } = useParams();
    const { contacts, deleteContacts } = useContacts();
    const contact = contacts.find((e) => e.id.toString() === id);

    const handleDelete = async (id: number) => {
        const { isConfirmed } = await Swal.fire({
            title: "Delete contact?",
            icon: "warning",
            showCancelButton: true
        });
        if (isConfirmed) {
            await deleteContacts([id]);
        }
    };

    const handleRequest = async () => {
        const { isConfirmed } = await Swal.fire({
            title: "Send request to contact email?",
            icon: "info",
            showCancelButton: true
        });
        if (!isConfirmed || !contact) return;
        try {
            const resp = await API.get(`/contacts/${contact.id}/request-details`);
            if (resp.status === 200) {
                toast.success("Request sent successfully");
            }
        } catch (err) {
            let msg = "Something went wrong";
            if (isAxiosError(err)) {
                switch (err.response?.status) {
                    case 404:
                        msg = "Can not find contact";
                }
            }
            toast.error(msg);
        }
    };

    if (!contact) {
        return <NotFound />;
    }

    return (
        <HomeLayout>
            <MailboxLayout>
                <div className="mail-list-container">
                    <div className="mailbox-view">
                        <div className="mailbox-view-title">
                            <h5 className="send-mail-title">{contact.subject}</h5>
                        </div>
                        <div className="send-mail-details">
                            <div className="d-flex">
                                <div className="send-mail-user">
                                    <div className="send-mail-user-pic">
                                        <img src="/assets/images/testimonials/default.jpg" alt="" />
                                    </div>
                                    <div className="send-mail-user-info">
                                        <h4>
                                            {contact.firstName} {contact.lastName}
                                        </h4>
                                        <h5>From: {contact.email}</h5>
                                        <h5>Phone: {contact.phone}</h5>
                                    </div>
                                </div>
                                {contact.resolved ? (
                                    <div className="ml-auto send-mail-full-info">
                                        <div className="time">
                                            <span>{new Date(contact.resolvedAt || "").toDateString()}</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="ml-auto send-mail-full-info">
                                        <div className="time">
                                            <span>{new Date(contact.createdAt).toDateString()}</span>
                                        </div>
                                        <button onClick={handleRequest} className="btn btn-info-icon">
                                            Request Details
                                        </button>
                                        <div className="dropdown all-msg-toolbar ml-auto">
                                            <span className="btn btn-info-icon" data-toggle="dropdown">
                                                <i className="fa fa-ellipsis-v"></i>
                                            </span>
                                            <ul className="dropdown-menu dropdown-menu-right">
                                                <li>
                                                    <a href="#" onClick={() => handleDelete(contact.id)}>
                                                        <i className="fa fa-trash-o"></i> Delete
                                                    </a>
                                                </li>
                                                <li>
                                                    <Link to="/admin/users/add" state={{ contact }}>
                                                        <i className="fa fa-arrow-down"></i> Resolve
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="read-content-body">{contact.message}</div>
                            {contact.subject === ContactSubject.ADD_TEACHER && contact.teacher && (
                                <>
                                    <hr />
                                    <h6>Teacher Details</h6>
                                    <div className="row">
                                        <div className="col-6">
                                            <span className="fw6">Major: </span>
                                            {contact.teacher.major}
                                        </div>
                                        <div className="col-6">
                                            <span className="fw6">Work Address: </span>
                                            {contact.teacher.workAddress}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6">
                                            <span className="fw6">City: </span>
                                            {contact.teacher.city}
                                        </div>
                                        <div className="col-6">
                                            <span className="fw6">Website: </span>
                                            <a target="_blank" href={contact.teacher.website || "#"}>
                                                {contact.teacher.website}
                                            </a>
                                        </div>
                                    </div>
                                    <div>
                                        <span className="fw6">Biography: </span>
                                        {contact.teacher.biography}
                                    </div>
                                </>
                            )}
                            {contact.subject === ContactSubject.ADD_MANAGER && contact.manager && (
                                <>
                                    <hr />
                                    <h6>Manager Details</h6>
                                    <div>
                                        <span className="fw6">Department: </span>
                                        {contact.manager?.department}
                                    </div>
                                </>
                            )}
                            <hr />
                            <h6>
                                <i className="fa fa-download m-r5"></i> Documents{" "}
                                <span>({contact.documents.length})</span>
                            </h6>
                            <div className="mailbox-download-file">
                                {contact.documents.map((doc) => (
                                    <a
                                        download
                                        target="_blank"
                                        href={`https://learnhub-uploads.s3.ap-southeast-2.amazonaws.com/${doc.fileUrl}`}
                                        className="mr-2">
                                        <i className="fa fa-file-o"></i> {doc.fileName}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </MailboxLayout>
        </HomeLayout>
    );
}
