import styles from "./AdminHotel.module.scss";
import { AdminNav } from "../../widgets/AdminNav/AdminNav.jsx";
import { AdminHeader } from "../../widgets/AdminHeader/AdminHeader.jsx";
import sprite from "../../shared/assets/icons/symbol-defs.svg";
import { AdminHotelsTable } from "../../widgets/AdminHotelsTable/AdminHotelsTable.jsx";
import {AdminModalHotel} from "../../widgets/AdminModalHotel/AdminModalHotel.jsx";
import { useState } from "react";
import { useFetchData } from "../../shared/hooks/useFetchData.js";
import {deleteHotel, getHotelById, getHotels} from "../../shared/api/hotels.js";

export const AdminHotel = () => {
  const [isMoadalOpen, setIsMoadalOpen] = useState(false);
  const [editingHotelId, setEditingHotelId] = useState(null);
  const [initialModalData, setInitialModalData] = useState(null);
  const {
    data: hotels = [],
    loading,
    error,
    refetch,
  } = useFetchData(getHotels);

  const hotelsCount = hotels.length;

  const handleDeleteHotels = async (id) => {
    if (!window.confirm("Are you sure you want to delete hotel?")) return;

    try {
      await deleteHotel(id);
      await refetch();
    } catch (err) {
      console.error("Error deleting hotel:", err.message);
    }
  }

  const handleOpenEditModal = async (id) => {
    try {
      const hotel = await getHotelById(id);

      setEditingHotelId(id)
      setInitialModalData({
        name: hotel.name,
        logoUrl: hotel.logoUrl || "",
        address: hotel.address,
        googleMapsUrl: hotel.googleMapsUrl || "",
        mapEmbedUrl: hotel.mapEmbedUrl || "",
        description: hotel.description || "",
        features: hotel.features ?? [],
        pricePerNight: hotel.pricePerNight,
        rooms: hotel.rooms.map((room) => ({
          title: room.title,
          price: room.price,
          imageUrl: room.imageUrl || "",
        })),
        amenitiesIds: hotel.amenities.map((a) => a.id),
      });
      setIsMoadalOpen(true);
    } catch (err) {
      console.error("Error loading hotel for edit:", err.message);
    }
  }

  const handleOpenCreateModal =  () => {
    setEditingHotelId(null);
    setInitialModalData(null);
    setIsMoadalOpen(true)
  }

  const handleCloseModal = () => {
    setIsMoadalOpen(false);
    setEditingHotelId(null);
    setInitialModalData(null);
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section>
      <div className={styles.main}>
        <AdminNav />
        <div className={styles.info}>
          <AdminHeader />

          <div className={styles.body}>
            <div className={styles.body_headerBlock}>
              <div className={styles.body_headerBlock_info}>
                <h1 className={styles.body_headerBlock_title}>
                  Hotel Management
                </h1>
                <p className={styles.body_headerBlock_subtitle}>
                  {hotelsCount} properties listed on Golobe
                </p>
              </div>

              <button
                className={styles.body_headerBlock_btn}
                onClick={handleOpenCreateModal}
              >
                <svg width={16} height={16}>
                  <use href={sprite + "#icon-Frame7"} />
                </svg>
                Add New Hotel
              </button>
            </div>

            <AdminHotelsTable hotels={hotels} onDelete={handleDeleteHotels} onUpdate={handleOpenEditModal} />

            <AdminModalHotel
              isOpen={isMoadalOpen}
              isClose={handleCloseModal}
              onCreated={refetch}
              editingId={editingHotelId}
              initialData={initialModalData}
            />
          </div>
        </div>
      </div>
    </section>
  );
};