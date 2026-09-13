import photo1 from "../../shared/assets/image/photo1.svg";
import photo2 from "../../shared/assets/image/photo2.svg";
import photo3 from "../../shared/assets/image/photo3.svg";
import photo4 from "../../shared/assets/image/photo4.svg";
import photo5 from "../../shared/assets/image/photo5.svg";
import photo6 from "../../shared/assets/image/photo6.svg";
import photo7 from "../../shared/assets/image/photo7.svg";
import photo8 from "../../shared/assets/image/photo8.svg";
import photo9 from "../../shared/assets/image/photo9.svg";
import styles from "./FlightDetailFeatures.module.scss";

export const FlightDetailFeatures = () => {
  const image = [
    photo1,
    photo2,
    photo3,
    photo4,
    photo5,
    photo6,
    photo7,
    photo8,
    photo9,
  ];

  return (
    <section className={styles.flightDetailFeatures}>
      <div className={styles.flightDetailFeatures_header}>
        <h2 className={styles.flightDetailFeatures_header__title}>
          Basic Economy Features
        </h2>
        <div className={styles.flightDetailFeatures_header__type}>
          <div className={styles.flightDetailFeatures_header__checkbox}>
            <input type={"checkbox"} id="economy" />
            <label htmlFor={"economy"}>Economy</label>
          </div>
          <div className={styles.flightDetailFeatures_header__checkbox}>
            <input type={"checkbox"} id="firstClass" />
            <label htmlFor={"firstClass"}>First Class</label>
          </div>
          <div className={styles.flightDetailFeatures_header__checkbox}>
            <input type={"checkbox"} id="businesClass" />
            <label htmlFor={"businesClass"}>Busines Class</label>
          </div>
        </div>
      </div>
      <div className={styles.flightDetailFeatures_photo}>
        {image.map((item, index) => {
          return (
            <div
              key={index}
              className={styles.flightDetailFeatures_photo__block}
            >
              <img src={item} alt={"Flight feature"} />
            </div>
          );
        })}
      </div>
    </section>
  );
};
