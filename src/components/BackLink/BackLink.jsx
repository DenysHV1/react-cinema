import s from "./BackLink.module.css";
import { Link } from "react-router";
import { TbArrowBigLeftLines } from "react-icons/tb";

const BackLink = ({ link }) => {
  return (
    <Link to={link} className={s.back_link}>
      <TbArrowBigLeftLines className={s.back_item} />
    </Link>
  );
};

export default BackLink;
