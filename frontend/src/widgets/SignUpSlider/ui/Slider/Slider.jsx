import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import { SliderCard } from "../SliderCard/SliderCard";
import styles from "./Slider.module.scss";

export const Slider = ({ data }) => {
  return (
    <section className={styles.Slider}>
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        spaceBetween={20}
        slidesPerView={1}
        loop={true}
        className={styles.Slider__container}
      >
        {data.map((item) => (
          <SwiperSlide key={item.id}>
            <SliderCard image={item.image} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
