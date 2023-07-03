import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

interface RatingStarsProps {
  rating: number;
}

export default function RatingStars({ rating }: RatingStarsProps) {
  const renderStars = () => {
    const fullStar = (
      <BsStarFill
        key="full-star"
        className="mr-1 h-4 w-4 fill-current text-yellow-400"
      />
    );

    const halfStar = (
      <BsStarHalf
        key="half-star"
        className="mr-1 h-4 w-4 fill-current text-yellow-400"
      />
    );

    const emptyStar = (
      <BsStar
        key="empty-star"
        className="mr-1 h-4 w-4 text-yellow-400 opacity-75"
      />
    );

    const stars = [];

    const floorRating = Math.floor(rating);
    const decimalPart = rating - floorRating;

    for (let i = 0; i < 5; i++) {
      if (i < floorRating) {
        stars.push(<span key={`star-${i}`}>{fullStar}</span>);
      } else if (i === floorRating && decimalPart >= 0.25) {
        stars.push(<span key={`star-${i}`}>{halfStar}</span>);
      } else {
        stars.push(<span key={`star-${i}`}>{emptyStar}</span>);
      }
    }

    return stars;
  };

  return <span className="flex flex-row items-center">{renderStars()}</span>;
}
