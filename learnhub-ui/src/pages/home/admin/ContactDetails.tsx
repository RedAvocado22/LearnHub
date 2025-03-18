import { useNavigate, useParams } from "react-router-dom";
import { HomeLayout } from "../../../layouts";
import MailboxLayout from "../admin/MailboxLayout";
import NotFound from "../../error/NotFound";
import { useContacts } from "../../../hooks/useContacts";
import { API } from "../../../api";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";

export default function ContactDetails() {
    const { id } = useParams();
    const { contacts, deleteContacts } = useContacts();
    const contact = contacts.find((e) => e.id.toString() === id);
    const navigate = useNavigate();

    if (!contact) {
        return <NotFound />;
    }

    const handleResolveContact = async (contact: any) => {
        try {
            const resp = await API.put(`/contacts/${contact.id}`);
            if (resp.status === 200) {
                toast.success("Resolve successfully");
                navigate("/admin/users/add", { state: { contact: contact } });
            }
        } catch (err) {
            if (isAxiosError(err)) {
                toast.error(err.response?.data || "Something went wrong");
            }
            console.error((err as Error).message);
        }
    };

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
                                <div className="ml-auto send-mail-full-info">
                                    <div className="time">
                                        <span>{new Date(contact.createdAt).toDateString()}</span>
                                    </div>
                                    <div className="dropdown all-msg-toolbar ml-auto">
                                        <span className="btn btn-info-icon" data-toggle="dropdown">
                                            <i className="fa fa-ellipsis-v"></i>
                                        </span>
                                        <ul className="dropdown-menu dropdown-menu-right">
                                            <li>
                                                <a href="#" onClick={() => deleteContacts([contact.id])}>
                                                    <i className="fa fa-trash-o"></i> Delete
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" onClick={() => handleResolveContact(contact)}>
                                                    <i className="fa fa-arrow-down"></i> Resolve
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="read-content-body">
                                <div dangerouslySetInnerHTML={{ __html: contact.message || "" }} />
                            </div>
                        </div>
                    </div>
                </div>
            </MailboxLayout>
        </HomeLayout>
    );
}
