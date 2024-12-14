import s from "./HomePage.module.css";
import { imgLink } from "../../redux/films/imgLink";
import { NavLink } from "react-router";

//hooks
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

//components
import HeaderBanner from "../../components/HeaderBanner/HeaderBanner";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";

//redux
import { searchPremiersFilms, searchPremiersFilmsByPage } from "../../redux/films/thunkFetchFilms";
import {
  filmsSelector,
  isLoadingSelector,
  isErrorSelector,
  totalPagesSelector,
} from "../../redux/films/filmsSelectors";

const HomePage = () => {
  const [pages, setPages] = useState([]);
  const films = useSelector(filmsSelector);
  const loading = useSelector(isLoadingSelector);
  const error = useSelector(isErrorSelector);
  const totalPages = useSelector(totalPagesSelector);
  const dispatch = useDispatch();

  console.log(films);
  

  useEffect(() => {
    dispatch(searchPremiersFilms());
    const arr = [];
    for (let i = 1; i <= totalPages / 20; i += 1) {
      arr.push(i);
    }
    setPages(arr);
  }, [dispatch, totalPages]);



  return (
    <>
      <HeaderBanner />
      <section className={s.section}>
        {loading && <Loader />}
		<ul className={s.buttonsList}>
          {pages.length > 0 &&
            pages.map((item) => (
              <li key={`${item}top`}>
                <button onClick={() => dispatch(searchPremiersFilmsByPage(item))} className={s.buttonPage}>
                  {item}
                </button>
              </li>
            ))}
        </ul>
        <ul className={s.list}>
          {!error ? (
            films?.map(({ title, original_title, id, poster_path }) => (
              <li key={id} className={s.list_element}>
                <NavLink to={`films/${id}`}>
                  <img
                    src={`${imgLink}${poster_path}`}
                    alt={title ? original_title : title}
                  />
                </NavLink>
              </li>
            ))
          ) : (
            <li>
              <Error />
            </li>
          )}
        </ul>
        <ul className={s.buttonsList}>
          {pages.length > 0 &&
            pages.map((item) => (
              <li key={`${item}bottom`}>
                <button onClick={() => dispatch(searchPremiersFilmsByPage(item))} className={s.buttonPage}>
                  {item}
                </button>
              </li>
            ))}
        </ul>
      </section>
    </>
  );
};

export default HomePage;
