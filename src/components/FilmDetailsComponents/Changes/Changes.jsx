import s from "./Changes.module.css";

//hooks
import { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";

//redux
import {
  changesSelector,
  filmDetailsErrorSelector,
  filmIsLoadingSelector,
} from "../../../redux/filmDetails/filmDetailsSelectors";
import { getChangesThunk } from "../../../redux/filmDetails/filmDetailsThunks";
import { addVideo } from "../../../redux/User/userReducer";

//components
import Loader from "../../Loader/Loader";
import NoInfo from "../../NoInfo/NoInfo";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import iziToast from "izitoast";
import { selectSessionIdAuth } from "../../../redux/auth/authSelectors";

const Changes = () => {
  const { filmID } = useParams();
  const dispatch = useDispatch();

  const changes = useSelector(changesSelector);
  const isLoading = useSelector(filmIsLoadingSelector);
  const isError = useSelector(filmDetailsErrorSelector);
  const sessionId = useSelector(selectSessionIdAuth)

  useEffect(() => {
    dispatch(getChangesThunk(filmID));
  }, [dispatch, filmID]);

  return (
    <>
      {changes?.length > 0 && !isError ? (
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
          {changes.map(
            ({ key, items }) =>
              key === "videos" &&
              items.map(({ id, value, original_value }) => {
                const videoKey = value?.key || original_value?.key;
                const videoName =
                  value?.name || original_value?.name || "Unknown video name";

                return (
                  videoKey && (
                    <SwiperSlide key={id} className={s.videoContainer}>
                      <iframe
                        className={s.iframeVideo}
                        src={`https://www.youtube.com/embed/${videoKey}`}
                        title={videoName}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      ></iframe>
                      <p className={s.video_name}>{videoName}</p>
                      {sessionId && <button
                        className={s.addVideo}
                        onClick={() => {
                          iziToast.success({
                            title: "Success!",
                            message: `The movie "${videoName}" has been successfully added to your list.`,
                            position: "topRight",
                            timeout: 3000,
                            transitionIn: "fadeIn",
                            transitionOut: "fadeOut",
                            color: "#03a703",
                          });
                          return dispatch(
                            addVideo({ id, key: videoKey, name: videoName })
                          );
                        }}
                      >
                        Add video
                      </button>}
                      {isLoading && <Loader />}
                    </SwiperSlide>
                  )
                );
              })
          )}
        </Swiper>
      ) : (
        <NoInfo info="changes" />
      )}
    </>
  );
};

export default Changes;
