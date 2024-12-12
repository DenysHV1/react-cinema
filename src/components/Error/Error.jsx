import { SiVlcmediaplayer } from "react-icons/si";
import s from "./Error.module.css";

const Error = () => {
  return (
    <>
      <div className={s.error}>
        Error 404? <br/>More like a horror movie attack of the Servers! We are on
        it. 🤖💻
        <SiVlcmediaplayer className={s.element} />
      </div>
    </>
  );
};

export default Error;
