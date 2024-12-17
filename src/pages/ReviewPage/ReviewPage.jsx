import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router";
import { reviewsPageSelector } from "../../redux/reviewsPage/selectors";
import { useEffect, useRef } from "react";
import { reviewsPageThunk } from "../../redux/reviewsPage/thunk";
import BackLink from "../../components/BackLink/BackLink";
import s from "./ReviewsPage.module.css";
import { emptyUserImg, imgLink } from "../../redux/helpSettings";

const ReviewPage = () => {
  const { reviewID } = useParams();
  const reviews = useSelector(reviewsPageSelector);
  const dispatch = useDispatch();
  const location = useLocation();
  const backLink = useRef(location?.state || "/");

  useEffect(() => {
    dispatch(reviewsPageThunk(reviewID));
  }, [dispatch, reviewID]);

  const { id, author_details, created_at, content, author, media_title, url } =
    reviews;
  return (
    <section>
      <div className={s.goBack_container}>
        <BackLink link={backLink.current} />
        <p>
          Go back to <span>{media_title}</span>
        </p>
      </div>

      <li key={id} className={s.reviews_item}>
        <div className={s.top_info_container}>
          <div className={s.img_container}>
            <img
              src={
                author_details?.avatar_path
                  ? `${imgLink}${author_details.avatar_path}`
                  : emptyUserImg
              }
              alt={author_details?.name ? author_details?.name : author}
              className={s.img}
            />
            <p className={s.rating}>
              Rating:
              <span>
                {author_details?.rating ? author_details?.rating : "0"}
              </span>
            </p>
          </div>
        </div>
        <div className={s.name_data}>
          <p className={s.name}>
            {author_details?.name ? author_details?.name : author}
          </p>
          <p className={s.data}>
            {created_at ? created_at.slice(0, 10) : "2024.12.17"}
          </p>
        </div>
        <p className={s.bottom_info}>{content}</p>
        <a className={s.originalLink} href={url} target="_blank">
          Original website
        </a>
      </li>
    </section>
  );
};

export default ReviewPage;
