import { useDispatch, useSelector } from "react-redux";
import { alternativeTitlesSelector } from "../../../redux/filmDetails/filmDetailsSelectors";
import { useEffect } from "react";
import { alternativeTitlesThunk } from "../../../redux/filmDetails/filmDetailsThunks";
import s from './AlternativeTitle.module.css'

const AlternativeTitles = ({ filmID }) => {
  const dispatch = useDispatch();
  const titles = useSelector(alternativeTitlesSelector);

  useEffect(() => {
    dispatch(alternativeTitlesThunk(filmID));
  }, [dispatch, filmID]);

  console.log(titles);

  return (
    <>
      {titles?.map(
        ({ iso_3166_1, title }, idx) =>
          idx < 1 && <h2 key={iso_3166_1} className={s.title}>{title}<span>{iso_3166_1}</span></h2>
      )}
    </>
  );
};

export default AlternativeTitles;
