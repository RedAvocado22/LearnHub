import { Link, useSearchParams } from "react-router-dom";
import { HomeLayout } from "../../../layouts";
import { useContacts } from "../../../hooks/useContacts";
import { useState } from "react";

const itemsPerPage = 10;
export default function ContactList() {
    const { contacts } = useContacts();
    const [params, _] = useSearchParams();
    const status = params.get("status") || "pending";
    const [currPage, setCurrPage] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");

    let list = contacts
        .filter((contact) => {
            const fullName = `${contact.firstName} ${contact.lastName}`;
            return fullName.toLowerCase().includes(searchQuery.toLowerCase());
        })
        .filter((contact) => {
            if (status === "resolved") {
                return contact.resolved;
            } else if (status === "pending") {
                return !contact.resolved;
            }
            return true;
        })
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    const totalPages = Math.ceil(list.length / itemsPerPage);
    const startIdx = currPage * itemsPerPage;
    list = list.slice(startIdx, startIdx + itemsPerPage);
    return (
        <HomeLayout>
            <main className="ttr-wrapper">
                <div className="container-fluid">
                    <div className="db-breadcrumb">
                        <h4 className="breadcrumb-title">Contacts</h4>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 m-b30">
                            <div className="widget-box">
                                <div className="email-wrapper">
                                    <div className="email-menu-bar">
                                        <div className="email-menu-bar-inner">
                                            <ul>
                                                <li className={status === "pending" ? "active" : ""}>
                                                    <Link to="/admin/contacts?status=pending">
                                                        <i className="fa fa-envelope-o"></i>Pending{" "}
                                                    </Link>
                                                </li>
                                                <li className={status === "resolved" ? "active" : ""}>
                                                    <Link to="/admin/contacts?status=resolved">
                                                        <i className="fa fa-check-circle-o"></i>Resolved
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="mail-list-container">
                                        <div className="mail-toolbar">
                                            <div className="mail-search-bar">
                                                <input
                                                    value={searchQuery}
                                                    onChange={(e) => setSearchQuery(e.target.value)}
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Search"
                                                />
                                            </div>
                                            <div className="next-prev-btn">
                                                <span className="mr-3">
                                                    Page {currPage + 1} of {totalPages}
                                                </span>
                                                <a
                                                    href="#"
                                                    onClick={() => {
                                                        if (currPage > 0) {
                                                            setCurrPage(currPage - 1);
                                                        }
                                                    }}>
                                                    <i className="fa fa-angle-left"></i>
                                                </a>{" "}
                                                <a
                                                    href="#"
                                                    onClick={() => {
                                                        if (currPage < totalPages - 1) {
                                                            setCurrPage(currPage + 1);
                                                        }
                                                    }}>
                                                    <i className="fa fa-angle-right"></i>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="mail-box-list">
                                            {list.map((contact) => (
                                                <div key={contact.id} className="mail-list-info">
                                                    <div className="mail-rateing">
                                                        <span>
                                                            <i className="fa fa-user-o"></i>
                                                        </span>
                                                    </div>
                                                    <div className="mail-list-title">
                                                        <h6>
                                                            <Link to={`/admin/contacts/${contact.id}`}>
                                                                {contact.firstName} {contact.lastName}
                                                            </Link>
                                                        </h6>
                                                    </div>
                                                    <div className="mail-list-title-info">
                                                        <p>{contact.subject}</p>
                                                    </div>
                                                    <div className="mail-list-time">
                                                        <span>{new Date(contact.createdAt).toDateString()}</span>
                                                    </div>
                                                    <ul className="mailbox-toolbar">
                                                        {!contact.resolved && (
                                                            <li data-toggle="tooltip" title="Resolve">
                                                                <Link to="/admin/users/add" state={{ contact }}>
                                                                    <i className="fa fa-arrow-down"></i>
                                                                </Link>
                                                            </li>
                                                        )}
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </HomeLayout>
    );
}
