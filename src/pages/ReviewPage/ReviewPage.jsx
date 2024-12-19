import s from "./ReviewsPage.module.css";

//hooks
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";

//redux
import { reviewsPageThunk } from "../../redux/reviewsPage/thunk";
import {
  reviewsErrorSelector,
  reviewsLoadingSelector,
  reviewsPageSelector,
} from "../../redux/reviewsPage/selectors";
import { emptyUserImg, imgLink } from "../../redux/helpSettings";

//components
import Error from "../../components/Error/Error";
import { TbArrowBigLeftLines } from "react-icons/tb";
import Loader from "../../components/Loader/Loader";

const ReviewPage = () => {
  const { reviewID } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const reviews = useSelector(reviewsPageSelector);
  const error = useSelector(reviewsErrorSelector);
  const isLoading = useSelector(reviewsLoadingSelector);

  useEffect(() => {
    dispatch(reviewsPageThunk(reviewID));
  }, [dispatch, reviewID]);

  const { id, author_details, created_at, content, author, media_title, url } =
    reviews;

  return (
    <>
      {isLoading && <Loader />}
      {!error ? (
        <section>
          <div className={s.goBack_container}>
            <button className="back_link" onClick={() => navigate(-1)}>
              <TbArrowBigLeftLines className="back_item" />
            </button>
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
                  alt={author_details?.name || author}
                  className={s.img}
                />
                <p className={s.rating}>
                  Rating:
                  <span>{author_details?.rating || "0"}</span>
                </p>
              </div>
            </div>
            <div className={s.name_data}>
              <p className={s.name}>{author_details?.name || author}</p>
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
      ) : (
        <Error />
      )}
    </>
  );
};

export default ReviewPage;
