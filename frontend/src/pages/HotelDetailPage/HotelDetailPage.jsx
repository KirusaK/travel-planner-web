import { Header } from "../../widgets/Header/Header.jsx";
import { HotelDetailInfo } from "../../widgets/HotelDetailInfo/HotelDetailInfo.jsx";
import { useParams } from "react-router-dom";
import { HotelDetailGallery } from "../../widgets/HotelDetailGallery/HotelDetailGallery.jsx";
import { HotelDetailOverview } from "../../widgets/HotelDetailOverview/HotelDetailOverview.jsx";
import { HotelAvailableRooms } from "../../widgets/HotelAvailableRooms/HotelAvailableRooms.jsx";
import { HotelDetailLocation } from "../../widgets/HotelDetailLocation/HotelDetailLocation.jsx";
import { HotelDetailAmenities } from "../../widgets/HotelDetailAmenities/HotelDetailAmenities.jsx";
import { HotelDetailReviews } from "../../widgets/HotelDetailReviews/HotelDetailReviews.jsx";
import { Subscribe } from "../../widgets/Subscribe/Subscribe.jsx";
import { Footer } from "../../widgets/Footer/Footer.jsx";
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
          id={hotel.id}
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
        <HotelAvailableRooms rooms={hotel.rooms} />
        <HotelDetailLocation
          location={hotel.location}
          googleMapsUrl={hotel.googleMapsUrl}
          mapEmbedUrl={hotel.mapEmbedUrl}
        />
        <HotelDetailAmenities amenitiesList={hotel.amenitiesList} />
        <HotelDetailReviews
          rating={hotel.rating}
          ratingStatus={hotel.ratingStatus}
          countReviews={hotel.countReviews}
          reviews={hotel.reviews}
        />
      </div>

      <Subscribe />
      <Footer />
    </>
  );
};
