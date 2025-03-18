import { Link, useSearchParams } from "react-router-dom";

interface MailboxLayoutProps {
    children: React.ReactNode;
}
export default function MailboxLayout({ children }: MailboxLayoutProps) {
    const [params, _] = useSearchParams();
    const status = params.get("status");

    return (
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
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
