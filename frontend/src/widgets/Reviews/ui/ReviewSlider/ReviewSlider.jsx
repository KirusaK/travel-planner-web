import { useRef } from "react";
import { ReviewCard } from "../ReviewCard/ReviewCard";
import styles from "./ReviewSlider.module.scss";

export const ReviewSlider = (props) => {
  const { reviews } = props;
  const sliderRef = useRef(null);

  const handleMouseDown = (e) => {
    const slider = sliderRef.current;
    slider.isDown = true;
    slider.startX = e.pageX - slider.offsetLeft;
    slider.scrollLeftStart = slider.scrollLeft;
  };

  const handleMouseMove = (e) => {
    const slider = sliderRef.current;

    if (!slider.isDown) return;

    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = x - slider.startX;
    slider.scrollLeft = slider.scrollLeftStart - walk;
  };

  const handleMouseUp = () => {
    sliderRef.current.isDown = false;
  };

  return (
    <section className={styles.ReviewSlider}>
      <div
        className={styles.ReviewSlider__container}
        ref={sliderRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {reviews.map((item) => (
          <ReviewCard key={item.id} {...item} />
        ))}
      </div>
    </section>
  );
};
