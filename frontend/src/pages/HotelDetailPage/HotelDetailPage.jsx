import { Header } from "../../widgets/Header/Header.jsx";
import { HotelDetailInfo } from "../../widgets/HotelDetailInfo/HotelDetailInfo.jsx";
import { useParams } from "react-router-dom";
import { HotelDetailGallery } from "../../widgets/HotelDetailGallery/HotelDetailGallery.jsx";
import { HotelDetailOverview } from "../../widgets/HotelDetailOverview/HotelDetailOverview.jsx";
import { hotels } from "../../entities/hotel/index.js";
import styles from "./HotelDetailPage.module.scss";

export const HotelDetailPage = () => {
  const { id } = useParams();

  const hotel = hotels.find((hotel) => hotel.id === id);

  if (!hotel) {
    console.log("hotel not found!");
    return null;
  }

  return (
    <>
      <Header hasShadow={true} />
      <div className={styles.main}>
        <HotelDetailInfo
          name={hotel.hotelName}
          stars={hotel.stars}
          price={hotel.price}
          location={hotel.location}
          rating={hotel.rating}
          ratingStatus={hotel.ratingStatus}
          countReviews={hotel.countReviews}
        />
        <HotelDetailGallery />
        <HotelDetailOverview
          description={hotel.description}
          rating={hotel.rating}
          ratingStatus={hotel.ratingStatus}
          countReviews={hotel.countReviews}
          features={hotel.features}
        />
      </div>
    </>
  );
};
