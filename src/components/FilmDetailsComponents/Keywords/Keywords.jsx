import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getKeywordsThunk } from "../../../redux/filmDetails/filmDetailsThunks";
import { keywordsSelector } from "../../../redux/filmDetails/filmDetailsSelectors";
import s from './Keywords.module.css'

const Keywords = () => {
  const { filmID } = useParams();
  const dispatch = useDispatch();
  const keywords = useSelector(keywordsSelector);

  useEffect(() => {
    dispatch(getKeywordsThunk(filmID));
  }, [dispatch, filmID]);
  return (
    <>
      <ul className={s.keywords_list}>
        {keywords?.length > 0 &&
          keywords.map(({ id, name }) => name && <li key={id} className={s.keywords_item}>{name}</li>)}
      </ul>
    </>
  );
};

export default Keywords;
