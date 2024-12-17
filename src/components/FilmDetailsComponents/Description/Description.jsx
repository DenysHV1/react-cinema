import s from "./Description.module.css";

const Description = ({ overview }) => {
  return (
    <>
      {overview && (
        <div className={s.overview_container}>
          <h2 className={s.overview_title}>Description</h2>
          <p className={s.overview_text}>{overview}</p>
        </div>
      )}
    </>
  );
};

export default Description;
