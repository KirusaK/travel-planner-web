import { SeeAll } from "../../shared/ui/ButtonSeeAll/SeeAll";
import { ReviewSlider } from "./ui/ReviewSlider/ReviewSlider";
import img1 from "../../shared/assets/image/fon1.svg";
import img2 from "../../shared/assets/image/fon2.svg";
import img3 from "../../shared/assets/image/fon3.svg";
import styles from "./Reviews.module.scss";

export const Reviews = () => {
  const reviewsData = [
    {
      id: 1,
      title: "A real sense of community, nurtured",
      par: "Really appreciate the help and support from the staff during these tough times. Shoutout to Katie for... ",
      rating: 5,
      authorname: "Olga",
      location: "Weave Studios – Kai Tak",
      photo: img1,
    },
    {
      id: 2,
      title: "The facilities are superb. Clean, slick, bright.",
      par: "“A real sense of community, nurtured”Really appreciate the help and support from the staff...  ",
      rating: 5,
      authorname: "Thomas",
      location: "Weave Studios – Olympic",
      photo: img2,
    },
    {
      id: 3,
      title: "A real sense of community, nurtured",
      par: "Really appreciate the help and support from the staff during these tough times. Shoutout to Katie for... ",
      rating: 5,
      authorname: "Eliot",
      location: "Weave Studios – Kai Tak",
      photo: img3,
    },
  ];

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
          <SeeAll />
        </div>
        <ReviewSlider reviews={reviewsData} />
      </div>
    </section>
  );
};
