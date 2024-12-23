import { FcLike } from "react-icons/fc";
import { emptyPoster, imgLink } from "../../../redux/helpSettings";
import s from "./InfoColumn.module.css";
import StarsRating from "../StarsRating/StarsRating";
import { useDispatch, useSelector } from "react-redux";
import { filmDetailsSelector } from "../../../redux/filmDetails/filmDetailsSelectors";
import { addFilm } from "../../../redux/User/userReducer";
import { HiPlus } from "react-icons/hi";
import iziToast from "izitoast";

import { selectSessionIdAuth } from "../../../redux/auth/authSelectors";

const InfoColumn = () => {
  const film = useSelector(filmDetailsSelector);
  const dispatch = useDispatch();
  const sessionId = useSelector(selectSessionIdAuth);

  const {
    id,
    budget,
    genres,
    original_title,
    popularity,
    poster_path,
    release_date,
    runtime,
    status,
    tagline,
    title,
    vote_average,
    adult,
    production_countries,
    origin_country,
  } = film;

  const countries = production_countries?.length
    ? production_countries
    : origin_country;

  const handleAddFilm = () => {
    iziToast.success({
      title: "Success!",
      message: `The movie "${title}" has been successfully added to your list.`,
      position: "topRight",
      timeout: 3000,
      transitionIn: "fadeIn",
      transitionOut: "fadeOut",
      color: '#03a703'
    });
    dispatch(addFilm({ id, title, poster_path, vote_average, popularity }));
  };

  return (
    <div className={s.top_info}>
      <div className={s.poster_container}>
        <img
          src={poster_path ? `${imgLink}${poster_path}` : emptyPoster}
          alt={title ? title : original_title}
        />
        {sessionId && (
          <button onClick={handleAddFilm} className={s.addFilm}>
            <HiPlus className={s.addFilm_icon}/>
          </button>
        )}
        {popularity && (
          <div className={s.popularity_container}>
            <FcLike className={s.popularity_like} />
            <p className={s.popularity_value}>{Math.ceil(popularity)}</p>
          </div>
        )}
      </div>
      <div className={s.top_film_details}>
        <StarsRating vote_average={vote_average} />
        {tagline && (
          <div className={s.details_item_container}>
            <h3 className={s.title_h3}>Slogan: </h3>
            <p className={s.slogan_text}>{tagline}</p>
          </div>
        )}
        {release_date && (
          <div className={s.details_item_container}>
            <h3 className={s.title_h3}>Release date: </h3>
            <p className={s.release_text}>{release_date}</p>
          </div>
        )}
        <div className={s.details_item_container}>
          <h3 className={s.title_h3}>
            {countries?.length > 1 ? "Countries:" : "Country:"}
          </h3>
          <ul className={s.country_list}>
            {countries?.map((item) => (
              <li key={item.iso_3166_1 || item} className={s.country_text}>
                {item.name || item}
              </li>
            ))}
          </ul>
        </div>
        {budget && (
          <div className={s.details_item_container}>
            <h3 className={s.title_h3}>Budget: </h3>
            <p className={s.budget_text}>
              {budget}
              <span>&#36;</span>
            </p>
          </div>
        )}
        {genres?.length > 0 && (
          <div className={s.details_item_container}>
            <h3 className={s.title_h3}>Genre: </h3>
            <ul className={s.genre_list}>
              {genres?.map(({ id, name }) => (
                <li key={id}>{name}</li>
              ))}
            </ul>
          </div>
        )}
        {adult && (
          <div className={s.details_item_container}>
            <h3 className={s.title_h3}>Age limit: </h3>
            <p className={s.ageLimit_text}>18+</p>
          </div>
        )}
        {runtime && (
          <div className={s.details_item_container}>
            <h3 className={s.title_h3}>Runtime: </h3>
            <p className={s.runtime_text}>{`${runtime} min.`}</p>
          </div>
        )}
        {status && (
          <div className={s.details_item_container}>
            <h3 className={s.title_h3}>Status: </h3>
            <p
              className={
                status === "Released" ? s.status_text_rel : s.status_text_no
              }
            >
              {status}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoColumn;
