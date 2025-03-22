import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { HomeLayout } from "../../../layouts";
import { useContacts } from "../../../hooks/useContacts";
import { useState } from "react";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import { API } from "../../../api";

const itemsPerPage = 10;
export default function ContactList() {
    const { contacts, deleteContacts } = useContacts();
    const [params, _] = useSearchParams();
    const status = params.get("status") || "pending";
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [currPage, setCurrPage] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();
    const getTimestamp = (str: string): number => {
        const timestamp = new Date(str).getTime();
        return isNaN(timestamp) ? -Infinity : timestamp;
    };
    const handleItemCheckbox = (id: number) => {
        setSelectedItems((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
    };

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
        .sort((a, b) => getTimestamp(b.createdAt) - getTimestamp(a.createdAt));

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
                                            <div className="check-all">
                                                <div className="custom-control custom-checkbox checkbox-st1">
                                                    <input
                                                        checked={
                                                            list.length > 0 && selectedItems.length === list.length
                                                        }
                                                        onChange={(e) =>
                                                            e.target.checked
                                                                ? setSelectedItems(list.map((item) => item.id))
                                                                : setSelectedItems([])
                                                        }
                                                        type="checkbox"
                                                        className="custom-control-input"
                                                        id="check0"
                                                    />
                                                    <label className="custom-control-label" htmlFor="check0"></label>
                                                </div>
                                            </div>
                                            <div className="mail-search-bar">
                                                <input
                                                    value={searchQuery}
                                                    onChange={(e) => setSearchQuery(e.target.value)}
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Search"
                                                />
                                            </div>
                                            <div className="dropdown all-msg-toolbar">
                                                <span className="btn btn-info-icon" data-toggle="dropdown">
                                                    <i className="fa fa-ellipsis-v"></i>
                                                </span>
                                                <ul className="dropdown-menu">
                                                    <li>
                                                        <a href="#" onClick={() => deleteContacts(selectedItems)}>
                                                            <i className="fa fa-trash-o"></i> Delete
                                                        </a>
                                                    </li>
                                                </ul>
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
                                                    <div className="checkbox-list">
                                                        <div className="custom-control custom-checkbox checkbox-st1">
                                                            <input
                                                                checked={selectedItems.includes(contact.id)}
                                                                onChange={() => handleItemCheckbox(contact.id)}
                                                                type="checkbox"
                                                                className="custom-control-input"
                                                                id={`check${contact.id}`}
                                                            />
                                                            <label
                                                                className="custom-control-label"
                                                                htmlFor={`check${contact.id}`}></label>
                                                        </div>
                                                    </div>
                                                    <div className="mail-rateing">
                                                        <span>
                                                            <i className="fa fa-star-o"></i>
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
                                                        <li data-toggle="tooltip" title="Delete">
                                                            <i
                                                                onClick={() => deleteContacts([contact.id])}
                                                                className="fa fa-trash-o"></i>
                                                        </li>{" "}
                                                        <li data-toggle="tooltip" title="Resolve">
                                                            <a href="#" onClick={() => handleResolveContact(contact)}>
                                                                <i className="fa fa-arrow-down"></i>
                                                            </a>
                                                        </li>
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
