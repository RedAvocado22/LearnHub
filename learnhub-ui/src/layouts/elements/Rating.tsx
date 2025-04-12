import { useState } from "react";
import { Star } from "lucide-react";
import { API } from "../../api";
import { toast } from "react-toastify";
import { useUser } from "../../hooks/useUser";

interface CourseRatingProps {
    courseId: number;
    onRatingSubmit?: () => void;
}

export default function CourseRating({ courseId, onRatingSubmit }: CourseRatingProps) {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [comment, setComment] = useState(""); // Added comment state
    const { user, refreshUser } = useUser();

    const handleRatingSubmit = async () => {
        if (!user) {
            toast.error("Please log in to submit a rating");
            return;
        }

        if (rating === 0) {
            toast.error("Please select a rating");
            return;
        }

        try {
            const response = await API.post(`courses/${courseId}/reviews`, {
                id: courseId,
                star: rating,
                comment: comment // Fixed typo from 'commnet' to 'comment'
            });
            if (response.data) {
                toast.success("Rating submitted successfully!");
                refreshUser();
            }
        } catch (error) {
            console.error("Error submitting rating:", error);
            toast.error("Failed to submit rating. Please try again.");
        }
    };

    return (
        <div className="edit-profile p-4 bg-gray-100">
            <h5>Rate the course</h5>
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">Star</label>
                <div className="col-sm-7">
                    {[...Array(5)].map((_, index) => {
                        index += 1;
                        return (
                            <button
                                type="button"
                                key={index}
                                style={{ backgroundColor: "transparent", border: "none" }}
                                className={`transition-colors duration-200 ${
                                    index <= (hover || rating) ? "text-yellow-400" : "text-gray-300"
                                }`}
                                onClick={() => setRating(index)}
                                onMouseEnter={() => setHover(index)}
                                onMouseLeave={() => setHover(rating)}>
                                <Star
                                    className="w-8 h-8 cursor-pointer"
                                    fill={index <= (hover || rating) ? "#facc15" : "none"}
                                />
                            </button>
                        );
                    })}
                </div>
            </div>
            <div className="form-group row">
                <label className="col-2 col-form-label">Comment</label>
                <div className="col-10">
                    <textarea
                        name="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="form-control"
                        placeholder="Leave a comment about the course"
                    />
                </div>
            </div>
            <div className="form-group row">
                <div className="col-sm-7">
                    <button onClick={handleRatingSubmit} className="btn mr-2" disabled={rating === 0}>
                        Submit Rating
                    </button>
                </div>
            </div>
        </div>
    );
}
