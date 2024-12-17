import s from "./FilmVideos.module.css";

//hooks
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

//redux
import { filmVideosSelector } from "../../../redux/filmDetails/filmDetailsSelectors";
import { filmVideosThunk } from "../../../redux/filmDetails/filmDetailsThunks";

//icons
import { RiMovieFill } from "react-icons/ri";

const FilmGallery = ({ filmID }) => {
  //item buttons and navigate
  const [itemsBtn, setItemBTN] = useState([]);
  const [currentTrailer, setCurrentTrailer] = useState(1);

  //redux
  const dispatch = useDispatch();
  const films = useSelector(filmVideosSelector);

  useEffect(() => {
    dispatch(filmVideosThunk(filmID));
  }, [dispatch, filmID]);

  useEffect(() => {
    if (films.length > 0) {
      const arr = Array.from({ length: films.length }, (_, i) => i + 1);
      setItemBTN(arr);
    }
  }, [films]);

  return (
    <section className={s.trailers_section}>
      {films.length > 0 && (
        <>
          <h1 className={s.title}>Playlist</h1>
          <ul className={s.trailerBtn_list}>
            {itemsBtn?.map((item) => (
              <li className={s.trailer_item} key={`${item}btn`}>
                <button
                  type="button"
                  className={s.trailer_btn}
                  onClick={() => setCurrentTrailer(item)}
                >
                  <RiMovieFill className={s.btn_svg} /> <span>{item}</span>
                </button>
              </li>
            ))}
          </ul>
          <ul>
            {films?.map(
              ({ id, key, name }, idx) =>
                key &&
                currentTrailer === idx + 1 && (
                  <li key={id} className={s.videoContainer}>
                    <iframe
                      className={s.iframeVideo}
                      src={`https://www.youtube.com/embed/${key}`}
                      title={name ? name : "alternative name"}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    ></iframe>
                  </li>
                )
            )}
          </ul>
        </>
      )}
    </section>
  );
};

export default FilmGallery;
