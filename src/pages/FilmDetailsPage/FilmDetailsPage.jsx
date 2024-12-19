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
  recommendationsSelector,
  similarSelector,
} from "../../redux/filmDetails/filmDetailsSelectors";
import {
  getRecommendationsThunk,
  getSimilarThunk,
  searchDetailsAboutFilmByID,
} from "../../redux/filmDetails/filmDetailsThunks";
import { closeMenu } from "../../redux/filmsPage/reducers";

//icons
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

//components
import AlternativeTitles from "../../components/FilmDetailsComponents/AlternativeTitle/AlternativeTitle";
import FilmVideos from "../../components/FilmDetailsComponents/FilmVideos/FilmVideos";
import Reviews from "../../components/FilmDetailsComponents/Reviews/Reviews";
import BackLink from "../../components/BackLink/BackLink";
import Loader from "../../components/Loader/Loader";
import Companies from "../../components/FilmDetailsComponents/Companies/Companies";
import Description from "../../components/FilmDetailsComponents/Description/Description";
import FilmSlider from "../../components/FilmSlider/FilmSlider";
import Error from "../../components/Error/Error";
import BottomMenuNav from "../../components/FilmDetailsComponents/BottomMenuNav/BottomMenuNav";
import InfoColumn from "../../components/FilmDetailsComponents/InfoColumn/InfoColumn";

const FilmDetails = () => {
  //*MAIN ID
  const { filmID } = useParams();
  const dispatch = useDispatch();

  //back link
  const location = useLocation();
  const backLink = useRef(location.state || "/");

  //selectors
  const film = useSelector(filmDetailsSelector);
  const isLoading = useSelector(filmIsLoadingSelector);
  const isError = useSelector(filmDetailsErrorSelector);

  const showTitles = useSelector(moreTitlesSelector);

  const recommendations = useSelector(recommendationsSelector);
  const similar = useSelector(similarSelector);

  //*EFFECTS
  useEffect(() => {
    dispatch(searchDetailsAboutFilmByID(filmID));
    dispatch(getRecommendationsThunk(filmID));
    dispatch(getSimilarThunk(filmID));
  }, [dispatch, filmID]);

  const {
    id,
    original_title,
    overview,
    production_companies,
    title,
  } = film;

  return (
    <div onClick={() => dispatch(closeMenu())}>
      {isLoading && <Loader />}
      {!isError ? (
        <section className={s.page_film_info} id={id}>
          <div className={s.title_link_container}>
            <BackLink link={backLink.current} />
            <div className={s.titles_container}>
              {title && <h1 className={s.title}>{title || original_title}</h1>}
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
          <InfoColumn />
          <Companies production_companies={production_companies} />
          <Description overview={overview} />
        </section>
      ) : (
        <Error />
      )}
      <FilmVideos filmID={filmID} />
      <BottomMenuNav />
      <section>
        <h2 className={s.title}>Recommendations</h2>
        <FilmSlider list={recommendations} />
      </section>
      <section>
        <h2 className={s.title}>Similar</h2>
        <FilmSlider list={similar} />
      </section>
      <Reviews filmID={filmID} />
    </div>
  );
};

export default FilmDetails;
