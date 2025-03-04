import { MainLayout } from "../../layouts";

export default function FAQ() {
    return (
        <MainLayout>
            <div className="page-content bg-white">
                <div
                    className="page-banner ovbl-dark"
                    style={{ backgroundImage: "url(assets/images/banner/banner3.jpg)" }}>
                    <div className="container">
                        <div className="page-banner-entry">
                            <h1 className="text-white">Frequently Asked Questions</h1>
                        </div>
                    </div>
                </div>
                <div className="content-block">
                    <div className="section-area section-sp1 bg-gray">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-3 col-md-6 col-sm-6 m-b30">
                                    <div className="feature-container">
                                        <div className="feature-md text-white m-b20">
                                            <a href="#" className="icon-cell">
                                                <img src="assets/images/icon/icon1.png" alt="" />
                                            </a>
                                        </div>
                                        <div className="icon-content">
                                            <h5 className="ttr-tilte">Our Philosophy</h5>
                                            <p>
                                                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
                                                nonummy nibh euismod..
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6 col-sm-6 m-b30">
                                    <div className="feature-container">
                                        <div className="feature-md text-white m-b20">
                                            <a href="#" className="icon-cell">
                                                <img src="assets/images/icon/icon2.png" alt="" />
                                            </a>
                                        </div>
                                        <div className="icon-content">
                                            <h5 className="ttr-tilte">Kingster's Principle</h5>
                                            <p>
                                                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
                                                nonummy nibh euismod..
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6 col-sm-6 m-b30">
                                    <div className="feature-container">
                                        <div className="feature-md text-white m-b20">
                                            <a href="#" className="icon-cell">
                                                <img src="assets/images/icon/icon3.png" alt="" />
                                            </a>
                                        </div>
                                        <div className="icon-content">
                                            <h5 className="ttr-tilte">Key Of Success</h5>
                                            <p>
                                                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
                                                nonummy nibh euismod..
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6 col-sm-6 m-b30">
                                    <div className="feature-container">
                                        <div className="feature-md text-white m-b20">
                                            <a href="#" className="icon-cell">
                                                <img src="assets/images/icon/icon4.png" alt="" />
                                            </a>
                                        </div>
                                        <div className="icon-content">
                                            <h5 className="ttr-tilte">Our Philosophy</h5>
                                            <p>
                                                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
                                                nonummy nibh euismod..
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="section-area section-sp1">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-8 col-md-12">
                                    <div className="heading-bx left">
                                        <h2 className="m-b10 title-head">
                                            Asked <span> Questions</span>
                                        </h2>
                                    </div>
                                    <p className="m-b10">
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                                        Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                                        unknown printer took a galley of type and scrambled it.
                                    </p>
                                    <p>
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                                        Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                                        unknown printer took a galley of type and scrambled it.
                                    </p>
                                    <div className="ttr-accordion m-b30 faq-bx" id="accordion1">
                                        <div className="panel">
                                            <div className="acod-head">
                                                <h6 className="acod-title">
                                                    <a
                                                        data-toggle="collapse"
                                                        href="#faq1"
                                                        className="collapsed"
                                                        data-parent="#faq1">
                                                        Why won't my payment go through?{" "}
                                                    </a>{" "}
                                                </h6>
                                            </div>
                                            <div id="faq1" className="acod-body collapse">
                                                <div className="acod-content">
                                                    Web design aorem apsum dolor sit amet, adipiscing elit, sed diam
                                                    nibh euismod tincidunt ut laoreet dolore magna aliquam erat
                                                    volutpat.
                                                </div>
                                            </div>
                                        </div>
                                        <div className="panel">
                                            <div className="acod-head">
                                                <h6 className="acod-title">
                                                    <a
                                                        data-toggle="collapse"
                                                        href="#faq2"
                                                        className="collapsed"
                                                        data-parent="#faq2">
                                                        How do I get a refund?
                                                    </a>{" "}
                                                </h6>
                                            </div>
                                            <div id="faq2" className="acod-body collapse">
                                                <div className="acod-content">
                                                    Graphic design aorem apsum dolor sit amet, adipiscing elit, sed diam
                                                    nibh euismod tincidunt ut laoreet dolore magna aliquam erat
                                                    volutpat.
                                                </div>
                                            </div>
                                        </div>
                                        <div className="panel">
                                            <div className="acod-head">
                                                <h6 className="acod-title">
                                                    <a
                                                        data-toggle="collapse"
                                                        href="#faq3"
                                                        className="collapsed"
                                                        data-parent="#faq3">
                                                        How do I redeem a coupon?{" "}
                                                    </a>{" "}
                                                </h6>
                                            </div>
                                            <div id="faq3" className="acod-body collapse">
                                                <div className="acod-content">
                                                    Developement aorem apsum dolor sit amet, adipiscing elit, sed diam
                                                    nibh euismod tincidunt ut laoreet dolore magna aliquam erat
                                                    volutpat.
                                                </div>
                                            </div>
                                        </div>
                                        <div className="panel">
                                            <div className="acod-head">
                                                <h6 className="acod-title">
                                                    <a
                                                        data-toggle="collapse"
                                                        href="#faq4"
                                                        className="collapsed"
                                                        data-parent="#faq4">
                                                        Why aren't my courses showing in my account?{" "}
                                                    </a>{" "}
                                                </h6>
                                            </div>
                                            <div id="faq4" className="acod-body collapse">
                                                <div className="acod-content">
                                                    Developement aorem apsum dolor sit amet, adipiscing elit, sed diam
                                                    nibh euismod tincidunt ut laoreet dolore magna aliquam erat
                                                    volutpat.
                                                </div>
                                            </div>
                                        </div>
                                        <div className="panel">
                                            <div className="acod-head">
                                                <h6 className="acod-title">
                                                    <a
                                                        data-toggle="collapse"
                                                        href="#faq5"
                                                        className="collapsed"
                                                        data-parent="#faq5">
                                                        Changing account name{" "}
                                                    </a>{" "}
                                                </h6>
                                            </div>
                                            <div id="faq5" className="acod-body collapse">
                                                <div className="acod-content">
                                                    Developement aorem apsum dolor sit amet, adipiscing elit, sed diam
                                                    nibh euismod tincidunt ut laoreet dolore magna aliquam erat
                                                    volutpat.
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="m-b10">
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                                        Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                                        unknown printer took a galley of type and scrambled it.
                                    </p>
                                    <p>
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                                        Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                                        unknown printer took a galley of type and scrambled it.
                                    </p>
                                </div>
                                <div className="col-lg-4 col-md-12">
                                    <div className="bg-primary text-white contact-info-bx">
                                        <h2 className="m-b10 title-head">
                                            Contact <span>Information</span>
                                        </h2>
                                        <p>
                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                        </p>
                                        <div className="widget widget_getintuch">
                                            <ul>
                                                <li>
                                                    <i className="ti-location-pin"></i>75k Newcastle St. Ponte Vedra
                                                    Beach, FL 309382 New York New York
                                                </li>
                                                <li>
                                                    <i className="ti-mobile"></i>0800-123456 (24/7 Support Line)
                                                </li>
                                                <li>
                                                    <i className="ti-email"></i>info@example.com
                                                </li>
                                            </ul>
                                        </div>
                                        <h5 className="m-t0 m-b20">Follow Us</h5>
                                        <ul className="list-inline contact-social-bx">
                                            <li>
                                                <a href="#" className="btn outline radius-xl">
                                                    <i className="fa fa-facebook"></i>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" className="btn outline radius-xl">
                                                    <i className="fa fa-twitter"></i>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" className="btn outline radius-xl">
                                                    <i className="fa fa-linkedin"></i>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" className="btn outline radius-xl">
                                                    <i className="fa fa-google-plus"></i>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
