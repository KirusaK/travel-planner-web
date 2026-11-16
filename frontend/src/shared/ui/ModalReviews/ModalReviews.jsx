import sprite from "../../../shared/assets/icons/symbol-defs.svg";
import styles from "./ModalReviews.module.scss";
import { useState } from "react";

const stars = [1, 2, 3, 4, 5];

export const ModalReviews = ({ modal, onClose, title }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  if (!modal) return null;

  const handleClose = () => {
    setRating(0);
    setHoverRating(0);
    onClose();
  };

  const shownRating = hoverRating || rating;

  return (
    <div className={styles.modalReviews}>
      <div
        className={styles.modalReviews_block}
        onClick={(e) => e.stopPropagation()}
      >
        <section className={styles.modalReviews_header}>
          <div className={styles.modalReviews_header__blockText}>
            <h2 className={styles.modalReviews_header__title}>
              Give your review
            </h2>
            <p className={styles.modalReviews_header_subtitle}>{title}</p>
          </div>

          <button
            onClick={handleClose}
            className={styles.modalReviews_header__btnClose}
          >
            <svg width={18} height={18}>
              <use href={sprite + "#icon-cross"} />
            </svg>
          </button>
        </section>

        <hr className={styles.modalReviews_hr} />

        <section className={styles.modalReviews_rating}>
          <h3 className={styles.modalReviews_rating__title}>Your rating</h3>

          <div
            className={styles.modalReviews_rating__stars}
            onMouseLeave={() => setHoverRating(0)}
          >
            {stars.map((item) => (
              <button
                key={item}
                type="button"
                aria-label={`${item} star${item > 1 ? "s" : ""}`}
                className={styles.modalReviews_rating__star}
                onClick={() => setRating(item)}
                onMouseEnter={() => setHoverRating(item)}
              >
                <svg
                  width={36}
                  height={36}
                  className={`${styles.modalReviews_rating__icon} ${
                    item <= shownRating
                      ? styles.modalReviews_rating__icon___active
                      : ""
                  }`}
                >
                  <use href={sprite + "#icon-ion_star"} />
                </svg>
              </button>
            ))}

            <span className={styles.modalReviews_rating__value}>
              {rating} / 5
            </span>
          </div>
        </section>

        <section className={styles.modalReviews_review}>
          <label form="reviews" className={styles.modalReviews_review__label}>
            Your review
          </label>
          <textarea
            id="reviews"
            name="reviews"
            placeholder="Tell other what you liked about your stay"
            className={styles.modalReviews_review__textarea}
          ></textarea>
        </section>

        <section className={styles.modalReviews_btn}>
          <button
            className={styles.modalReviews_btn__cancel}
            onClick={handleClose}
          >
            Cancel
          </button>
          <button className={styles.modalReviews_btn__review}>
            Submit review
          </button>
        </section>
      </div>
    </div>
  );
};
