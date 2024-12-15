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
import { FcLike } from "react-icons/fc";
import { TbArrowBigLeftLines } from "react-icons/tb";
import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";

const FilmDetails = () => {
  const [rating, setRating] = useState([]);
  const [emptyStars, setEmptyStars] = useState([]);
  const { filmID } = useParams();

  const filmData = useSelector(filmDetailsSelector);
  const dispatch = useDispatch();
  const location = useLocation();
  const backLink = useRef(location.state || "/");

  const prevFilmID = useRef(null);

  useEffect(() => {
    if (filmID !== prevFilmID.current) {
      prevFilmID.current = filmID;
      dispatch(searchDetailsAboutFilmByID(filmID));
    }
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
      <section className={s.page_film_info} id={id}>
        <div className={s.title_link_container}>
          <Link to={backLink.current} className={s.back_link}>
            <TbArrowBigLeftLines className={s.back_item} />{" "}
          </Link>
          <h1 className={s.title}>{title ? title : original_title}</h1>
        </div>

        <div className={s.top_info}>
          <div className={s.poster_container}>
            <img
              src={poster_path ? `${imgLink}${poster_path}` : emptyPoster}
              alt={title ? title : original_title}
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
            {production_countries?.length > 0 && production_countries ? (
              <div className={s.details_item_container}>
                {production_countries?.length > 1 ? (
                  <h3 className={s.title_h3}>Countries: </h3>
                ) : (
                  <h3 className={s.title_h3}>Country: </h3>
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
              <div className={s.details_item_container}>
                {origin_country?.length > 1 ? (
                  <h3 className={s.title_h3}>Countries: </h3>
                ) : (
                  <h3 className={s.title_h3}>Country: </h3>
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
                <p className={status === "Released" ? s.status_text_rel : s.status_text_no}>{status}</p>
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
