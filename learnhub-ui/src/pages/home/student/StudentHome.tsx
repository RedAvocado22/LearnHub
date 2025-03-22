import { HomeLayout } from "../../../layouts";

export default function StudentHome() {
    return (
        <HomeLayout>
            <main className="ttr-wrapper">
                <div className="container-fluid">
                    <div className="db-breadcrumb">
                        <h4 className="breadcrumb-title">Dashboard</h4>
                        <ul className="db-breadcrumb-list">
                            <li>
                                <a href="#">
                                    <i className="fa fa-home"></i>Home
                                </a>
                            </li>
                            <li>Dashboard</li>
                        </ul>
                    </div>
                    <div className="row">
                        <div className="col-md-6 col-lg-3 col-xl-3 col-sm-6 col-12">
                            <div className="widget-card widget-bg1">
                                <div className="wc-item">
                                    <h4 className="wc-title">Total Frofit</h4>
                                    <span className="wc-des">All Customs Value</span>
                                    <span className="wc-stats">
                                        $<span className="counter">18</span>M
                                    </span>
                                    <div className="progress wc-progress">
                                        <div className="progress-bar" role="progressbar" style={{ width: "78%" }}></div>
                                    </div>
                                    <span className="wc-progress-bx">
                                        <span className="wc-change">Change</span>
                                        <span className="wc-number ml-auto">78%</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3 col-xl-3 col-sm-6 col-12">
                            <div className="widget-card widget-bg2">
                                <div className="wc-item">
                                    <h4 className="wc-title">New Feedbacks</h4>
                                    <span className="wc-des">Customer Review</span>
                                    <span className="wc-stats counter">120</span>
                                    <div className="progress wc-progress">
                                        <div className="progress-bar" role="progressbar" style={{ width: "88%" }}></div>
                                    </div>
                                    <span className="wc-progress-bx">
                                        <span className="wc-change">Change</span>
                                        <span className="wc-number ml-auto">88%</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3 col-xl-3 col-sm-6 col-12">
                            <div className="widget-card widget-bg3">
                                <div className="wc-item">
                                    <h4 className="wc-title">New Orders</h4>
                                    <span className="wc-des">Fresh Order Amount</span>
                                    <span className="wc-stats counter">772</span>
                                    <div className="progress wc-progress">
                                        <div className="progress-bar" role="progressbar" style={{ width: "65%" }}></div>
                                    </div>
                                    <span className="wc-progress-bx">
                                        <span className="wc-change">Change</span>
                                        <span className="wc-number ml-auto">65%</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3 col-xl-3 col-sm-6 col-12">
                            <div className="widget-card widget-bg4">
                                <div className="wc-item">
                                    <h4 className="wc-title">New Users</h4>
                                    <span className="wc-des">Joined New User</span>
                                    <span className="wc-stats counter">350</span>
                                    <div className="progress wc-progress">
                                        <div className="progress-bar" role="progressbar" style={{ width: "90%" }}></div>
                                    </div>
                                    <span className="wc-progress-bx">
                                        <span className="wc-change">Change</span>
                                        <span className="wc-number ml-auto">90%</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-8 m-b30">
                            <div className="widget-box">
                                <div className="wc-title">
                                    <h4>Your Profile Views</h4>
                                </div>
                                <div className="widget-inner">
                                    <canvas id="chart" width="100" height="45"></canvas>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 m-b30">
                            <div className="widget-box">
                                <div className="wc-title">
                                    <h4>Notifications</h4>
                                </div>
                                <div className="widget-inner">
                                    <div className="noti-box-list">
                                        <ul>
                                            <li>
                                                <span className="notification-icon dashbg-gray">
                                                    <i className="fa fa-check"></i>
                                                </span>
                                                <span className="notification-text">
                                                    <span>Sneha Jogi</span> sent you a message.
                                                </span>
                                                <span className="notification-time">
                                                    <a href="#" className="fa fa-close"></a>
                                                    <span> 02:14</span>
                                                </span>
                                            </li>
                                            <li>
                                                <span className="notification-icon dashbg-yellow">
                                                    <i className="fa fa-shopping-cart"></i>
                                                </span>
                                                <span className="notification-text">
                                                    <a href="#">Your order is placed</a> sent you a message.
                                                </span>
                                                <span className="notification-time">
                                                    <a href="#" className="fa fa-close"></a>
                                                    <span> 7 Min</span>
                                                </span>
                                            </li>
                                            <li>
                                                <span className="notification-icon dashbg-red">
                                                    <i className="fa fa-bullhorn"></i>
                                                </span>
                                                <span className="notification-text">
                                                    <span>Your item is shipped</span> sent you a message.
                                                </span>
                                                <span className="notification-time">
                                                    <a href="#" className="fa fa-close"></a>
                                                    <span> 2 May</span>
                                                </span>
                                            </li>
                                            <li>
                                                <span className="notification-icon dashbg-green">
                                                    <i className="fa fa-comments-o"></i>
                                                </span>
                                                <span className="notification-text">
                                                    <a href="#">Sneha Jogi</a> sent you a message.
                                                </span>
                                                <span className="notification-time">
                                                    <a href="#" className="fa fa-close"></a>
                                                    <span> 14 July</span>
                                                </span>
                                            </li>
                                            <li>
                                                <span className="notification-icon dashbg-primary">
                                                    <i className="fa fa-file-word-o"></i>
                                                </span>
                                                <span className="notification-text">
                                                    <span>Sneha Jogi</span> sent you a message.
                                                </span>
                                                <span className="notification-time">
                                                    <a href="#" className="fa fa-close"></a>
                                                    <span> 15 Min</span>
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 m-b30">
                            <div className="widget-box">
                                <div className="wc-title">
                                    <h4>New Users</h4>
                                </div>
                                <div className="widget-inner">
                                    <div className="new-user-list">
                                        <ul>
                                            <li>
                                                <span className="new-users-pic">
                                                    <img src="assets/images/testimonials/pic1.jpg" alt="" />
                                                </span>
                                                <span className="new-users-text">
                                                    <a href="#" className="new-users-name">
                                                        Anna Strong{" "}
                                                    </a>
                                                    <span className="new-users-info">Visual Designer,Google Inc </span>
                                                </span>
                                                <span className="new-users-btn">
                                                    <a href="#" className="btn button-sm outline">
                                                        Follow
                                                    </a>
                                                </span>
                                            </li>
                                            <li>
                                                <span className="new-users-pic">
                                                    <img src="assets/images/testimonials/pic2.jpg" alt="" />
                                                </span>
                                                <span className="new-users-text">
                                                    <a href="#" className="new-users-name">
                                                        {" "}
                                                        Milano Esco{" "}
                                                    </a>
                                                    <span className="new-users-info">Product Designer, Apple Inc </span>
                                                </span>
                                                <span className="new-users-btn">
                                                    <a href="#" className="btn button-sm outline">
                                                        Follow
                                                    </a>
                                                </span>
                                            </li>
                                            <li>
                                                <span className="new-users-pic">
                                                    <img src="assets/images/testimonials/pic1.jpg" alt="" />
                                                </span>
                                                <span className="new-users-text">
                                                    <a href="#" className="new-users-name">
                                                        Nick Bold{" "}
                                                    </a>
                                                    <span className="new-users-info">Web Developer, Facebook Inc </span>
                                                </span>
                                                <span className="new-users-btn">
                                                    <a href="#" className="btn button-sm outline">
                                                        Follow
                                                    </a>
                                                </span>
                                            </li>
                                            <li>
                                                <span className="new-users-pic">
                                                    <img src="assets/images/testimonials/pic2.jpg" alt="" />
                                                </span>
                                                <span className="new-users-text">
                                                    <a href="#" className="new-users-name">
                                                        Wiltor Delton{" "}
                                                    </a>
                                                    <span className="new-users-info">Project Manager, Amazon Inc </span>
                                                </span>
                                                <span className="new-users-btn">
                                                    <a href="#" className="btn button-sm outline">
                                                        Follow
                                                    </a>
                                                </span>
                                            </li>
                                            <li>
                                                <span className="new-users-pic">
                                                    <img src="assets/images/testimonials/pic3.jpg" alt="" />
                                                </span>
                                                <span className="new-users-text">
                                                    <a href="#" className="new-users-name">
                                                        Nick Stone{" "}
                                                    </a>
                                                    <span className="new-users-info">Project Manager, Amazon Inc </span>
                                                </span>
                                                <span className="new-users-btn">
                                                    <a href="#" className="btn button-sm outline">
                                                        Follow
                                                    </a>
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 m-b30">
                            <div className="widget-box">
                                <div className="wc-title">
                                    <h4>Orders</h4>
                                </div>
                                <div className="widget-inner">
                                    <div className="orders-list">
                                        <ul>
                                            <li>
                                                <span className="orders-title">
                                                    <a href="#" className="orders-title-name">
                                                        Anna Strong{" "}
                                                    </a>
                                                    <span className="orders-info">Order #02357 | Date 12/08/2019</span>
                                                </span>
                                                <span className="orders-btn">
                                                    <a href="#" className="btn button-sm red">
                                                        Unpaid
                                                    </a>
                                                </span>
                                            </li>
                                            <li>
                                                <span className="orders-title">
                                                    <a href="#" className="orders-title-name">
                                                        Revenue
                                                    </a>
                                                    <span className="orders-info">Order #02357 | Date 12/08/2019</span>
                                                </span>
                                                <span className="orders-btn">
                                                    <a href="#" className="btn button-sm red">
                                                        Unpaid
                                                    </a>
                                                </span>
                                            </li>
                                            <li>
                                                <span className="orders-title">
                                                    <a href="#" className="orders-title-name">
                                                        Anna Strong{" "}
                                                    </a>
                                                    <span className="orders-info">Order #02357 | Date 12/08/2019</span>
                                                </span>
                                                <span className="orders-btn">
                                                    <a href="#" className="btn button-sm green">
                                                        Paid
                                                    </a>
                                                </span>
                                            </li>
                                            <li>
                                                <span className="orders-title">
                                                    <a href="#" className="orders-title-name">
                                                        Revenue
                                                    </a>
                                                    <span className="orders-info">Order #02357 | Date 12/08/2019</span>
                                                </span>
                                                <span className="orders-btn">
                                                    <a href="#" className="btn button-sm green">
                                                        Paid
                                                    </a>
                                                </span>
                                            </li>
                                            <li>
                                                <span className="orders-title">
                                                    <a href="#" className="orders-title-name">
                                                        Anna Strong{" "}
                                                    </a>
                                                    <span className="orders-info">Order #02357 | Date 12/08/2019</span>
                                                </span>
                                                <span className="orders-btn">
                                                    <a href="#" className="btn button-sm green">
                                                        Paid
                                                    </a>
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-12 m-b30">
                            <div className="widget-box">
                                <div className="wc-title">
                                    <h4>Basic Calendar</h4>
                                </div>
                                <div className="widget-inner">
                                    <div id="calendar"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </HomeLayout>
    );
}
