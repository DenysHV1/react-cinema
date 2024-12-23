import s from "./LastVideos.module.css";

//hooks
import { useSelector } from "react-redux";

//redux
import { selectLastVideos } from "../../redux/User/userReducer";
//components

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Mousewheel, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";



const LastVideos = () => {
  const lastVideos = useSelector(selectLastVideos);


  return (
    <>
      {lastVideos.length > 0 && (
        <>
          <h2 className={s.title}>Continue watching</h2>
          <Swiper
            cssMode={true}
            navigation={true}
            mousewheel={true}
            keyboard={true}
            modules={[Navigation, Mousewheel, Keyboard]}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 15,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
              1440: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
            }}
          >
            {lastVideos.map(
              ({ id, key, name }, idx) =>
                key &&
                idx < 11 && (
                  <SwiperSlide key={id} className={s.videoContainer}>
                    <iframe
                      className={s.iframeVideo}
                      src={`https://www.youtube.com/embed/${key}`}
                      title={name}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    ></iframe>
                  </SwiperSlide>
                )
            )}
          </Swiper>
        </>
      )}
    </>
  );
};

export default LastVideos;
