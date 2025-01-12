import { useEffect, useState } from "react";
import s from "./PopularFilmsFilter.module.css";
import { useDispatch, useSelector } from "react-redux";
import { filterVariantSelector } from "../../../redux/filmsPage/selectors";
import {
  searchPopular,
  searchPremiersFilms,
  searchTopRated,
  searchUpcoming,
} from "../../../redux/filmsPage/thunkFilteredTopFilms";
import { closeMenu, setVariant } from "../../../redux/filmsPage/reducers";

const PopularFilmsFilter = () => {
  const dispatch = useDispatch();
  const variant = useSelector(filterVariantSelector);
  const [active, setActive] = useState("PREMIERS");

  useEffect(() => {
    if (variant) {
      switch (variant) {
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

  const handleButtonClick = (filterVariant) => {
    dispatch(setVariant(filterVariant));
    setActive(filterVariant);
  };

  return (
    <div className={s.filter_container} onClick={() => dispatch(closeMenu())}>
      <button
        onClick={() => handleButtonClick("PREMIERS")}
        className={`${s.btn} ${active === "PREMIERS" ? s.active : ""}`}
      >
        Premiers
      </button>
      <button
        onClick={() => handleButtonClick("POPULAR")}
        className={`${s.btn} ${active === "POPULAR" ? s.active : ""}`}
      >
        Popular
      </button>
      <button
        onClick={() => handleButtonClick("TOP_RATED")}
        className={`${s.btn} ${active === "TOP_RATED" ? s.active : ""}`}
      >
        Top Rated
      </button>
      <button
        onClick={() => handleButtonClick("UPCOMING")}
        className={`${s.btn} ${active === "UPCOMING" ? s.active : ""}`}
      >
        Upcoming
      </button>
    </div>
  );
};

export default PopularFilmsFilter;
