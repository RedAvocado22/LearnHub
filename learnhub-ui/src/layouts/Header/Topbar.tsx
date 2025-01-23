export default function Topbar() {
    return (
        <div className="top-bar">
            <div className="container">
                <div className="row d-flex justify-content-between">
                    <div className="topbar-left">
                        <ul>
                            <li>
                                <a href="faq-1.html">
                                    <i className="fa fa-question-circle"></i>Ask a Question
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <i className="fa fa-envelope-o"></i>Support@website.com
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="topbar-right">
                        <ul>
                            <li>
                                <a href="/login">Login</a>
                            </li>
                            <li>
                                <a href="/register">Register</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
