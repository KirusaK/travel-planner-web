import { Link } from "react-router-dom";
import styles from "./SeeAll.module.scss";

export const SeeAll = () => {
  return (
    <div className={styles.travelMap__button}>
      <Link className={styles.travelMap__buttonLink} to="/">
        <h3 className={styles.travelMap__buttonText}>Zobacz wszystko</h3>
      </Link>
    </div>
  );
};
