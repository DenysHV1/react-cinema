import s from "./FilmSlider.module.css";

//swiper
//npm install swiper@latest
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Link, useLocation } from "react-router";
import { imgLink } from "../../redux/helpSettings";
import { FcLike } from "react-icons/fc";
import { FaStar } from "react-icons/fa";
import { useState } from "react";

const FilmSlider = ({ list }) => {
  const location = useLocation();

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hoverTitle, setHoverTitle] = useState("");

  const style = {
    position: "fixed",
    top: `${position.y - 20}px`,
    left: `${position.x}px`,
    pointerEvents: "none",
    transform: "translate(-50%, -50%)",
    zIndex: 9999,
  };

  const handlerAddMouseMove = (e, title) => {
    setPosition({ x: e.clientX, y: e.clientY });
    setHoverTitle(title);
  };

  const handlerRemoveMouseMove = () => {
    setHoverTitle("");
  };
  return (
    <div className={s.FilmSlider_section}>
      <Swiper
        cssMode={true}
        navigation={true}
        pagination={true}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        breakpoints={{
          320: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 15,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          1440: {
            slidesPerView: 5,
            spaceBetween: 30,
          },
        }}
      >
        {list?.length > 0 &&
          list.map(
            ({
              poster_path,
              popularity,
              id,
              vote_average,
              title,
              original_title,
            }) =>
              poster_path && (
                <SwiperSlide key={id}>
                  <Link
                    to={`/films/${id}`}
                    state={location}
                    className={s.FilmSlider_item}
                    onMouseMove={(e) => handlerAddMouseMove(e, title)}
                    onMouseLeave={handlerRemoveMouseMove}
                  >
                    <img
                      src={`${imgLink}${poster_path}`}
                      alt={title || original_title}
                    />
                    <div className={s.popularity_container}>
                      <FcLike className={s.like} />
                      <p>{Math.ceil(popularity)}</p>
                    </div>
                    <div className={s.vote_average_container}>
                      <FaStar className={s.star} />
                      <p>{Math.ceil(vote_average)}</p>
                    </div>
                  </Link>
                </SwiperSlide>
              )
          )}
      </Swiper>
      {hoverTitle && (
        <span className={s.custom_cursor} style={style}>
          {hoverTitle}
        </span>
      )}
    </div>
  );
};

export default FilmSlider;
