import s from "./FilmsList.module.css";

//hooks
import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router";

//redux
import { emptyPoster, imgLink } from "../../redux/helpSettings";
import { isErrorSelector } from "../../redux/selectors";

//components
import Error from "../Error/Error";
import ButtonsList from "../ButtonsList/ButtonsListCinema";

const FilmsList = ({ films = [] }) => {
  const error = useSelector(isErrorSelector);
  const location = useLocation();

  return (
    <>
      <ul className={s.list}>
        {!error && films.length > 0 ? (
          films?.map(({ title, original_title, id, poster_path }) => (
            <li key={id} className={s.list_element}>
              <NavLink to={`films/${id}`} state={location}>
                {poster_path ? (
                  <img
                    src={poster_path ? `${imgLink}${poster_path}` : emptyPoster}
                    alt={title ? title : original_title}
                  />
                ) : (
                  <>
                    <img
                      src={emptyPoster}
                      alt={title ? title : original_title}
                    />
                    <p>{title ? title : original_title}</p>
                  </>
                )}
              </NavLink>
            </li>
          ))
        ) : (
          <li>
            <Error />
          </li>
        )}
      </ul>
      <ButtonsList />
    </>
  );
};

export default FilmsList;
