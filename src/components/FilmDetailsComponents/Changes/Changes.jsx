import { useParams } from "react-router";
import s from "./Changes.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  changesSelector,
  filmIsLoadingSelector,
} from "../../../redux/filmDetails/filmDetailsSelectors";
import { useEffect } from "react";
import { getChangesThunk } from "../../../redux/filmDetails/filmDetailsThunks";
import Loader from "../../Loader/Loader";

const Changes = () => {
  const { filmID } = useParams();
  const dispatch = useDispatch();
  const changes = useSelector(changesSelector);
  const isLoading = useSelector(filmIsLoadingSelector);

  useEffect(() => {
    dispatch(getChangesThunk(filmID));
  }, [dispatch, filmID]);

  return (
    <>
      {changes?.length > 0 && (
        <ul className={s.videos_list}>
          {changes?.map(
            ({ key, items }) =>
              key === "videos" &&
              items.map(
                ({ id, value, original_value }, idx) =>
                  idx < 9 && (
                    <li key={id} className={s.videoContainer}>
                      {value?.key || original_value?.key ? (
                        <iframe
                          className={s.iframeVideo}
                          src={`https://www.youtube.com/embed/${
                            value?.key || original_value?.key
                          }`}
                          title={value?.name || original_value?.name || "Video"}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        ></iframe>
                      ) : (
                        <p className={s.noVideoMessage}>Video unavailable</p>
                      )}
                      <p className={s.video_name}>
                        {value?.name ||
                          original_value?.name ||
                          "Unknown video name"}
                      </p>
                      {isLoading && <Loader />}
                    </li>
                  )
              )
          )}
        </ul>
      )}
    </>
  );
};

export default Changes;
