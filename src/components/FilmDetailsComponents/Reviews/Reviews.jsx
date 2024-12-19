import s from "./Reviews.module.css";

//hooks
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link, useLocation } from "react-router";

//redux
import { reviewsThunk } from "../../../redux/filmDetails/filmDetailsThunks";
import { reviewsSelector } from "../../../redux/filmDetails/filmDetailsSelectors";
import { emptyUserImg, imgLink } from "../../../redux/helpSettings";

const Reviews = ({ filmID }) => {
  const dispatch = useDispatch();
  const reviews = useSelector(reviewsSelector);
  const location = useLocation();

  useEffect(() => {
    dispatch(reviewsThunk(filmID));
  }, [dispatch, filmID]);

  return (
    <>
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
                          alt={
                            author_details.name ? author_details.name : author
                          }
                          className={s.img}
                        />
                        <p className={s.rating}>
                          Rating:
                          <span>
                            {author_details.rating
                              ? author_details.rating
                              : "0"}
                          </span>
                        </p>
                      </Link>
                    </div>
                    <div className={s.name_data}>
                      <p className={s.name}>
                        {author_details.name ? author_details.name : author}
                      </p>
                      <p className={s.data}>
                        {created_at ? created_at.slice(0, 10) : "2024.12.17"}
                      </p>
                    </div>
                    <p className={s.bottom_info}>{content}</p>
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
