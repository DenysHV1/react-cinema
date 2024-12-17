import s from "./FilmDetailsPage.module.css";

//hooks
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router";

//redux
import { showTitlesReducer } from "../../redux/filmDetails/filmDetailsReducers";
import {
  filmDetailsErrorSelector,
  filmDetailsSelector,
  filmIsLoadingSelector,
  moreTitlesSelector,
} from "../../redux/filmDetails/filmDetailsSelectors";
import { searchDetailsAboutFilmByID } from "../../redux/filmDetails/filmDetailsThunks";
import {
  emptyCompany,
  emptyPoster,
  emptyTextInfo,
  imgLink,
} from "../../redux/helpSettings";

//icons
import { FcLike } from "react-icons/fc";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

//components
import AlternativeTitles from "../../components/FilmDetailsComponents/AlternativeTitle/AlternativeTitle";
import FilmVideos from "../../components/FilmDetailsComponents/FilmVideos/FilmVideos";
import Reviews from "../../components/FilmDetailsComponents/Reviews/Reviews";
import BackLink from "../../components/BackLink/BackLink";
import StarsRating from "../../components/FilmDetailsComponents/StarsRating/StarsRating";
import Loader from "../../components/Loader/Loader";

const FilmDetails = () => {
  //*MAIN ID
  const { filmID } = useParams();

  //dispatch
  const dispatch = useDispatch();

  //back link
  const location = useLocation();
  const backLink = useRef(location.state || location.pathname || "/");

  //selectors
  const film = useSelector(filmDetailsSelector);
  const showTitles = useSelector(moreTitlesSelector);
  const isLoading = useSelector(filmIsLoadingSelector);
  const isError = useSelector(filmDetailsErrorSelector);
  //* FILM DATA

  //*EFFECTS
  useEffect(() => {
    dispatch(searchDetailsAboutFilmByID(filmID));
  }, [dispatch, filmID]);

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
  } = film;

  const countries = production_countries?.length
    ? production_countries
    : origin_country;

  return (
    <>
      {isLoading && <Loader />}
      {!isError && (
        <section className={s.page_film_info} id={id}>
          <div className={s.title_link_container}>
            <BackLink link={backLink.current} />
            <div className={s.titles_container}>
              {title && (
                <h1 className={s.title}>{title ? title : original_title}</h1>
              )}
              {showTitles ? (
                <button
                  type="button"
                  onClick={() => dispatch(showTitlesReducer())}
                >
                  <IoIosArrowBack className={s.showTitles} />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => dispatch(showTitlesReducer())}
                >
                  <IoIosArrowForward className={s.showTitles} />
                </button>
              )}
              {showTitles && <AlternativeTitles filmID={filmID} />}
            </div>
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
                    <li
                      key={item.iso_3166_1 || item}
                      className={s.country_text}
                    >
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
                      status === "Released"
                        ? s.status_text_rel
                        : s.status_text_no
                    }
                  >
                    {status}
                  </p>
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
      )}
      <FilmVideos filmID={filmID} />
      <Reviews filmID={filmID} />
    </>
  );
};

export default FilmDetails;
