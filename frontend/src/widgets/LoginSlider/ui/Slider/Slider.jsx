import { useRef } from "react";
import { SliderCard } from "../SliderCard/SliderCard";
import styles from "./Slider.module.scss";

export const Slider = (props) => {
  const { data } = props;
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
    <section className={styles.Slider}>
      <div
        className={styles.Slider__container}
        ref={sliderRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {data.map((item) => (
          <SliderCard key={item.id} image={item.image} />
        ))}
      </div>
    </section>
  );
};
