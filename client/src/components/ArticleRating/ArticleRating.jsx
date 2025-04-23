import './article-rating.css';
import { Star, StarHalf } from "lucide-react";

const ArticleRating = () => {

    return (
        <div className="rating-container">
            <div className="stars-container">
                { Array.from({ length: 5 }, () => (
                <Star fill="#111" strokeWidth={0} />
                ))}
            </div>
            <div className="stars rating">
                <Star fill="yellow" strokeWidth={0} />
                <Star fill="yellow" strokeWidth={0} />
                <StarHalf fill="yellow" strokeWidth={0} />
            </div>
        </div>
    )
}

export default ArticleRating;