import s from "./Reviews.module.css";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";

//hooks
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link, useLocation } from "react-router";

//redux
import { reviewsThunk } from "../../../redux/filmDetails/filmDetailsThunks";
import {
  filmIsLoadingSelector,
  reviewsSelector,
} from "../../../redux/filmDetails/filmDetailsSelectors";
import { emptyUserImg, imgLink } from "../../../redux/helpSettings";

import Loader from "../../Loader/Loader";

const Reviews = ({ filmID }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const reviews = useSelector(reviewsSelector);
  const isLoading = useSelector(filmIsLoadingSelector);

  useEffect(() => {
    dispatch(reviewsThunk(filmID));
  }, [dispatch, filmID]);

  console.log(reviews);

  return (
    <>
      {isLoading && <Loader />}
      {reviews?.length > 0 && (
        <section>
          <h2 className={s.title}>Reviews</h2>
          <ul className={s.reviews_list}>
            {reviews?.length > 0 &&
              reviews.map(
                ({ author, author_details, content, created_at, id }) => (
                  <li key={id} className={s.reviews_item}>
                    <div className={s.top_info_container}>
                      <Link
                        to={`/reviews/${id}`}
                        state={location}
                        className={s.img_container}
                      >
                        <img
                          src={
                            author_details.avatar_path
                              ? `${imgLink}${author_details.avatar_path}`
                              : emptyUserImg
                          }
                          alt={author_details.name || author}
                          className={s.img}
                        />
                      </Link>
                    </div>
                    <div className={s.bottom_info}>
                      <p className={s.name}>{author_details.name || author}</p>
                      <p className={s.data}>
                        {created_at ? created_at.slice(0, 10) : "2024.12.17"}
                      </p>

                      <p className={s.bottom_info}>{content}</p>
                      <div className={s.rating_container}>
                        <button type="button" className={s.rating}>
                          <AiOutlineLike className={s.like} />
                          <p>{author_details.rating || "0"}</p>
                        </button>
                        <button type="button" className={s.rating}>
                          <AiOutlineDislike className={s.like} />
                        </button>
                      </div>
                    </div>
                  </li>
                )
              )}
          </ul>
        </section>
      )}
    </>
  );
};

export default Reviews;
