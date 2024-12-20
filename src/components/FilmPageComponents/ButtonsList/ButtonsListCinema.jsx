import s from "./ButtonsListCinema.module.css";

//redux
import {
  filterVariantSelector,
  totalPagesSelector,
} from "../../../redux/filmsPage/selectors";
import {
  searchPopularByPage,
  searchTopRatedByPage,
  searchUpcomingByPage,
  searchPremiersFilmsByPage,
} from "../../../redux/filmsPage/thunkFilteredTopFilms";

//hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ButtonsList = () => {
  const totalPages = useSelector(totalPagesSelector);
  const variant = useSelector(filterVariantSelector);

  const [pages, setPages] = useState([]);

  useEffect(() => {
    const arr = [];
    for (let i = 1; i <= totalPages; i += 1) {
      arr.push(i);
    }
    setPages(arr);
  }, [totalPages]);

  const dispatch = useDispatch();

  const handleChangePage = (item) => {
    switch (variant) {
      case "POPULAR":
        dispatch(searchPopularByPage(item));
        break;
      case "TOP_RATED":
        dispatch(searchTopRatedByPage(item));
        break;
      case "UPCOMING":
        dispatch(searchUpcomingByPage(item));
        break;
      case "PREMIERS":
        dispatch(searchPremiersFilmsByPage(item));
        break;
      default:
        dispatch(searchPremiersFilmsByPage(item));
        break;
    }
  };

  return (
    <div className={s.buttons_container}>
      <ul className={s.buttonsList}>
        {pages?.length > 0 &&
          pages.map((item) => (
            <li key={`${item}bottom`}>
              <button
                onClick={() => handleChangePage(item)}
                className={s.buttonPage}
              >
                {item}
              </button>
            </li>
          ))}
      </ul>
      <span>...</span>
      <div>
        <button
          onClick={() => handleChangePage(totalPages)}
          className={s.buttonPage}
        >
          {totalPages}
        </button>
      </div>
    </div>
  );
};

export default ButtonsList;
