import { useLocation, useParams } from "react-router";
import BackLink from "../../components/BackLink/BackLink";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { companyPageThunk } from "../../redux/companyPage/thunk";
import { castPageSelector } from "../../redux/companyPage/selectors";
import { imgLink } from "../../redux/helpSettings";
import s from "./CompanyPage.module.css";

const ActorPage = () => {
  const { companyID } = useParams();
  const location = useLocation();
  const backLink = useRef(location.state || location.pathname || "/");
  const dispatch = useDispatch();
  const company = useSelector(castPageSelector);

  useEffect(() => {
    dispatch(companyPageThunk(companyID));
  }, [dispatch, companyID]);

  console.log(companyID);

  console.log(company);

  const { homepage, logo_path, name } = company;
  return (
    <section>
      <BackLink link={backLink.current} />
      <img src={`${imgLink}${logo_path}`} alt={name} className={s.img} />
      <p className={s.name}>Name: {name}</p>
      <a className={s.link} href={homepage} target="_blank">
        Company info
      </a>
    </section>
  );
};

export default ActorPage;
