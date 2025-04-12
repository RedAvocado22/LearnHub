import { Review } from "../../hooks/useUser";

interface ReviewOverviewProps {
    reviews: Review[];
}

export default function ReviewOverview({ reviews }: ReviewOverviewProps) {
    return (
        <div className="review-bx">
            <div className="all-review">
                <h2 className="rating-type">
                    {reviews.length > 0
                        ? (reviews.reduce((sum, review) => sum + review.star, 0) / reviews.length).toFixed(1)
                        : 0}
                </h2>
                <ul className="cours-star">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <li
                            key={star}
                            className={
                                reviews.length > 0 &&
                                star <= reviews.reduce((sum, review) => sum + review.star, 0) / reviews.length
                                    ? "active"
                                    : ""
                            }>
                            <i className="fa fa-star"></i>
                        </li>
                    ))}
                </ul>
                <span>{reviews.length} Rating</span>
            </div>
            <div className="review-bar">
                <div className="bar-bx">
                    <div className="side">
                        <div>5 star</div>
                    </div>
                    <div className="middle">
                        <div className="bar-container">
                            <div
                                className="bar-5"
                                style={{
                                    width: `${
                                        reviews.length > 0
                                            ? (reviews.filter((review) => review.star === 5).length / reviews.length) *
                                              100
                                            : 0
                                    }%`
                                }}></div>
                        </div>
                    </div>
                    <div className="side right">
                        <div>{reviews.filter((review) => review.star === 5).length}</div>
                    </div>
                </div>
                <div className="bar-bx">
                    <div className="side">
                        <div>4 star</div>
                    </div>
                    <div className="middle">
                        <div className="bar-container">
                            <div
                                className="bar-5"
                                style={{
                                    width: `${
                                        reviews.length > 0
                                            ? (reviews.filter((review) => review.star === 4).length / reviews.length) *
                                              100
                                            : 0
                                    }%`
                                }}></div>
                        </div>
                    </div>
                    <div className="side right">
                        <div>{reviews.filter((review) => review.star === 4).length}</div>
                    </div>
                </div>
                <div className="bar-bx">
                    <div className="side">
                        <div>3 star</div>
                    </div>
                    <div className="middle">
                        <div className="bar-container">
                            <div
                                className="bar-5"
                                style={{
                                    width: `${
                                        reviews.length > 0
                                            ? (reviews.filter((review) => review.star === 3).length / reviews.length) *
                                              100
                                            : 0
                                    }%`
                                }}></div>
                        </div>
                    </div>
                    <div className="side right">
                        <div>{reviews.filter((review) => review.star === 3).length}</div>
                    </div>
                </div>
                <div className="bar-bx">
                    <div className="side">
                        <div>2 star</div>
                    </div>
                    <div className="middle">
                        <div className="bar-container">
                            <div
                                className="bar-5"
                                style={{
                                    width: `${
                                        reviews.length > 0
                                            ? (reviews.filter((review) => review.star === 2).length / reviews.length) *
                                              100
                                            : 0
                                    }%`
                                }}></div>
                        </div>
                    </div>
                    <div className="side right">
                        <div>{reviews.filter((review) => review.star === 2).length}</div>
                    </div>
                </div>
                <div className="bar-bx">
                    <div className="side">
                        <div>1 star</div>
                    </div>
                    <div className="middle">
                        <div className="bar-container">
                            <div
                                className="bar-5"
                                style={{
                                    width: `${
                                        reviews.length > 0
                                            ? (reviews.filter((review) => review.star === 1).length / reviews.length) *
                                              100
                                            : 0
                                    }%`
                                }}></div>
                        </div>
                    </div>
                    <div className="side right">
                        <div>{reviews.filter((review) => review.star === 1).length}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
