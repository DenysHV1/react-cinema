import { selectLastVideos } from "../../../redux/lastVideo/lastVideoReducer";
import s from "./UserVideos.module.css";

//hooks
import { useSelector } from "react-redux";

//redux

//components

const UserVideos = () => {
  const lastVideos = useSelector(selectLastVideos);

  console.log(lastVideos);

  return (
    <>
      <ul className={s.list}>
        {lastVideos?.length > 0 &&
          lastVideos.map(
            ({ id, key, name }) =>
              key && (
                <li key={id} className={s.videoContainer}>
                  <iframe
                    className={s.iframeVideo}
                    src={`https://www.youtube.com/embed/${key}`}
                    title={name}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
				  <p className={s.video_name}>{name}</p>
                </li>
              )
          )}
      </ul>
    </>
  );
};

export default UserVideos;
