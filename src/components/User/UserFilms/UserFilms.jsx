import { useState } from "react";
import s from "./UserFilms.module.css";

// hooks
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router";

// redux

// components

import { FcLike } from "react-icons/fc";
import { FaStar } from "react-icons/fa";
import { closeMenu } from "../../../redux/filmsPage/reducers";
import { imgLink } from "../../../redux/helpSettings";
import Error from "../../Error/Error";
import { selectUserFilms } from "../../../redux/User/userReducer";

const UserFilms = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const films = useSelector(selectUserFilms);

  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hoverTitle, setHoverTitle] = useState("");

  const handleMouseMove = (e, title) => {
    setCursorPosition({ x: e.clientX, y: e.clientY });
    setHoverTitle(title);
  };

  const handleMouseLeave = () => {
    setHoverTitle("");
  };

  const cursorStyle = {
    position: "fixed",
    top: `${cursorPosition.y - 20}px`,
    left: `${cursorPosition.x}px`,
    pointerEvents: "none",
    transform: "translate(-50%, -50%)",
    zIndex: 9999,
  };

  return (
    <section onClick={() => dispatch(closeMenu())}>
      <ul className={s.list}>
        {films?.length > 0 ? (
          films.map(
            ({ title, id, poster_path, vote_average, popularity }) =>
              poster_path &&
              title &&
              id &&
              vote_average > 3 &&
              popularity > 1 && (
                <li
                  key={id}
                  className={s.list_element}
                  onMouseMove={(e) => handleMouseMove(e, title)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link to={`/films/${id}`} state={location}>
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

      {hoverTitle && (
        <div className={s.custom_cursor} style={cursorStyle}>
          {hoverTitle}
        </div>
      )}
    </section>
  );
};

export default UserFilms;
