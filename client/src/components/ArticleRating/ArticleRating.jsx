import './article-rating.css';
import { useState } from 'react';
import { Star, StarHalf } from "lucide-react";

const ArticleRating = () => {
    
    const [rating, setRating] = useState(0);

    const handleStarClick = (selectedRating) => {
        setRating(selectedRating);
      };

      return (
        <div className="rating-container">
          {[1, 2, 3, 4, 5].map((index) => (
            <span
              key={index}
              onClick={() => handleStarClick(index)}
              style={{ cursor: 'pointer' }}
            >
              {index <= rating ? (
                <Star fill="gold" strokeWidth={0} />
              ) : (
                <Star strokeWidth={1} />
              )}
            </span>
          ))}
          <p>Rating: {rating}</p>
        </div>
      );
}

export default ArticleRating;
