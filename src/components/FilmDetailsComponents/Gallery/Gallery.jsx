import s from "./Gallery.module.css";

import { useParams } from "react-router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getChangesThunk } from "../../../redux/filmDetails/filmDetailsThunks";
import { changesSelector } from "../../../redux/filmDetails/filmDetailsSelectors";
import { imgLink } from "../../../redux/helpSettings";

/// не отображаються картинки  `${imgLink}${value.file_path}` 
const Gallery = () => {
  const { filmID } = useParams();
  const dispatch = useDispatch();
  const changes = useSelector(changesSelector);

  useEffect(() => {
    dispatch(getChangesThunk(filmID));
  }, [dispatch, filmID]);

  const showGallery = () => {
    const arr = changes?.map(
      ({ key, items }) => key === "images" && items?.map((_, idx) => idx)
    );
    const arrResult = arr?.filter((item) => item)?.flat(1);
    return arrResult.length;
  };

  return (
    <>
      {changes.length > 0 && showGallery() > 0 && (
        <div>
          <h2>Gallery</h2>
          <ul className={s.videos_list}>
            {changes.map(
              ({ key, items }) =>
                key === "images" &&
                items?.map(({ id, value, action }) => (
                  <li key={id} className={s.galleryContainer}>
                    <img
                      src={`${imgLink}${value.file_path}`}
                      alt={action ? action : "picture"}
                    />
                  </li>
                ))
            )}
          </ul>
        </div>
      )}
    </>
  );
};

export default Gallery;
