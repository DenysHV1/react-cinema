import { Link, useLocation } from "react-router";
import s from "./Companies.module.css";

//swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useSelector } from "react-redux";

//redux
import { filmDetailsErrorSelector } from "../../../redux/filmDetails/filmDetailsSelectors";
import NoInfo from "../../NoInfo/NoInfo";
import { imgLink } from "../../../redux/helpSettings";

const Companies = ({ production_companies }) => {
  const location = useLocation();
  const isError = useSelector(filmDetailsErrorSelector);
  return (
    <>
      <h2 className={s.title}>Companies</h2>
      {production_companies?.length > 0 && !isError ? (
        <div className={s.companies_container}>
          <Swiper
            cssMode={true}
            navigation={true}
            pagination={true}
            mousewheel={true}
            keyboard={true}
            modules={[Navigation, Pagination, Mousewheel, Keyboard]}
            breakpoints={{
              320: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 15,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1440: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
          >
            {production_companies?.map(
              ({ id, logo_path, name, origin_country }) =>
                logo_path && (
                  <SwiperSlide key={id}>
                    <Link
                      to={`/company/${id}`}
                      state={location}
                      className={s.companies_img_container}
                    >
                      <img
                        src={`${imgLink}${logo_path}`}
                        alt={name || origin_country}
                      />
                    </Link>
                  </SwiperSlide>
                )
            )}
          </Swiper>
        </div>
      ) : (
        <NoInfo info="companies" />
      )}
    </>
  );
};

export default Companies;
