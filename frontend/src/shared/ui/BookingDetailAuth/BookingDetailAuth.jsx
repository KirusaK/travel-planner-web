import { SocialAuthGroup } from "../SocialAuthGroup/index.js";
import {useAuth} from "../../context/AuthContext.jsx";
import sprite from "../../assets/icons/symbol-defs.svg";
import styles from "./BookingDetailAuth.module.scss";

export const BookingDetailAuth = () => {
  const {user} = useAuth();

  return (
    <section className={styles.bookingDetailAuth}>
      {user ? (
        <div className={styles.bookingDetailAuth_container}>
          <button className={styles.bookingDetailAuth_container__border}>
            <div className={styles.bookingDetailAuth_container__info}>
              <svg width={64} height={64}>
                <use href={sprite + "#icon-Add_circle"} />
              </svg>
              <p>Add a new card</p>
            </div>
          </button>
        </div>
      ) : (
        <div className={styles.bookingDetailAuth_container}>
          <h2 className={styles.bookingDetailAuth_title}>
            Login or Sign up to book
          </h2>

          <form className={styles.bookingDetailAuth_form}>
            <div className={styles.bookingDetailAuth_inputGroup}>
              <input
                id="phone"
                type="tel"
                placeholder="Phone Number"
                className={styles.bookingDetailAuth_input}
              />
            </div>

            <p className={styles.bookingDetailAuth_policy}>
              We’ll call or text you to confirm your number. Standard message
              and data rates apply. <span>Privacy Policy</span>
            </p>

            <div className={styles.bookingDetailAuth_button}>
              <button
                type="submit"
                className={styles.bookingDetailAuth_button__submitBtn}
              >
                Continue
              </button>
            </div>
          </form>

          <div className={styles.bookingDetailAuth_divider}>
            <hr className={styles.bookingDetailAuth_divider__line} />
            <span className={styles.bookingDetailAuth_divider__text}>Or</span>
            <hr className={styles.bookingDetailAuth_divider__line} />
          </div>

          <div className={styles.bookingDetailAuth_socials}>
            <SocialAuthGroup />

            <div className={styles.bookingDetailAuth_button}>
              <button
                type="button"
                className={styles.bookingDetailAuth_button__emailBtn}
              >
                <svg width={24} height={24}>
                  <use href={sprite + "#icon-ion_mail"} />
                </svg>
                Continue with email
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
