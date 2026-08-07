import { Slider } from "./ui/Slider/Slider";
import img1 from "../../shared/assets/image/swiper_img_1.svg";
import img2 from "../../shared/assets/image/swiper_img_2.svg";
import styles from "./SignUpSlider.module.scss";

export const SignUpSlider = () => {
  const sliderData = [
    {
      id: 1,
      image: img1,
    },
    {
      id: 2,
      image: img2,
    },
  ];

  return (
    <section>
      <div>
        <Slider data={sliderData} />
      </div>
    </section>
  );
};
