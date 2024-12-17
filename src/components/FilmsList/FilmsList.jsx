import s from "./FilmsList.module.css";

//hooks
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router";

//redux
import { emptyPoster, imgLink } from "../../redux/helpSettings";
import { isErrorSelector } from "../../redux/filmsPage/selectors";

//components
import Error from "../Error/Error";

const FilmsList = ({ films = [] }) => {
  const error = useSelector(isErrorSelector);
  const location = useLocation();

  return (
    <section>
      <ul className={s.list}>
        {!error && films.length > 0 ? (
          films?.map(({ title, original_title, id, poster_path }) => (
            <li key={id} className={s.list_element}>
              <Link to={`/films/${id}`} state={location}>
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
              </Link>
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

export default FilmsList;
