export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };
    return (
        <>
            <footer>
                <div className="footer-top">
                    <div className="pt-exebar">
                        <div className="container">
                            <div className="d-flex align-items-stretch">
                                <div className="pt-logo mr-auto">
                                    <a href="/">
                                        <img src="/assets/images/logo-white.png" alt="" />
                                    </a>
                                </div>
                                <div className="pt-social-link">
                                    <ul className="list-inline m-a0">
                                        <li>
                                            <a href="#" className="btn-link">
                                                <i className="fa fa-facebook"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="btn-link">
                                                <i className="fa fa-twitter"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="btn-link">
                                                <i className="fa fa-linkedin"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="btn-link">
                                                <i className="fa fa-google-plus"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="pt-btn-join">
                                    <a href="/register" className="btn ">
                                        Join Now
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-4 col-md-12 col-sm-12 footer-col-4">
                                <div className="widget">
                                    <h5 className="footer-title">Sign Up For A Newsletter</h5>
                                    <p className="text-capitalize m-b20">
                                        Weekly Breaking news analysis and cutting edge advices on job searching.
                                    </p>
                                    <div className="subscribe-form m-b20">
                                        <form className="subscription-form">
                                            <div className="input-group">
                                                <input
                                                    name="email"
                                                    required
                                                    className="form-control"
                                                    placeholder="Your Email Address"
                                                    type="email"
                                                />
                                                <span className="input-group-btn">
                                                    <button name="submit" value="Submit" type="submit" className="btn">
                                                        <i className="fa fa-arrow-right"></i>
                                                    </button>
                                                </span>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-lg-5 col-md-7 col-sm-12">
                                <div className="row">
                                    <div className="col-4 col-lg-4 col-md-4 col-sm-4">
                                        <div className="widget footer_widget">
                                            <h5 className="footer-title">Company</h5>
                                            <ul>
                                                <li>
                                                    <a href="/">Home</a>
                                                </li>
                                                <li>
                                                    <a href="/about">About</a>
                                                </li>
                                                <li>
                                                    <a href="/faq">FAQs</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-4 col-lg-4 col-md-4 col-sm-4">
                                        <div className="widget footer_widget">
                                            <h5 className="footer-title">Get In Touch</h5>
                                            <ul>
                                                <li>
                                                    <a href="/contact">Contact</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-4 col-lg-4 col-md-4 col-sm-4">
                                        <div className="widget footer_widget">
                                            <h5 className="footer-title">Courses</h5>
                                            <ul>
                                                <li>
                                                    <a href="/courses">Courses</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-lg-3 col-md-5 col-sm-12 footer-col-4">
                                <div className="widget widget_gallery gallery-grid-4">
                                    <h5 className="footer-title">Our Gallery</h5>
                                    <ul>
                                        <li>
                                            <a href="/assets/images/gallery/pic1.jpg">
                                                <img src="/assets/images/gallery/pic1.jpg" alt="" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/assets/images/gallery/pic2.jpg">
                                                <img src="/assets/images/gallery/pic2.jpg" alt="" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/assets/images/gallery/pic3.jpg">
                                                <img src="/assets/images/gallery/pic3.jpg" alt="" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/assets/images/gallery/pic4.jpg">
                                                <img src="/assets/images/gallery/pic4.jpg" alt="" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/assets/images/gallery/pic5.jpg">
                                                <img src="/assets/images/gallery/pic5.jpg" alt="" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/assets/images/gallery/pic6.jpg">
                                                <img src="/assets/images/gallery/pic6.jpg" alt="" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/assets/images/gallery/pic7.jpg">
                                                <img src="/assets/images/gallery/pic7.jpg" alt="" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/assets/images/gallery/pic8.jpg">
                                                <img src="/assets/images/gallery/pic8.jpg" alt="" />
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 text-center">
                                <a target="_blank" href="https://www.templateshub.net">
                                    Templates Hub
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            <button onClick={scrollToTop} className="back-to-top fa fa-chevron-up"></button>
        </>
    );
}
