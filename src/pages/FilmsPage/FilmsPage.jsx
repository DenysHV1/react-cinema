import s from './FilmsPage.module.css'
import { useDispatch, useSelector } from "react-redux";
import {
  filmsSelector,
  isErrorSelector,
  isLoadingSelector,
} from "../../redux/films/filmsSelectors";
import { useEffect } from "react";
import { searchPremiersFilms } from "../../redux/films/thunkFetchFilms";
import { NavLink } from "react-router";
import FilterYearMonth from "../../components/Forms/FilterYearMonth/FilterYearMonth";
import Error from "../../components/Error/Error";
import Loader from "../../components/Loader/Loader";

const FilmsPage = () => {
  const films = useSelector(filmsSelector);
  const loading = useSelector(isLoadingSelector);
  const error = useSelector(isErrorSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!error) {
      dispatch(searchPremiersFilms());
    }
  });

  return (
    <section className={s.section}>
      <h1>Find film by date</h1>
      <FilterYearMonth />
      {loading && <Loader />}
      <ul className={s.list}>
        {!error ? (
          films?.map(({ kinopoiskId, posterUrl, nameEn, nameRu }) => (
            <li key={kinopoiskId}>
              <NavLink to={`films/${kinopoiskId}`}>
                <img src={posterUrl} alt={nameEn ? nameEn : nameRu} />
              </NavLink>
            </li>
          ))
        ) : (
          <li>
            <Error />
          </li>
        )}
      </ul>
    </section>
  );
};

export default FilmsPage;
