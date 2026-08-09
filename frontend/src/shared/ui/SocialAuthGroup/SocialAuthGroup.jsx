import { Link } from "react-router-dom";
import sprite from "../../assets/icons/symbol-defs.svg";
import styles from "./SocialAuthGroup.module.scss";

export const SocialAuthGroup = () => {
  return (
    <div className={styles.socialAuthGroup}>
      <Link to="/" className={styles.socialAuthGroup_item}>
        <svg width={24} height={24}>
          <use href={sprite + "#icon-facebook"} />
        </svg>
      </Link>

      <Link to="/" className={styles.socialAuthGroup_item}>
        <svg width={24} height={24}>
          <use href={sprite + "#icon-flat-color-icons_google"} />
        </svg>
      </Link>

      <Link to="/" className={styles.socialAuthGroup_item}>
        <svg width={24} height={24}>
          <use href={sprite + "#icon-ant-design_apple-filled"} />
        </svg>
      </Link>
    </div>
  );
};
