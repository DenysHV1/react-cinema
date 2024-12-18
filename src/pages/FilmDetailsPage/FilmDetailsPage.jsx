import s from "./FilmDetailsPage.module.css";

//hooks
import { Suspense, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet, useLocation, useParams } from "react-router";

//redux
import { showTitlesReducer } from "../../redux/filmDetails/filmDetailsReducers";
import {
  filmDetailsErrorSelector,
  filmDetailsSelector,
  filmIsLoadingSelector,
  moreTitlesSelector,
  recommendationsSelector,
  similarSelector,
} from "../../redux/filmDetails/filmDetailsSelectors";
import {
  getRecommendationsThunk,
  getSimilarThunk,
  // getTestThunk,
  // getTestThunk,
  searchDetailsAboutFilmByID,
} from "../../redux/filmDetails/filmDetailsThunks";
import { emptyPoster, imgLink } from "../../redux/helpSettings";

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
import Companies from "../../components/FilmDetailsComponents/Companies/Companies";
import Description from "../../components/FilmDetailsComponents/Description/Description";
import FilmSlider from "../../components/FilmSlider/FilmSlider";
// import Gallery from "../../components/FilmDetailsComponents/Gallery/Gallery";

const FilmDetails = () => {
  //*MAIN ID
  const { filmID } = useParams();

  //dispatch
  const dispatch = useDispatch();

  //back link
  const location = useLocation();
  const backLink = useRef(location.state || "/");

  //selectors
  const film = useSelector(filmDetailsSelector);
  const showTitles = useSelector(moreTitlesSelector);
  const isLoading = useSelector(filmIsLoadingSelector);
  const isError = useSelector(filmDetailsErrorSelector);
  const recommendations = useSelector(recommendationsSelector);
  const similar = useSelector(similarSelector);
  //* FILM DATA

  //*EFFECTS
  useEffect(() => {
    dispatch(searchDetailsAboutFilmByID(filmID));
    dispatch(getRecommendationsThunk(filmID));
    dispatch(getSimilarThunk(filmID));
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

  const setActive = ({ isActive }) =>
    isActive ? s.activeLink : s.noActiveLink;
  console.log(backLink.current);

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
          <Companies production_companies={production_companies} />
          {/* <Gallery/> */}
          <Description overview={overview} />
        </section>
      )}
      <FilmVideos filmID={filmID} />
      <section>
        <ul className={s.moreInfo}>
          <li className={s.moreInfo_item}>
            <NavLink to={"keywords"} className={setActive}>
              Keywords
            </NavLink>
          </li>
          <li className={s.moreInfo_item}>
            <NavLink to={"changes"} className={setActive}>
              Last Changes
            </NavLink>
          </li>
          <li className={s.moreInfo_item}>
            <NavLink to={"cast"} className={setActive}>
              Cast
            </NavLink>
          </li>
        </ul>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </section>
      <section>
        <h2 className={s.title}>Recommendations</h2>
        <FilmSlider list={recommendations} />
      </section>
      <section>
        <h2 className={s.title}>Similar</h2>
        <FilmSlider list={similar} />
      </section>

      <Reviews filmID={filmID} />
    </>
  );
};

export default FilmDetails;
