import { useEffect, useState } from "react";
import s from "./StarsRating.module.css";
import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";

const StarsRating = ({ vote_average }) => {
  const [rating, setRating] = useState([]);
  const [emptyStars, setEmptyStars] = useState([]);

  useEffect(() => {
    if (vote_average) {
      const ratingInner = [];
      const value = Math.ceil(vote_average);

      for (let i = 1; i <= value; i += 1) {
        ratingInner.push(i);
      }
      setRating(ratingInner);

      const emptyStarsInner = [];
      const value2 = 10 - value;
      for (let i = 1; i <= value2; i++) {
        emptyStarsInner.push(i);
      }
      setEmptyStars(emptyStarsInner);
    }
  }, [vote_average]);
  return (
    <>
      {vote_average && (
        <div className={s.details_item_container}>
          <h3 className={s.title_h3}>Rating: </h3>
          <ul className={s.rating_list}>
            {rating.length > 0 &&
              rating.map((item) => (
                <li key={`${item}full`} className={s.rating_item}>
                  <button type="button" className={s.button_star}>
                    <FaStar className={s.star1} />
                  </button>
                </li>
              ))}
            {emptyStars.length > 0 &&
              emptyStars.map((item) => (
                <li key={`${item}empty`} className={s.rating_item}>
                  <button type="button" className={s.button_star}>
                    <CiStar className={s.star2} />
                  </button>
                </li>
              ))}

            <li className={s.star_value}>{Math.ceil(vote_average)}</li>
          </ul>
        </div>
      )}
    </>
  );
};

export default StarsRating;
