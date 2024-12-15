import s from "./FilmDetailsPage.module.css";

//hooks
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router";

//redux
import { filmDetailsSelector } from "../../redux/selectors";
import { searchDetailsAboutFilmByID } from "../../redux/thunks/thinkFilmDetails";
import {
  emptyCompany,
  emptyPoster,
  emptyTextInfo,
  imgLink,
} from "../../redux/helpSettings";

//icons
import { CiStar } from "react-icons/ci";
import { FcLike } from "react-icons/fc";

const FilmDetails = () => {
  const [rating, setRating] = useState([]);
  const { filmID } = useParams();

  const filmData = useSelector(filmDetailsSelector);
  const dispatch = useDispatch();
  const location = useLocation();
  const backLink = useRef(location.state || "/");

  useEffect(() => {
    dispatch(searchDetailsAboutFilmByID(filmID));
  }, [dispatch, filmID]);

  console.log(filmData);

  const {
    budget,
    genres,
    id,
    origin_country,
    original_title,
    overview,
    popularity,
    poster_path,
    production_companies,
    production_countries,
    release_date,
    runtime,
    status,
    tagline,
    title,
    vote_average,
    adult,
  } = filmData;

  useEffect(() => {
    //stars
    if (vote_average) {
      const ratingInner = [];
      const value = Math.ceil(vote_average);
      for (let i = 1; i <= value; i += 1) {
        ratingInner.push(i);
      }
      setRating(ratingInner);
    }
  }, [vote_average]);

  return (
    <>
      <section className={s.page_film_info} id={id}>
        <Link to={backLink.current}>Go back</Link>
        <h1 className={s.title}>{original_title ? original_title : title}</h1>
        <div className={s.top_info}>
          <div className={s.poster_container}>
            <img
              src={poster_path ? `${imgLink}${poster_path}` : emptyPoster}
              alt={original_title ? original_title : title}
            />
            {popularity && (
              <div className={s.popularity_container}>
                <FcLike className={s.popularity_like} />
                <p className={s.popularity_value}>{Math.ceil(popularity)}</p>
              </div>
            )}
          </div>
          <div className={s.top_film_details}>
            {vote_average && (
              <div className={s.rating_container}>
                <p className={s.rating_title}>Rating: </p>
                {rating.length > 0 &&
                  rating.map((item) => (
                    <button key={item} type="button" className={s.button_star}>
                      <CiStar className={s.star} />
                    </button>
                  ))}

                <p className={s.star_value}>{vote_average}</p>
              </div>
            )}
            {tagline && (
              <div className={s.slogan_container}>
                <p className={s.slogan_title}>Slogan: </p>
                <p className={s.slogan_text}>{tagline}</p>
              </div>
            )}
            {release_date && (
              <div className={s.release_container}>
                <p className={s.release_title}>Release date: </p>
                <p className={s.release_text}>{release_date}</p>
              </div>
            )}
            {production_countries?.length > 0 && production_countries ? (
              <div className={s.country_container}>
                {production_countries?.length > 1 ? (
                  <p className={s.country_title}>Countries: </p>
                ) : (
                  <p className={s.country_title}>Country: </p>
                )}
                <ul className={s.country_list}>
                  {production_countries?.map(({ iso_3166_1, name }) => (
                    <li key={iso_3166_1} className={s.country_text}>
                      {name}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className={s.country_container}>
                {origin_country?.length > 1 ? (
                  <p className={s.country_title}>Countries: </p>
                ) : (
                  <p className={s.country_title}>Country: </p>
                )}
                <ul className={s.country_list}>
                  {origin_country?.map((item) => (
                    <li key={item} className={s.country_text}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {budget && (
              <div className={s.budget_container}>
                <p className={s.budget_title}>Budget: </p>
                <p className={s.budget_text}>
                  {budget}
                  <span>&#36;</span>
                </p>
              </div>
            )}
            {genres?.length > 0 && (
              <div className={s.genre_container}>
                <p className={s.genre_title}>Genre: </p>
                <ul className={s.genre_list}>
                  {genres?.map(({ id, name }) => (
                    <li key={id}>{name}</li>
                  ))}
                </ul>
              </div>
            )}
            {adult && (
              <div className={s.ageLimit_container}>
                <p className={s.ageLimit_title}>Age limit: </p>
                <p className={s.ageLimit_text}>18+</p>
              </div>
            )}
            {runtime && (
              <div className={s.runtime_container}>
                <p className={s.runtime_container}>Runtime: </p>
                <p className={s.runtime_text}>{`${runtime} min.`}</p>
              </div>
            )}
            {status && (
              <div className={s.status_container}>
                <p className={s.status_title}>Status: </p>
                <p className={s.status_text}>{status}</p>
              </div>
            )}
          </div>
        </div>
        {production_companies?.length > 0 && production_companies && (
          <div className={s.companies_container}>
            <ul className={s.companies_list}>
              {production_companies?.map(
                ({ id, logo_path, name, origin_country }) => (
                  <li key={id} className={s.companies_item}>
                    <div className={s.companies_img_container}>
                      <img
                        src={
                          logo_path ? `${imgLink}${logo_path}` : emptyCompany
                        }
                        alt={name ? name : origin_country}
                      />
                    </div>
                    <p className={s.companies_name}>
                      {name ? name : "Hidden company"}
                    </p>
                  </li>
                )
              )}
            </ul>
          </div>
        )}
        <div className={s.overview_container}>
          <h2 className={s.overview_title}>Description</h2>
          <p className={s.overview_text}>
            {overview ? overview : emptyTextInfo}
          </p>
        </div>
      </section>
    </>
  );
};

export default FilmDetails;
