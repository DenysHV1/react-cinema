import s from "./NoInfo.module.css";

const NoInfo = ({ info }) => {
  return (
    <p className={s.no_info}>
      We do not have info {info ? `about ${info}` : ""}😥
    </p>
  );
};

export default NoInfo;
