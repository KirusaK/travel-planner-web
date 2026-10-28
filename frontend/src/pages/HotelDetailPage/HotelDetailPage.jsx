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
import styles from "./HotelDetailPage.module.scss";
import { useEffect, useState } from "react";
import { getHotelById } from "../../shared/api/hotels.js";
import { getRatingStatus, getStars } from "../../shared/lib/format.js";

export const HotelDetailPage = () => {
  const { id } = useParams();

  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    getHotelById(id)
      .then((data) => setHotel(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!hotel) return null;

  return (
    <>
      <Header hasShadow={true} />

      <div className={styles.main}>
        <HotelDetailInfo
          id={hotel.id}
          name={hotel.name}
          stars={getStars(hotel.rating)}
          price={hotel.pricePerNight}
          location={hotel.address}
          rating={hotel.rating}
          ratingStatus={getRatingStatus(hotel.rating)}
          countReviews={hotel.reviewsCount}
        />
        <HotelDetailGallery
          photos={hotel.rooms.map((room) => room.imageUrl).filter(Boolean)}
        />
        <HotelDetailOverview
          description={hotel.description}
          rating={hotel.rating}
          ratingStatus={getRatingStatus(hotel.rating)}
          countReviews={hotel.reviewsCount}
          features={hotel.features}
        />
        <HotelAvailableRooms rooms={hotel.rooms} />
        <HotelDetailLocation
          location={hotel.address}
          googleMapsUrl={hotel.googleMapsUrl}
          mapEmbedUrl={hotel.mapEmbedUrl}
        />
        <HotelDetailAmenities amenitiesList={hotel.amenities} />
        <HotelDetailReviews
          rating={hotel.rating}
          ratingStatus={getRatingStatus(hotel.rating)}
          countReviews={hotel.reviewsCount}
          reviews={hotel.reviews}
        />
      </div>

      <Subscribe />
      <Footer />
    </>
  );
};
