import s from "./FilmsList.module.css";

//hooks
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router";

//redux
import { imgLink } from "../../redux/helpSettings";
import {
  isErrorSelector,
  isLoadingSelector,
} from "../../redux/filmsPage/selectors";

//components
import Error from "../Error/Error";
import Loader from "../Loader/Loader";
import { FcLike } from "react-icons/fc";
import { FaStar } from "react-icons/fa";
import { closeMenu } from "../../redux/filmsPage/reducers";

const FilmsList = ({ films = [] }) => {
  const error = useSelector(isErrorSelector);
  const isLoading = useSelector(isLoadingSelector);
  const location = useLocation();
  const dispatch = useDispatch()

  return (
    <section onClick={() => dispatch(closeMenu())}>
      <ul className={s.list} >
        {isLoading && <Loader />}
        {!error && films?.length > 0 ? (
          films.map(
            ({ title, id, poster_path, vote_average, popularity }) =>
              poster_path &&
              title &&
              id &&
              vote_average > 3 &&
              popularity > 1 && (
                <li key={id} className={s.list_element} >
                  <Link to={`/films/${id}`} state={location} >
                    <img src={`${imgLink}${poster_path}`} alt={title} />
                    <div className={s.popularity_container}>
                      <FcLike className={s.like} />
                      <p>{Math.ceil(popularity)}</p>
                    </div>
                    <div className={s.vote_average_container}>
                      <FaStar className={s.star} />
                      <p>{Math.ceil(vote_average)}</p>
                    </div>
                  </Link>
                </li>
              )
          )
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
