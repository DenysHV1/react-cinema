import s from "./AlternativeTitle.module.css";
//hooks
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

//redux
import { alternativeTitlesSelector } from "../../../redux/filmDetails/filmDetailsSelectors";
import { alternativeTitlesThunk } from "../../../redux/filmDetails/filmDetailsThunks";
import NoInfo from "../../NoInfo/NoInfo";

const AlternativeTitles = ({ filmID }) => {
  const dispatch = useDispatch();
  const titles = useSelector(alternativeTitlesSelector);

  useEffect(() => {
    dispatch(alternativeTitlesThunk(filmID));
  }, [dispatch, filmID]);

  return (
    <>
      {Array.isArray(titles) && titles.length > 0 ? (
        titles.slice(0, 1).map(({ iso_3166_1, title }) => (
          <h2 key={iso_3166_1 || title} className={s.title}>
            {title}
            <span>{iso_3166_1 || "US"}</span>
          </h2>
        ))
      ) : (
        <NoInfo info="title" />
      )}
    </>
  );
};

export default AlternativeTitles;
