import sprite from "../../shared/assets/icons/symbol-defs.svg";
import logo from "../../shared/assets/image/Ellipse 1.jpg";
import styles from "./DetailReviews.module.scss";
import {getRatingStatus} from "../../shared/lib/format.js";

export const DetailReviews = ({data, isOpen}) => {
  return (
    <section className={styles.hotelDetailReviews}>
      <div className={styles.hotelDetailReviews_block}>
        <div className={styles.hotelDetailReviews_block__header}>
          <h2 className={styles.hotelDetailReviews_block__header__title}>
            Reviews
          </h2>
          <button className={styles.hotelDetailReviews_block__header__btn} onClick={isOpen}>
            Give your review
          </button>
        </div>

        <div className={styles.hotelDetailReviews_block__assessment}>
          <h1 className={styles.hotelDetailReviews_block__assessment__title}>
            {data.rating}
          </h1>
          <div className={styles.hotelDetailReviews_block__assessment__block}>
            <h2
              className={
                styles.hotelDetailReviews_block__assessment__block__title
              }
            >
              {getRatingStatus(data.ratingStatus)}
            </h2>
            <p
              className={styles.hotelDetailReviews_block__assessment__block__p}
            >
              {data.reviewsCount} verified reviews
            </p>
          </div>
        </div>

        <hr className={styles.hotelDetailReviews_block__hr} />

        <div className={styles.hotelDetailReviews_block__info}>
          {data.reviews?.map((item) => (
            <div
              key={item.id}
              className={styles.hotelDetailReviews_block__info__full}
            >
              <div
                className={styles.hotelDetailReviews_block__info__full__reviews}
              >
                <img
                  src={item.avatarUrl || logo}
                  alt={item.authorName}
                  className={
                    styles.hotelDetailReviews_block__info__full__reviews__img
                  }
                />

                <div
                  className={
                    styles.hotelDetailReviews_block__info__full__reviews__text
                  }
                >
                  <div
                    className={
                      styles.hotelDetailReviews_block__info__full__reviews__text__header
                    }
                  >
                    <b>{item.rating}</b> | {item.authorName}
                  </div>
                  <p
                    className={
                      styles.hotelDetailReviews_block__info__full__reviews__text__p
                    }
                  >
                    {item.text}
                  </p>
                </div>

                <svg width={20} height={20}>
                  <use href={sprite + "#icon-Flag"} />
                </svg>
              </div>

              <hr className={styles.hotelDetailReviews_block__info__full__hr} />
            </div>
          ))}
        </div>

        <div className={styles.hotelDetailReviews_block__button}>
          <button className={styles.hotelDetailReviews_block__button__btn}>
            <svg
              width={24}
              height={24}
              className={styles.hotelDetailReviews_block__button__btn__one}
            >
              <use href={sprite + "#icon-chevron_down"} />
            </svg>
          </button>
          <p className={styles.hotelDetailReviews_block__button__p}>1 of 40</p>
          <button className={styles.hotelDetailReviews_block__button__btn}>
            <svg
              width={24}
              height={24}
              className={styles.hotelDetailReviews_block__button__btn__two}
            >
              <use href={sprite + "#icon-chevron_down"} />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};
