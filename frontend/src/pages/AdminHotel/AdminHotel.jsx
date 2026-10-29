import styles from "./AdminHotel.module.scss";
import { AdminNav } from "../../widgets/AdminNav/AdminNav.jsx";
import { AdminHeader } from "../../widgets/AdminHeader/AdminHeader.jsx";
import sprite from "../../shared/assets/icons/symbol-defs.svg";
import { AdminHotelsTable } from "../../widgets/AdminHotelsTable/AdminHotelsTable.jsx";
import {AdminModalHotel} from "../../widgets/AdminModalHotel/AdminModalHotel.jsx";
import { useState } from "react";
import { useFetchData } from "../../shared/hooks/useFetchData.js";
import { getHotels } from "../../shared/api/hotels.js";

export const AdminHotel = () => {
  const [isMoadalOpen, setIsMoadalOpen] = useState(false);
  const {
    data: hotels = [],
    loading,
    error
  } = useFetchData(getHotels);

  const hotelsCount = hotels.length;

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
                onClick={() => setIsMoadalOpen(true)}
              >
                <svg width={16} height={16}>
                  <use href={sprite + "#icon-Frame7"} />
                </svg>
                Add New Hotel
              </button>
            </div>

            <AdminHotelsTable />

            <AdminModalHotel
              isOpen={isMoadalOpen}
              isClose={() => setIsMoadalOpen(false)}
            />
          </div>
        </div>
      </div>
    </section>
  );
};