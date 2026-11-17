import { SeeAll } from "../../shared/ui/ButtonSeeAll/SeeAll";
import { ReviewSlider } from "./ui/ReviewSlider/ReviewSlider";
import { useFetchData } from "../../shared/hooks/useFetchData.js";
import { getReviews } from "../../shared/api/reviews.js";
import styles from "./Reviews.module.scss";

// const type_labels = { flight: "flight", hotel: "hotel" };

const toCard = (reviews) => ({
  id: reviews.id,
  title: reviews.itemTitle ?? "Golobe",
  text: reviews.text,
  rating: Math.round(reviews.rating),
  authorName: reviews.authorName,
});

export const Reviews = () => {
  const { data: review, loading, error } = useFetchData(getReviews);

  console.log({ review, loading, error });
  if (loading || error || !Array.isArray(review) || review.length === 0)
    return null;

  return (
    <section className={styles.Reviews}>
      <div className={styles.Reviews__container}>
        <div className={styles.Reviews__header}>
          <div className={styles.Reviews__text}>
            <h1 className={styles.Reviews__title}>Reviews</h1>
            <p className={styles.Reviews__par}>
              What people says about Golobe facilities
            </p>
          </div>
        </div>
        <ReviewSlider reviews={review.map(toCard)} />
      </div>
    </section>
  );
};
