import { Link, useLocation } from "react-router";
import { imgLink } from "../../../redux/helpSettings";
import s from "./Companies.module.css";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Companies = ({ production_companies }) => {
  const location = useLocation();
  SwiperCore.use([Navigation, Pagination]);
  return (
    <>
    <h2 className={s.title}>Companies</h2>
      {production_companies?.length > 0 && (
        <div className={s.companies_container}>
          <Swiper
            spaceBetween={30}
            slidesPerView={3}
            navigation
            pagination={{ clickable: true }}
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
                spaceBetween: 30,
              },
            }}
            className={s.list}
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
                        alt={name ? name : origin_country}
                      />
                    </Link>
                  </SwiperSlide>
                )
            )}
          </Swiper>
        </div>
      )}
    </>
  );
};

export default Companies;
