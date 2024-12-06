import css from "./Footer.module.css";

import { FaFacebook } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { TbBrandYoutubeFilled } from "react-icons/tb";
import { IoLogoLinkedin } from "react-icons/io5";

const Footer = () => {
  return (
    <footer>
      <div className={css.footerPadding}>
        <div className={css.siteInfo}>
          <p>REACT CINEMA</p>
          <div className={css.socialLinkContainer}>
            <a href="#" target="__blank" className={css.socialLink}>
              <FaFacebook size={25} style={{ color: "#0866ff" }} />
            </a>
            <a href="#" target="__blank" className={css.socialLink}>
              <RiInstagramFill size={25} style={{ color: "red" }} />
            </a>
            <a href="#" target="__blank" className={css.socialLink}>
              <TbBrandYoutubeFilled size={25} style={{ color: "#ff0033" }} />
            </a>
            <a href="#" target="__blank" className={css.socialLink}>
              <IoLogoLinkedin size={25} style={{ color: "#0a66c2" }} />
            </a>
          </div>
        </div>
        <div className={css.footerLinks}>
          <div>
            <p>Main</p>
            <p>Topic</p>
            <p>Topic</p>
            <p>Topic</p>
          </div>
          <div>
            <p>FAQ</p>
            <p>Topic</p>
            <p>Topic</p>
            <p>Topic</p>
          </div>
          <div>
            <p>Reports</p>
            <p>Topic</p>
            <p>Topic</p>
            <p>Topic</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
