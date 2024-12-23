import s from "./LastVideos.module.css";

//hooks
import { useSelector } from "react-redux";

//redux

//components

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import NoInfo from "../NoInfo/NoInfo";
import { selectLastVideos } from "../../redux/lastVideo/lastVideoReducer";

const LastVideos = () => {
  const lastVideos = useSelector(selectLastVideos);

  console.log(lastVideos);
  
  return (
    <>
      {lastVideos?.length > 0 ? (
        <Swiper
          cssMode={true}
          navigation={true}
          pagination={true}
          mousewheel={true}
          keyboard={true}
          modules={[Navigation, Pagination, Mousewheel, Keyboard]}
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
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1440: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
          }}
        >
          {lastVideos.map(
            ({ id, key, name }) =>
              key && (
                <SwiperSlide key={id} className={s.videoContainer}>
                  <iframe
                    className={s.iframeVideo}
                    src={`https://www.youtube.com/embed/${key}`}
                    title={name}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                  <p className={s.video_name}>{name}</p>
                </SwiperSlide>
              )
          )}
        </Swiper>
      ) : (
        <NoInfo info="changes" />
      )}
    </>
  );
};

export default LastVideos;
