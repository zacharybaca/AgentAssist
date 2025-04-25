import './article-rating.css';
import { useState } from 'react';
import { Star, StarHalf } from "lucide-react";

const ArticleRating = () => {
    const [hasVoted, setHasVoted] = useState(false);
    const [totalRatings, setTotalRatings] = useState(0);
    const [userStarRatingArray, setUserStarRatingArray] = useState([]);
    const [averageStarRatingArray, setAverageStarRatingArray] = useState([]);
    const [numberOfRatings, setNumberOfRatings] = useState(0);
    const [rating, setRating] = useState(0);

    const handleStarClick = (selectedRating) => {
        if (hasVoted) return; 
      
        setRating(selectedRating);
        setUserStarRatingArray(createRatingArray(selectedRating));
        setTotalRatings(prevTotal => {
          const newTotal = prevTotal + selectedRating;
          const newCount = numberOfRatings + 1;
          const avg = Math.round(newTotal / newCount);
          setAverageStarRatingArray(createRatingArray(avg));
          return newTotal;
        });
        setNumberOfRatings(prev => prev + 1);
        setHasVoted(true); 
      };       
      
    const createRatingArray = (userRating) => Array.from({ length: userRating }, (_, i) => i + 1);

      return (
        <div className="rating-container">
          <p>
            {[1, 2, 3, 4, 5].map((index) => (
                <span
                key={index}
                onClick={() => !hasVoted && handleStarClick(index)}
                style={{ cursor: hasVoted ? 'default' : 'pointer' }}
                >
                {index <= rating ? (
                    <Star fill="gold" strokeWidth={0} />
                ) : (
                    <Star strokeWidth={1} />
                )}
                </span>
            ))}
          </p>
          <p>Rating: {userStarRatingArray.map((index) => (
            <span
                key={index}
            >
                <Star fill="gold" />
            </span>
          ))}</p>
          <p>Average Rating: {averageStarRatingArray.map((index) => (
            <span
                key={index}
            >
                <Star fill="gold" />
            </span>
          ))}</p>
          <p>Total Ratings: {totalRatings}</p>
        </div>
      );
}

export default ArticleRating;
