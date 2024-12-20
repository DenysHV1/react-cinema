import s from "./Cast.module.css";

//hooks
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//redux
import {
  castSelector,
  filmDetailsErrorSelector,
  filmIsLoadingSelector,
} from "../../../redux/filmDetails/filmDetailsSelectors";
import { getCastThunk } from "../../../redux/filmDetails/filmDetailsThunks";
import { imgLink } from "../../../redux/helpSettings";

//icons
import { FcLike } from "react-icons/fc";
import Loader from "../../Loader/Loader";
import NoInfo from "../../NoInfo/NoInfo";

const Cast = () => {
  const { filmID } = useParams();
  const dispatch = useDispatch();
  const cast = useSelector(castSelector);
  const isLoading = useSelector(filmIsLoadingSelector);
  const isError = useSelector(filmDetailsErrorSelector);

  const [showMoreBtn, setShowMoreBtn] = useState(false);
  const [elements, setElements] = useState(8);
  const [btnText, setBtnText] = useState("Show more");

  useEffect(() => {
    dispatch(getCastThunk(filmID));
  }, [dispatch, filmID]);

  useEffect(() => {
    setShowMoreBtn(cast?.length > 8);
    setBtnText(cast?.length > elements ? "Show more" : "Hide");
  }, [cast, elements]);

  const handlerShowMore = () => {
    if (cast?.length > elements) {
      setElements((prevEl) => prevEl + 8);
    } else {
      setElements(8);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      {cast?.length > 0 && !isError ? (
        <ul className={s.cast_list}>
          {cast.map(
            (
              { character, name, id, popularity, profile_path, original_name },
              idx
            ) =>
              profile_path &&
              idx < elements && (
                <li key={id}>
                  <div className={s.cast_item}>
                    <div className={s.img_container}>
                      <img
                        src={`${imgLink}${profile_path}`}
                        alt={name || character}
                      />
                      <span className={s.popularity}>
                        <FcLike />
                        {Math.ceil(popularity)}
                      </span>
                    </div>
                    <div className={s.name_block}>
                      <p className={s.name_title}>Name: </p>
                      <p className={s.name}>{name || original_name}</p>
                    </div>
                    <div className={s.character_block}>
                      <p className={s.character_title}>Character: </p>
                      <p className={s.character}>
                        {character || original_name}
                      </p>
                    </div>
                  </div>
                </li>
              )
          )}
        </ul>
      ) : (
        <NoInfo info="actors" />
      )}
      {showMoreBtn && (
        <button className={s.showMore} onClick={handlerShowMore}>
          {btnText}
        </button>
      )}
    </>
  );
};

export default Cast;
