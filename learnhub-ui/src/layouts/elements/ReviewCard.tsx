import { formatDistanceToNow } from "date-fns";

interface ReviewCardProps {
    username: string;
    submittedAt: Date;
    rating: number;
    comment: string;
}

export default function ReviewCard({ username, submittedAt, rating, comment }: ReviewCardProps) {
    const clamp = Math.min(Math.max(rating, 1), 5);
    return (
        <div className="card mt-3">
            <div className="card-body">
                <div className="d-flex justify-content-between">
                    <h5 className="mb-1">{username}</h5>
                    <small className="text-muted">{formatDistanceToNow(submittedAt, { addSuffix: true })}</small>
                </div>
                <div className="mb-2">
                    <span className="text-warning">{"★".repeat(clamp) + "☆".repeat(5 - clamp)}</span>
                </div>
                <p className="mb-0">{comment}</p>
            </div>
        </div>
    );
}
