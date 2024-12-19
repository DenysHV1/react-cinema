import s from "./Keywords.module.css";

//hooks
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

//redux
import { getKeywordsThunk } from "../../../redux/filmDetails/filmDetailsThunks";
import {
  filmDetailsErrorSelector,
  filmIsLoadingSelector,
  keywordsSelector,
} from "../../../redux/filmDetails/filmDetailsSelectors";

//components
import Loader from "../../Loader/Loader";
import NoInfo from "../../NoInfo/NoInfo";

const Keywords = () => {
  const { filmID } = useParams();
  const dispatch = useDispatch();

  const keywords = useSelector(keywordsSelector);
  const isLoading = useSelector(filmIsLoadingSelector);
  const isError = useSelector(filmDetailsErrorSelector);

  useEffect(() => {
    dispatch(getKeywordsThunk(filmID));
  }, [dispatch, filmID]);

  return (
    <>
      {isLoading && <Loader />}
      <ul className={s.keywords_list}>
        {keywords?.length > 0 && !isError ? (
          keywords.map(
            ({ id, name }) =>
              name && (
                <li key={id} className={s.keywords_item}>
                  {name}
                </li>
              )
          )
        ) : (
          <NoInfo info="keywords" />
        )}
      </ul>
    </>
  );
};

export default Keywords;
