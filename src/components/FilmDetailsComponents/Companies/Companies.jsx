import { imgLink } from "../../../redux/helpSettings";
import s from "./Companies.module.css";

const Companies = ({ production_companies }) => {
  return (
    <>
      {production_companies?.length > 0 && (
        <div className={s.companies_container}>
          <ul className={s.companies_list}>
            {production_companies?.map(
              ({ id, logo_path, name, origin_country }) =>
                logo_path && (
                  <li key={id} className={s.companies_item}>
                    <div className={s.companies_img_container}>
                      <img
                        src={`${imgLink}${logo_path}`}
                        alt={name ? name : origin_country}
                      />
                    </div>
                  </li>
                )
            )}
          </ul>
        </div>
      )}
    </>
  );
};

export default Companies;
