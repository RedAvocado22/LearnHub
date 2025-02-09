interface CourseCardProps {
    id: number;
    title: string;
    imagePath: string;
    category: string;
    price: number;
}

export default function CourseCard({ id, title, imagePath, category, price }: CourseCardProps) {
    return (
        <div className="item">
            <div className="cours-bx">
                <div className="action-box">
                    <img src={imagePath} alt="" />
                    <a href={`/courses/${id}`} className="btn">
                        Read More
                    </a>
                </div>
                <div className="info-bx text-center">
                    <h5>
                        <a href={`/courses/${id}`}>{title}</a>
                    </h5>
                    <span>{category}</span>
                </div>
                <div className="cours-more-info">
                    <div className="review">
                        <span>3 Review</span>
                        <ul className="cours-star">
                            <li className="active">
                                <i className="fa fa-star"></i>
                            </li>
                            <li className="active">
                                <i className="fa fa-star"></i>
                            </li>
                            <li className="active">
                                <i className="fa fa-star"></i>
                            </li>
                            <li>
                                <i className="fa fa-star"></i>
                            </li>
                            <li>
                                <i className="fa fa-star"></i>
                            </li>
                        </ul>
                    </div>
                    <div className="price">
                        <del>$190</del>
                        <h5>${price}</h5>
                    </div>
                </div>
            </div>
        </div>
    );
}
