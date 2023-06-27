import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

interface RatingStarsProps {
  rating: number;
}

export default function RatingStars({ rating }: RatingStarsProps) {
  const renderStars = () => {
    const fullStar = (
      <BsStarFill className="mr-1 h-4 w-4 fill-current text-yellow-400" />
    );

    const halfStar = (
      <BsStarHalf className="mr-1 h-4 w-4  fill-current text-yellow-400" />
    );

    const emptyStar = (
      <BsStar className="mr-1 h-4 w-4  text-yellow-400 opacity-75" />
    );

    const stars = [];

    const floorRating = Math.floor(rating);
    const decimalPart = rating - floorRating;

    for (let i = 0; i < 5; i++) {
      if (i < floorRating) {
        stars.push(fullStar);
      } else if (i === floorRating && decimalPart >= 0.25) {
        stars.push(halfStar);
      } else {
        stars.push(emptyStar);
      }
    }

    return stars;
  };

  return <div className="mt-1 flex items-center">{renderStars()}</div>;
}
