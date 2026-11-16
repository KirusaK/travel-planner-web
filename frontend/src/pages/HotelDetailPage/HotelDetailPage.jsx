import { Header } from "../../widgets/Header/Header.jsx";
import { HotelDetailInfo } from "../../widgets/HotelDetailInfo/HotelDetailInfo.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { HotelDetailGallery } from "../../widgets/HotelDetailGallery/HotelDetailGallery.jsx";
import { HotelDetailOverview } from "../../widgets/HotelDetailOverview/HotelDetailOverview.jsx";
import { HotelAvailableRooms } from "../../widgets/HotelAvailableRooms/HotelAvailableRooms.jsx";
import { HotelDetailLocation } from "../../widgets/HotelDetailLocation/HotelDetailLocation.jsx";
import { HotelDetailAmenities } from "../../widgets/HotelDetailAmenities/HotelDetailAmenities.jsx";
import { DetailReviews } from "../../widgets/DetailReviews/DetailReviews.jsx";
import { Subscribe } from "../../widgets/Subscribe/Subscribe.jsx";
import { Footer } from "../../widgets/Footer/Footer.jsx";
import styles from "./HotelDetailPage.module.scss";
import { getHotelById } from "../../shared/api/hotels.js";
import { useFetch } from "../../shared/hooks/useFetch.js";
import { useRef, useState } from "react";
import { ModalReviews } from "../../shared/ui/ModalReviews/ModalReviews.jsx";

export const HotelDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    data: hotel,
    setData: setHotel,
    loading,
    error,
  } = useFetch(getHotelById, id);
  const roomsSectionRef = useRef(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleBookDetailHotel = (roomId) => {
    navigate(`/booking-detail-hotel/${id}?room=${roomId}`);
  };

  const handleScrollToRomms = () => {
    roomsSectionRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleReviewAdded = ({ review, stats }) => {
    setHotel((prev) => ({
      ...prev,
      ...stats,
      reviews: [review, ...(prev.reviews ?? [])],
    }));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!hotel) return null;

  return (
    <>
      <Header hasShadow={true} />

      <div className={styles.main}>
        <HotelDetailInfo hotel={hotel} onBookClick={handleScrollToRomms} />
        <HotelDetailGallery
          photos={hotel.rooms.map((room) => room.imageUrl).filter(Boolean)}
        />
        <HotelDetailOverview hotel={hotel} />
        <HotelAvailableRooms
          hotel={hotel}
          sectionRef={roomsSectionRef}
          detailHotel={handleBookDetailHotel}
        />
        <HotelDetailLocation hotel={hotel} />
        <HotelDetailAmenities hotel={hotel} />
        <DetailReviews data={hotel} isOpen={handleModalOpen} />
      </div>

      <Subscribe />
      <Footer />

      <ModalReviews
        modal={isModalOpen}
        onClose={handleModalClose}
        title={hotel.name}
        itemType="hotel"
        itemId={hotel.id}
        onSubmitted={handleReviewAdded}
      />
    </>
  );
};
