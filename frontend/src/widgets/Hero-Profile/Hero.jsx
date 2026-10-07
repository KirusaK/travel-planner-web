import styles from "./Hero.module.scss";
import uploadIcon from "../../shared/assets/image/Upload.svg";
import avatar from "../../shared/assets/image/avatar.png";
import uploadIcon2 from "../../shared/assets/image/Pen.svg";
import Cover from "../../shared/assets/image/cover.svg";

export const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.hero_cover}>
        <img src={Cover} alt="Cover" className={styles.hero_coverImage} />
        <button className={styles.hero_coverButton}>
          <img src={uploadIcon} alt="Upload Cover" />
          Upload new cover
        </button>
      </div>

      <div className={styles.hero_user}>
        <div className={styles.hero_userImage}>
          <img src={avatar} alt="Profile" className={styles.hero_avatar} />
          <button className={styles.hero_editButton}>
            <img src={uploadIcon2} alt="Edit Profile" />
          </button>
        </div>
        <h1>John Doe</h1>

        <p>john.doe@gmail.com</p>
      </div>
    </section>
  );
};
