import { Review } from "../../hooks/useUser";

interface CourseCardProps {
    id: number;
    title: string;
    imagePath: string;
    reviews?: Review[];
    category: string;
    price: number;
}

export default function CourseCard({ id, title, imagePath, reviews = [], category, price }: CourseCardProps) {
    return (
        <div className="item">
            <div className="cours-bx">
                <div className="action-box" style={{ height: "155px" }}>
                    <img src={imagePath} alt="" />
                    <a href={`/courses/${id}`} className="btn">
                        Read More
                    </a>
                </div>
                <div className="info-bx text-center" style={{ height: "110px" }}>
                    <h5>
                        <a href={`/courses/${id}`}>{title}</a>
                    </h5>
                    <span>{category}</span>
                </div>
                <div className="cours-more-info">
                    <div className="review">
                        <span>{reviews.length || 0} Review</span>
                        <ul className="cours-star">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <li
                                    key={star}
                                    className={
                                        reviews.length &&
                                        reviews.length > 0 &&
                                        star <= reviews.reduce((sum, review) => sum + review.star, 0) / reviews.length
                                            ? "active"
                                            : ""
                                    }>
                                    <i className="fa fa-star"></i>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="price">
                        <h5>${price}</h5>
                    </div>
                </div>
            </div>
        </div>
    );
}
