import "./Topbar.css";
export default function Topbar() {
    return (
        <div className="top-bar">
            <div className="container">
                <div className="row d-flex justify-content-between">
                    <div className="topbar-left">
                        <ul>
                            <li>
                                <a href="/faq">
                                    <i className="fa fa-question-circle"></i>Ask a Question
                                </a>
                            </li>
                            <li>
                                <a href="mailto:learnhub391@gmail.com">
                                    <i className="fa fa-envelope-o"></i>learnhub391@gmail.com
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
