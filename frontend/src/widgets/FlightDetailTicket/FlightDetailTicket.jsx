import sprite from "../../shared/assets/icons/symbol-defs.svg";
import imageURL from "../../shared/assets/image/emirates.svg";
import styles from "./FlightDetailTicket.module.scss";

export const FlightDetailTicket = () => {
  return (
    <section className={styles.flightDetailTicket}>
      <div className={styles.flightDetailTicket_header}>
        <h2 className={styles.flightDetailTicket_header__title}>
          Return Wed, Dec 8
        </h2>
        <p className={styles.flightDetailTicket_header__text}>2h 28m</p>
      </div>
      <div className={styles.flightDetailTicket_main}>
        <div className={styles.flightDetailTicket_main__place}>
          <div
            style={{
              backgroundImage: `url(${imageURL})`,
              width: "64px",
              height: "44px",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          ></div>
          <div className={styles.flightDetailTicket_main__place__info}>
            <h2 className={styles.flightDetailTicket_main__place__info__title}>
              Emirates
            </h2>
            <p className={styles.flightDetailTicket_main__place__info__text}>
              Airbus A320
            </p>
          </div>
        </div>
        <div className={styles.flightDetailTicket_main__services}>
          <div className={styles.flightDetailTicket_main__services__item}>
            <svg
              className={styles.flightDetailTicket_main__services__item__svg}
              width={24}
              height={24}
            >
              <use href={sprite + "#icon-airplane"} />
            </svg>
          </div>
          <div className={styles.flightDetailTicket_main__services__item}>
            <svg
              className={styles.flightDetailTicket_main__services__item__svg}
              width={24}
              height={24}
            >
              <use href={sprite + "#icon-Wifi"} />
            </svg>
          </div>
          <div className={styles.flightDetailTicket_main__services__item}>
            <svg
              className={styles.flightDetailTicket_main__services__item__svg}
              width={24}
              height={24}
            >
              <use href={sprite + "#icon-Vector"} />
            </svg>
          </div>
          <div className={styles.flightDetailTicket_main__services__item}>
            <svg
              className={styles.flightDetailTicket_main__services__item__svg}
              width={24}
              height={24}
            >
              <use href={sprite + "#icon-ion_fast-food"} />
            </svg>
          </div>
          <div className={styles.flightDetailTicket_main__services__item}>
            <svg
              className={styles.flightDetailTicket_main__services__item__svg}
              width={24}
              height={24}
            >
              <use
                href={sprite + "#icon-ic_round-airline-seat-recline-normal"}
              />
            </svg>
          </div>
        </div>
      </div>
      <div className={styles.flightDetailTicket_footer}>
        <div className={styles.flightDetailTicket_footer__block}>
          <h2 className={styles.flightDetailTicket_footer__block__title}>
            12:00 pm
          </h2>
          <p className={styles.flightDetailTicket_footer__block__text}>
            Newark(EWR)
          </p>
        </div>
        <div className={styles.flightDetailTicket_footer__divider}>
          <div className={styles.flightDetailTicket_footer__divider__dot}></div>
          <div
            className={styles.flightDetailTicket_footer__divider__line}
          ></div>

          <svg width={24} height={24}>
            <use href={sprite + "#icon-airplane"} />
          </svg>

          <div
            className={styles.flightDetailTicket_footer__divider__line}
          ></div>
          <div className={styles.flightDetailTicket_footer__divider__dot}></div>
        </div>
        <div className={styles.flightDetailTicket_footer__block}>
          <h2 className={styles.flightDetailTicket_footer__block__title}>
            12:00 pm
          </h2>
          <p className={styles.flightDetailTicket_footer__block__text}>
            Newark(EWR)
          </p>
        </div>
      </div>
    </section>
  );
};
