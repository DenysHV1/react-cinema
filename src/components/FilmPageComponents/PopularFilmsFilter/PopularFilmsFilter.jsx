import { useEffect } from "react";
import s from "./PopularFilmsFilter.module.css";
import { useDispatch, useSelector } from "react-redux";
import { filterVariantSelector } from "../../../redux/filmsPage/selectors";
import { searchNuwPlaying, searchPopular, searchPremiersFilms, searchTopRated, searchUpcoming } from "../../../redux/filmsPage/thunkFilteredTopFilms";
import { setVariant } from "../../../redux/filmsPage/reducer";


const PopularFilmsFilter = () => {
  const dispatch = useDispatch();
  const variant = useSelector(filterVariantSelector);

  useEffect(() => {
    if (variant) {
      switch (variant) {
        case "NOW_PLAYING":
          dispatch(searchNuwPlaying());
          break;
        case "POPULAR":
          dispatch(searchPopular());
          break;
        case "TOP_RATED":
          dispatch(searchTopRated());
          break;
        case "UPCOMING":
          dispatch(searchUpcoming());
          break;
        case "PREMIERS":
          dispatch(searchPremiersFilms());
          break;
        default:
          dispatch(searchPremiersFilms());
          break;
      }
    }
  }, [variant, dispatch]);

  return (
    <div className={s.filter_container}>
      <button
        onClick={() => dispatch(setVariant("PREMIERS"))}
        className={s.btn}
      >
        Premiers
      </button>
      <button
        onClick={() => dispatch(setVariant("NOW_PLAYING"))}
        className={s.btn}
      >
        Now Playing
      </button>
      <button onClick={() => dispatch(setVariant("POPULAR"))} className={s.btn}>
        Popular
      </button>
      <button
        onClick={() => dispatch(setVariant("TOP_RATED"))}
        className={s.btn}
      >
        Top Rated
      </button>
      <button
        onClick={() => dispatch(setVariant("UPCOMING"))}
        className={s.btn}
      >
        Upcoming
      </button>
    </div>
  );
};

export default PopularFilmsFilter;
