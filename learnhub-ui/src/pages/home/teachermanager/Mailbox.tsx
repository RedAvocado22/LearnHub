import { HomeLayout } from "../../../layouts";

export default function Mailbox() {
    return (
        <HomeLayout>
            <main className="ttr-wrapper">
                <div className="container-fluid">
                    <div className="db-breadcrumb">
                        <h4 className="breadcrumb-title">Mailbox</h4>
                        <ul className="db-breadcrumb-list">
                            <li>
                                <a href="/">
                                    <i className="fa fa-home"></i>Home
                                </a>
                            </li>
                            <li>Mailbox</li>
                        </ul>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 m-b30">
                            <div className="widget-box">
                                <div className="email-wrapper">
                                    <div className="email-menu-bar">
                                        <div className="compose-mail">
                                            <a href="mailbox-compose.html" className="btn btn-block">
                                                Compose
                                            </a>
                                        </div>
                                        <div className="email-menu-bar-inner">
                                            <ul>
                                                <li className="active">
                                                    <a href="mailbox.html">
                                                        <i className="fa-light fa-phone"></i>Contact{" "}
                                                        <span className="badge badge-success">8</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="mailbox.html">
                                                        <i className="fa fa-envelope-o"></i>Inbox{" "}
                                                        <span className="badge badge-success">8</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="mailbox.html">
                                                        <i className="fa fa-send-o"></i>Sent
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="mailbox.html">
                                                        <i className="fa fa-file-text-o"></i>Drafts{" "}
                                                        <span className="badge badge-warning">8</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="mailbox.html">
                                                        <i className="fa fa-cloud-upload"></i>Outbox{" "}
                                                        <span className="badge badge-danger">8</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="mailbox.html">
                                                        <i className="fa fa-trash-o"></i>Trash
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="mail-list-container">
                                        <div className="mail-toolbar">
                                            <div className="check-all">
                                                <div className="custom-control custom-checkbox checkbox-st1">
                                                    <input
                                                        type="checkbox"
                                                        className="custom-control-input"
                                                        id="check1"
                                                    />
                                                    <label className="custom-control-label" htmlFor="check1"></label>
                                                </div>
                                            </div>
                                            <div className="mail-search-bar">
                                                <input type="text" className="form-control" placeholder="Search" />
                                            </div>
                                            <div className="dropdown all-msg-toolbar">
                                                <span className="btn btn-info-icon" data-toggle="dropdown">
                                                    <i className="fa fa-ellipsis-v"></i>
                                                </span>
                                                <ul className="dropdown-menu">
                                                    <li>
                                                        <a href="#">
                                                            <i className="fa fa-trash-o"></i> Delete
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            <i className="fa fa-arrow-down"></i> Archive
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            <i className="fa fa-clock-o"></i> Snooze
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            <i className="fa fa-envelope-open"></i> Mark as unread
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="next-prev-btn">
                                                <a href="#">
                                                    <i className="fa fa-angle-left"></i>
                                                </a>{" "}
                                                <a href="#">
                                                    <i className="fa fa-angle-right"></i>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="mail-box-list">
                                            <div className="mail-list-info">
                                                <div className="checkbox-list">
                                                    <div className="custom-control custom-checkbox checkbox-st1">
                                                        <input
                                                            type="checkbox"
                                                            className="custom-control-input"
                                                            id="check2"
                                                        />
                                                        <label
                                                            className="custom-control-label"
                                                            htmlFor="check2"></label>
                                                    </div>
                                                </div>
                                                <div className="mail-rateing">
                                                    <span>
                                                        <i className="fa fa-star-o"></i>
                                                    </span>
                                                </div>
                                                <div className="mail-list-title">
                                                    <h6>David Moore</h6>
                                                </div>
                                                <div className="mail-list-title-info">
                                                    <p>Change the password for your Micr</p>
                                                </div>
                                                <div className="mail-list-time">
                                                    <span>10:59 AM</span>
                                                </div>
                                                <ul className="mailbox-toolbar">
                                                    <li data-toggle="tooltip" title="Delete">
                                                        <i className="fa fa-trash-o"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Archive">
                                                        <i className="fa fa-arrow-down"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Snooze">
                                                        <i className="fa fa-clock-o"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Mark as unread">
                                                        <i className="fa fa-envelope-open"></i>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="mail-list-info">
                                                <div className="checkbox-list">
                                                    <div className="custom-control custom-checkbox checkbox-st1">
                                                        <input
                                                            type="checkbox"
                                                            className="custom-control-input"
                                                            id="check3"
                                                        />
                                                        <label
                                                            className="custom-control-label"
                                                            htmlFor="check3"></label>
                                                    </div>
                                                </div>
                                                <div className="mail-rateing">
                                                    <span>
                                                        <i className="fa fa-star-o"></i>
                                                    </span>
                                                </div>
                                                <div className="mail-list-title">
                                                    <h6>David Moore</h6>
                                                </div>
                                                <div className="mail-list-title-info">
                                                    <p>Change the password for your Micr</p>
                                                </div>
                                                <div className="mail-list-time">
                                                    <span>10:59 AM</span>
                                                </div>
                                                <ul className="mailbox-toolbar">
                                                    <li data-toggle="tooltip" title="Delete">
                                                        <i className="fa fa-trash-o"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Archive">
                                                        <i className="fa fa-arrow-down"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Snooze">
                                                        <i className="fa fa-clock-o"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Mark as unread">
                                                        <i className="fa fa-envelope-open"></i>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="mail-list-info">
                                                <div className="checkbox-list">
                                                    <div className="custom-control custom-checkbox checkbox-st1">
                                                        <input
                                                            type="checkbox"
                                                            className="custom-control-input"
                                                            id="check4"
                                                        />
                                                        <label
                                                            className="custom-control-label"
                                                            htmlFor="check4"></label>
                                                    </div>
                                                </div>
                                                <div className="mail-rateing">
                                                    <span>
                                                        <i className="fa fa-star-o"></i>
                                                    </span>
                                                </div>
                                                <div className="mail-list-title">
                                                    <h6>David Moore</h6>
                                                </div>
                                                <div className="mail-list-title-info">
                                                    <p>Change the password for your Micr</p>
                                                </div>
                                                <div className="mail-list-time">
                                                    <span>10:59 AM</span>
                                                </div>
                                                <ul className="mailbox-toolbar">
                                                    <li data-toggle="tooltip" title="Delete">
                                                        <i className="fa fa-trash-o"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Archive">
                                                        <i className="fa fa-arrow-down"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Snooze">
                                                        <i className="fa fa-clock-o"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Mark as unread">
                                                        <i className="fa fa-envelope-open"></i>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="mail-list-info">
                                                <div className="checkbox-list">
                                                    <div className="custom-control custom-checkbox checkbox-st1">
                                                        <input
                                                            type="checkbox"
                                                            className="custom-control-input"
                                                            id="check5"
                                                        />
                                                        <label
                                                            className="custom-control-label"
                                                            htmlFor="check5"></label>
                                                    </div>
                                                </div>
                                                <div className="mail-rateing">
                                                    <span>
                                                        <i className="fa fa-star-o"></i>
                                                    </span>
                                                </div>
                                                <div className="mail-list-title">
                                                    <h6>David Moore</h6>
                                                </div>
                                                <div className="mail-list-title-info">
                                                    <p>Change the password for your Micr</p>
                                                </div>
                                                <div className="mail-list-time">
                                                    <span>10:59 AM</span>
                                                </div>
                                                <ul className="mailbox-toolbar">
                                                    <li data-toggle="tooltip" title="Delete">
                                                        <i className="fa fa-trash-o"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Archive">
                                                        <i className="fa fa-arrow-down"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Snooze">
                                                        <i className="fa fa-clock-o"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Mark as unread">
                                                        <i className="fa fa-envelope-open"></i>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="mail-list-info">
                                                <div className="checkbox-list">
                                                    <div className="custom-control custom-checkbox checkbox-st1">
                                                        <input
                                                            type="checkbox"
                                                            className="custom-control-input"
                                                            id="check6"
                                                        />
                                                        <label
                                                            className="custom-control-label"
                                                            htmlFor="check6"></label>
                                                    </div>
                                                </div>
                                                <div className="mail-rateing">
                                                    <span>
                                                        <i className="fa fa-star-o"></i>
                                                    </span>
                                                </div>
                                                <div className="mail-list-title">
                                                    <h6>David Moore</h6>
                                                </div>
                                                <div className="mail-list-title-info">
                                                    <p>Change the password for your Micr</p>
                                                </div>
                                                <div className="mail-list-time">
                                                    <span>10:59 AM</span>
                                                </div>
                                                <ul className="mailbox-toolbar">
                                                    <li data-toggle="tooltip" title="Delete">
                                                        <i className="fa fa-trash-o"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Archive">
                                                        <i className="fa fa-arrow-down"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Snooze">
                                                        <i className="fa fa-clock-o"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Mark as unread">
                                                        <i className="fa fa-envelope-open"></i>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="mail-list-info">
                                                <div className="checkbox-list">
                                                    <div className="custom-control custom-checkbox checkbox-st1">
                                                        <input
                                                            type="checkbox"
                                                            className="custom-control-input"
                                                            id="check7"
                                                        />
                                                        <label
                                                            className="custom-control-label"
                                                            htmlFor="check7"></label>
                                                    </div>
                                                </div>
                                                <div className="mail-rateing">
                                                    <span>
                                                        <i className="fa fa-star-o"></i>
                                                    </span>
                                                </div>
                                                <div className="mail-list-title">
                                                    <h6>David Moore</h6>
                                                </div>
                                                <div className="mail-list-title-info">
                                                    <p>Change the password for your Micr</p>
                                                </div>
                                                <div className="mail-list-time">
                                                    <span>10:59 AM</span>
                                                </div>
                                                <ul className="mailbox-toolbar">
                                                    <li data-toggle="tooltip" title="Delete">
                                                        <i className="fa fa-trash-o"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Archive">
                                                        <i className="fa fa-arrow-down"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Snooze">
                                                        <i className="fa fa-clock-o"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Mark as unread">
                                                        <i className="fa fa-envelope-open"></i>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="mail-list-info">
                                                <div className="checkbox-list">
                                                    <div className="custom-control custom-checkbox checkbox-st1">
                                                        <input
                                                            type="checkbox"
                                                            className="custom-control-input"
                                                            id="check8"
                                                        />
                                                        <label
                                                            className="custom-control-label"
                                                            htmlFor="check8"></label>
                                                    </div>
                                                </div>
                                                <div className="mail-rateing">
                                                    <span>
                                                        <i className="fa fa-star-o"></i>
                                                    </span>
                                                </div>
                                                <div className="mail-list-title">
                                                    <h6>David Moore</h6>
                                                </div>
                                                <div className="mail-list-title-info">
                                                    <p>Change the password for your Micr</p>
                                                </div>
                                                <div className="mail-list-time">
                                                    <span>10:59 AM</span>
                                                </div>
                                                <ul className="mailbox-toolbar">
                                                    <li data-toggle="tooltip" title="Delete">
                                                        <i className="fa fa-trash-o"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Archive">
                                                        <i className="fa fa-arrow-down"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Snooze">
                                                        <i className="fa fa-clock-o"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Mark as unread">
                                                        <i className="fa fa-envelope-open"></i>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="mail-list-info">
                                                <div className="checkbox-list">
                                                    <div className="custom-control custom-checkbox checkbox-st1">
                                                        <input
                                                            type="checkbox"
                                                            className="custom-control-input"
                                                            id="check9"
                                                        />
                                                        <label
                                                            className="custom-control-label"
                                                            htmlFor="check9"></label>
                                                    </div>
                                                </div>
                                                <div className="mail-rateing">
                                                    <span>
                                                        <i className="fa fa-star-o"></i>
                                                    </span>
                                                </div>
                                                <div className="mail-list-title">
                                                    <h6>David Moore</h6>
                                                </div>
                                                <div className="mail-list-title-info">
                                                    <p>Change the password for your Micr</p>
                                                </div>
                                                <div className="mail-list-time">
                                                    <span>10:59 AM</span>
                                                </div>
                                                <ul className="mailbox-toolbar">
                                                    <li data-toggle="tooltip" title="Delete">
                                                        <i className="fa fa-trash-o"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Archive">
                                                        <i className="fa fa-arrow-down"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Snooze">
                                                        <i className="fa fa-clock-o"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Mark as unread">
                                                        <i className="fa fa-envelope-open"></i>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="mail-list-info">
                                                <div className="checkbox-list">
                                                    <div className="custom-control custom-checkbox checkbox-st1">
                                                        <input
                                                            type="checkbox"
                                                            className="custom-control-input"
                                                            id="check10"
                                                        />
                                                        <label
                                                            className="custom-control-label"
                                                            htmlFor="check10"></label>
                                                    </div>
                                                </div>
                                                <div className="mail-rateing">
                                                    <span>
                                                        <i className="fa fa-star-o"></i>
                                                    </span>
                                                </div>
                                                <div className="mail-list-title">
                                                    <h6>David Moore</h6>
                                                </div>
                                                <div className="mail-list-title-info">
                                                    <p>Change the password for your Micr</p>
                                                </div>
                                                <div className="mail-list-time">
                                                    <span>10:59 AM</span>
                                                </div>
                                                <ul className="mailbox-toolbar">
                                                    <li data-toggle="tooltip" title="Delete">
                                                        <i className="fa fa-trash-o"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Archive">
                                                        <i className="fa fa-arrow-down"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Snooze">
                                                        <i className="fa fa-clock-o"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Mark as unread">
                                                        <i className="fa fa-envelope-open"></i>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="mail-list-info">
                                                <div className="checkbox-list">
                                                    <div className="custom-control custom-checkbox checkbox-st1">
                                                        <input
                                                            type="checkbox"
                                                            className="custom-control-input"
                                                            id="check11"
                                                        />
                                                        <label
                                                            className="custom-control-label"
                                                            htmlFor="check11"></label>
                                                    </div>
                                                </div>
                                                <div className="mail-rateing">
                                                    <span>
                                                        <i className="fa fa-star-o"></i>
                                                    </span>
                                                </div>
                                                <div className="mail-list-title">
                                                    <h6>David Moore</h6>
                                                </div>
                                                <div className="mail-list-title-info">
                                                    <p>Change the password for your Micr</p>
                                                </div>
                                                <div className="mail-list-time">
                                                    <span>10:59 AM</span>
                                                </div>
                                                <ul className="mailbox-toolbar">
                                                    <li data-toggle="tooltip" title="Delete">
                                                        <i className="fa fa-trash-o"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Archive">
                                                        <i className="fa fa-arrow-down"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Snooze">
                                                        <i className="fa fa-clock-o"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Mark as unread">
                                                        <i className="fa fa-envelope-open"></i>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="mail-list-info">
                                                <div className="checkbox-list">
                                                    <div className="custom-control custom-checkbox checkbox-st1">
                                                        <input
                                                            type="checkbox"
                                                            className="custom-control-input"
                                                            id="check12"
                                                        />
                                                        <label
                                                            className="custom-control-label"
                                                            htmlFor="check12"></label>
                                                    </div>
                                                </div>
                                                <div className="mail-rateing">
                                                    <span>
                                                        <i className="fa fa-star-o"></i>
                                                    </span>
                                                </div>
                                                <div className="mail-list-title">
                                                    <h6>David Moore</h6>
                                                </div>
                                                <div className="mail-list-title-info">
                                                    <p>Change the password for your Micr</p>
                                                </div>
                                                <div className="mail-list-time">
                                                    <span>10:59 AM</span>
                                                </div>
                                                <ul className="mailbox-toolbar">
                                                    <li data-toggle="tooltip" title="Delete">
                                                        <i className="fa fa-trash-o"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Archive">
                                                        <i className="fa fa-arrow-down"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Snooze">
                                                        <i className="fa fa-clock-o"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Mark as unread">
                                                        <i className="fa fa-envelope-open"></i>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="mail-list-info">
                                                <div className="checkbox-list">
                                                    <div className="custom-control custom-checkbox checkbox-st1">
                                                        <input
                                                            type="checkbox"
                                                            className="custom-control-input"
                                                            id="check13"
                                                        />
                                                        <label
                                                            className="custom-control-label"
                                                            htmlFor="check13"></label>
                                                    </div>
                                                </div>
                                                <div className="mail-rateing">
                                                    <span>
                                                        <i className="fa fa-star-o"></i>
                                                    </span>
                                                </div>
                                                <div className="mail-list-title">
                                                    <h6>David Moore</h6>
                                                </div>
                                                <div className="mail-list-title-info">
                                                    <p>Change the password for your Micr</p>
                                                </div>
                                                <div className="mail-list-time">
                                                    <span>10:59 AM</span>
                                                </div>
                                                <ul className="mailbox-toolbar">
                                                    <li data-toggle="tooltip" title="Delete">
                                                        <i className="fa fa-trash-o"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Archive">
                                                        <i className="fa fa-arrow-down"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Snooze">
                                                        <i className="fa fa-clock-o"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Mark as unread">
                                                        <i className="fa fa-envelope-open"></i>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="mail-list-info">
                                                <div className="checkbox-list">
                                                    <div className="custom-control custom-checkbox checkbox-st1">
                                                        <input
                                                            type="checkbox"
                                                            className="custom-control-input"
                                                            id="check14"
                                                        />
                                                        <label
                                                            className="custom-control-label"
                                                            htmlFor="check14"></label>
                                                    </div>
                                                </div>
                                                <div className="mail-rateing">
                                                    <span>
                                                        <i className="fa fa-star-o"></i>
                                                    </span>
                                                </div>
                                                <div className="mail-list-title">
                                                    <h6>David Moore</h6>
                                                </div>
                                                <div className="mail-list-title-info">
                                                    <p>Change the password for your Micr</p>
                                                </div>
                                                <div className="mail-list-time">
                                                    <span>10:59 AM</span>
                                                </div>
                                                <ul className="mailbox-toolbar">
                                                    <li data-toggle="tooltip" title="Delete">
                                                        <i className="fa fa-trash-o"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Archive">
                                                        <i className="fa fa-arrow-down"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Snooze">
                                                        <i className="fa fa-clock-o"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Mark as unread">
                                                        <i className="fa fa-envelope-open"></i>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="mail-list-info">
                                                <div className="checkbox-list">
                                                    <div className="custom-control custom-checkbox checkbox-st1">
                                                        <input
                                                            type="checkbox"
                                                            className="custom-control-input"
                                                            id="check15"
                                                        />
                                                        <label
                                                            className="custom-control-label"
                                                            htmlFor="check15"></label>
                                                    </div>
                                                </div>
                                                <div className="mail-rateing">
                                                    <span>
                                                        <i className="fa fa-star-o"></i>
                                                    </span>
                                                </div>
                                                <div className="mail-list-title">
                                                    <h6>David Moore</h6>
                                                </div>
                                                <div className="mail-list-title-info">
                                                    <p>Change the password for your Micr</p>
                                                </div>
                                                <div className="mail-list-time">
                                                    <span>10:59 AM</span>
                                                </div>
                                                <ul className="mailbox-toolbar">
                                                    <li data-toggle="tooltip" title="Delete">
                                                        <i className="fa fa-trash-o"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Archive">
                                                        <i className="fa fa-arrow-down"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Snooze">
                                                        <i className="fa fa-clock-o"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Mark as unread">
                                                        <i className="fa fa-envelope-open"></i>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="mail-list-info">
                                                <div className="checkbox-list">
                                                    <div className="custom-control custom-checkbox checkbox-st1">
                                                        <input
                                                            type="checkbox"
                                                            className="custom-control-input"
                                                            id="check16"
                                                        />
                                                        <label
                                                            className="custom-control-label"
                                                            htmlFor="check16"></label>
                                                    </div>
                                                </div>
                                                <div className="mail-rateing">
                                                    <span>
                                                        <i className="fa fa-star-o"></i>
                                                    </span>
                                                </div>
                                                <div className="mail-list-title">
                                                    <h6>David Moore</h6>
                                                </div>
                                                <div className="mail-list-title-info">
                                                    <p>Change the password for your Micr</p>
                                                </div>
                                                <div className="mail-list-time">
                                                    <span>10:59 AM</span>
                                                </div>
                                                <ul className="mailbox-toolbar">
                                                    <li data-toggle="tooltip" title="Delete">
                                                        <i className="fa fa-trash-o"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Archive">
                                                        <i className="fa fa-arrow-down"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Snooze">
                                                        <i className="fa fa-clock-o"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Mark as unread">
                                                        <i className="fa fa-envelope-open"></i>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="mail-list-info">
                                                <div className="checkbox-list">
                                                    <div className="custom-control custom-checkbox checkbox-st1">
                                                        <input
                                                            type="checkbox"
                                                            className="custom-control-input"
                                                            id="check17"
                                                        />
                                                        <label
                                                            className="custom-control-label"
                                                            htmlFor="check17"></label>
                                                    </div>
                                                </div>
                                                <div className="mail-rateing">
                                                    <span>
                                                        <i className="fa fa-star-o"></i>
                                                    </span>
                                                </div>
                                                <div className="mail-list-title">
                                                    <h6>David Moore</h6>
                                                </div>
                                                <div className="mail-list-title-info">
                                                    <p>Change the password for your Micr</p>
                                                </div>
                                                <div className="mail-list-time">
                                                    <span>10:59 AM</span>
                                                </div>
                                                <ul className="mailbox-toolbar">
                                                    <li data-toggle="tooltip" title="Delete">
                                                        <i className="fa fa-trash-o"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Archive">
                                                        <i className="fa fa-arrow-down"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Snooze">
                                                        <i className="fa fa-clock-o"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Mark as unread">
                                                        <i className="fa fa-envelope-open"></i>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="mail-list-info">
                                                <div className="checkbox-list">
                                                    <div className="custom-control custom-checkbox checkbox-st1">
                                                        <input
                                                            type="checkbox"
                                                            className="custom-control-input"
                                                            id="check18"
                                                        />
                                                        <label
                                                            className="custom-control-label"
                                                            htmlFor="check18"></label>
                                                    </div>
                                                </div>
                                                <div className="mail-rateing">
                                                    <span>
                                                        <i className="fa fa-star-o"></i>
                                                    </span>
                                                </div>
                                                <div className="mail-list-title">
                                                    <h6>David Moore</h6>
                                                </div>
                                                <div className="mail-list-title-info">
                                                    <p>Change the password for your Micr</p>
                                                </div>
                                                <div className="mail-list-time">
                                                    <span>10:59 AM</span>
                                                </div>
                                                <ul className="mailbox-toolbar">
                                                    <li data-toggle="tooltip" title="Delete">
                                                        <i className="fa fa-trash-o"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Archive">
                                                        <i className="fa fa-arrow-down"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Snooze">
                                                        <i className="fa fa-clock-o"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Mark as unread">
                                                        <i className="fa fa-envelope-open"></i>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="mail-list-info">
                                                <div className="checkbox-list">
                                                    <div className="custom-control custom-checkbox checkbox-st1">
                                                        <input
                                                            type="checkbox"
                                                            className="custom-control-input"
                                                            id="check19"
                                                        />
                                                        <label
                                                            className="custom-control-label"
                                                            htmlFor="check19"></label>
                                                    </div>
                                                </div>
                                                <div className="mail-rateing">
                                                    <span>
                                                        <i className="fa fa-star-o"></i>
                                                    </span>
                                                </div>
                                                <div className="mail-list-title">
                                                    <h6>David Moore</h6>
                                                </div>
                                                <div className="mail-list-title-info">
                                                    <p>Change the password for your Micr</p>
                                                </div>
                                                <div className="mail-list-time">
                                                    <span>10:59 AM</span>
                                                </div>
                                                <ul className="mailbox-toolbar">
                                                    <li data-toggle="tooltip" title="Delete">
                                                        <i className="fa fa-trash-o"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Archive">
                                                        <i className="fa fa-arrow-down"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Snooze">
                                                        <i className="fa fa-clock-o"></i>
                                                    </li>
                                                    <li data-toggle="tooltip" title="Mark as unread">
                                                        <i className="fa fa-envelope-open"></i>
                                                    </li>
                                                </ul>
                                            </div>
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
