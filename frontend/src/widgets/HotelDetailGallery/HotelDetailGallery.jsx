import hotelPhoto from "../../shared/assets/image/Hotel.svg";
import img1 from "../../shared/assets/image/Rectangle 5.jpg";
import img2 from "../../shared/assets/image/Rectangle 6.jpg";
import img3 from "../../shared/assets/image/Rectangle 7.jpg";
import img4 from "../../shared/assets/image/Rectangle 8.jpg";
import styles from "./HotelDetailGallery.module.scss";

export const HotelDetailGallery = () => {
  const galary = [img1, img2, img3, img4];

  return (
    <section className={styles.hotelDetailGallery}>
      <div className={styles.hotelDetailGallery_block}>
        <div
          className={styles.hotelDetailGallery_block__homePhoto}
          style={{ backgroundImage: `url(${hotelPhoto})` }}
        ></div>
        <div className={styles.hotelDetailGallery_block__morePhoto}>
          {galary.map((item, index) => (
            <div
              key={index}
              className={styles.hotelDetailGallery_block__morePhoto__item}
              style={{ backgroundImage: `url(${item})` }}
            ></div>
          ))}

          <button className={styles.hotelDetailGallery_block__morePhoto__btn}>
            View all photos
          </button>
        </div>
      </div>
      <hr className={styles.hotelDetailGallery_hr} />
    </section>
  );
};
