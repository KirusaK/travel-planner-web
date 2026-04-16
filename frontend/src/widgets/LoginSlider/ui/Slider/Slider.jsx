import { SliderCard } from "../SliderCard/SliderCard";
import styles from "./Slider.module.scss";

export const Slider = (props) => {
  const { data } = props;
  return (
    <section className={styles.Slider}>
      <div className={styles.Slider__container}>
        {data.map((item) => (
          <SliderCard key={item.id} image={item.image} />
        ))}
      </div>
    </section>
  );
};
