import styles from "./Footer.module.css";
import { Link } from "react-router-dom";
import GoogleMap from "../../components/Footer/GoogleMap/GoogleMap";
import instagramIcon from "../../media/icons/instagramIcon.svg";
import whatsAppIcon from "../../media/icons/whatsAppIcon.svg";
import darkInstagramIcon from "../../media/icons/darkInstagramIcon.svg";
import darkWhatsappIcon from "../../media/icons/darkWhatsappIcon.svg";
import { useContext } from "react";
import { Context } from "../../context";

function Footer() {

    const { theme } = useContext(Context);

  return (
    <footer>
      <div className={styles.container}>
        <div
          className={theme === "light" ? styles.lightTheme : styles.darkTheme}
        >
          <h3 className={styles.contact}>Contact</h3>
          <div className={styles.connect}>
            <div className={styles.phone}>
              <span>Phone</span>
              <div className={styles.number}>
                <a href="tel:+499999999999">+49 999 999 99 99</a>
              </div>
            </div>

            <div className={styles.socials}>
              <span>Socials</span>

              <div className={styles.media}>
                <Link
                  className={styles.media_item}
                  to="https://www.instagram.com/startainstitute?igsh=MWR1azFwM3dhaHcxeQ=="
                  target="_blank"
                >
                  {theme === "light" ? (
                    <img
                      className={styles.instagramIcon}
                      src={instagramIcon}
                      alt="instagram-icon"
                    />
                  ) : (
                    <img
                      className={styles.darkInstagramIcon}
                      src={darkInstagramIcon}
                      alt="instagram-icon"
                    />
                  )}
                </Link>

                <Link
                  className={styles.media_item}
                  to="https://wa.me/+499999999999"
                  target="_blank"
                >
                  {theme === "light" ? (
                    <img
                      className={styles.whatsAppIcon}
                      src={whatsAppIcon}
                      alt="whatsApp-icon"
                    />
                  ) : (
                    <img
                      className={styles.darkWhatsappIcon}
                      src={darkWhatsappIcon}
                      alt="whatsApp-icon"
                    />
                  )}
                </Link>
              </div>
            </div>

            <div className={styles.adress}>
              <span>Address</span>
              <p className={styles.adresse}>
                Linkstraße 2, 8 OG, 10 785, Berlin, Deutschland
              </p>
            </div>

            <div className={styles.work}>
              <span>Working Hours</span>
              <p className={styles.hours}>24 hours a day</p>
            </div>
          </div>
        </div>
        <GoogleMap />
      </div>
    </footer>
  );
}

export default Footer;
