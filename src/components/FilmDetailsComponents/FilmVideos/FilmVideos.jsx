import { useDispatch, useSelector } from "react-redux";
import { filmVideosSelector } from "../../../redux/filmDetails/filmDetailsSelectors";
import { useEffect, useState } from "react";
import { filmVideosThunk } from "../../../redux/filmDetails/filmDetailsThunks";

import s from "./FilmVideos.module.css";
import { RiMovieFill } from "react-icons/ri";

const FilmGallery = ({ filmID }) => {
  const [itemsBtn, setItemBTN] = useState([]);
  const [lengthItems, setLengthItems] = useState(0);
  const [currentTrailer, setCurrentTrailer] = useState(1);
  const dispatch = useDispatch();
  const films = useSelector(filmVideosSelector);

  useEffect(() => {
    dispatch(filmVideosThunk(filmID));
  }, [dispatch, filmID]);

  console.log(films);

  useEffect(() => {
    if (films.length > 0) {
      setLengthItems(films.length);
      const arr = [];
      for (let i = 1; i <= lengthItems; i += 1) {
        arr.push(i);
      }
      setItemBTN(arr);
    }
  }, [films, lengthItems]);

  console.log(itemsBtn);

  return (
    <section className={s.trailers_section}>
      <h1 className={s.title}>Playlist</h1>
      <ul className={s.trailerBtn_list}>
        {itemsBtn?.map((item) => (
          <li className={s.trailer_item} key={`${item}btn`}>
            <button
              type="button"
              className={s.trailer_btn}
              onClick={() => setCurrentTrailer(item)}
            >
              <RiMovieFill className={s.btn_svg}/> <span>{item}</span>
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
    </section>
  );
};

export default FilmGallery;
