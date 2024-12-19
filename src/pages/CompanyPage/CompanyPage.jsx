import s from "./CompanyPage.module.css";

//hooks
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//redux
import { companyPageThunk } from "../../redux/companyPage/thunk";
import {
  castPageSelector,
  reviewsLoaderSelector,
} from "../../redux/companyPage/selectors";
import { imgLink } from "../../redux/helpSettings";
import { closeMenu } from "../../redux/filmsPage/reducers";
import { reviewsErrorSelector } from "../../redux/reviewsPage/selectors";
//icons
import { TbArrowBigLeftLines } from "react-icons/tb";

//components
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";

const ActorPage = () => {
  const { companyID } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const company = useSelector(castPageSelector);
  const isLoading = useSelector(reviewsLoaderSelector);
  const isError = useSelector(reviewsErrorSelector);

  useEffect(() => {
    dispatch(companyPageThunk(companyID));
  }, [dispatch, companyID]);

  const { homepage, logo_path, name } = company;
  return (
    <>
      {isLoading && <Loader />}
      {!isError ? (
        <section onClick={() => dispatch(closeMenu())}>
          <button className="back_link" onClick={() => navigate(-1)}>
            <TbArrowBigLeftLines className="back_item" />
          </button>
          <img src={`${imgLink}${logo_path}`} alt={name} className={s.img} />
          <p className={s.name}>Name: {name}</p>
          <a className={s.link} href={homepage} target="_blank">
            Company info
          </a>
        </section>
      ) : (
        <Error />
      )}
    </>
  );
};

export default ActorPage;
