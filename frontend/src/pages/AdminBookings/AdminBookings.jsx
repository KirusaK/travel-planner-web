import styles from "./AdminBookings.module.scss";
import { AdminNav } from "../../widgets/AdminNav/AdminNav.jsx";
import { AdminHeader } from "../../widgets/AdminHeader/AdminHeader.jsx";
import AdminBookingsTable from "../../widgets/AdminBookingsTable/AdminBookingsTable.jsx";
import { useFetchData } from "../../shared/hooks/useFetchData.js";
import { getBookings } from "../../shared/api/bookings.js";
import {useMemo, useState} from "react";

const filters = [
  { key: "all", name: "All" },
  { key: "confirmed", name: "Confirmed", count: 3 },
  { key: "pending", name: "Pending", count: 2 },
  { key: "completed", name: "Completed", count: 2 },
  { key: "cancelled", name: "Cancelled", count: 1 },
];

export const AdminBookings = () => {
  const {
    data: bookings,
    loading,
    error,
  } = useFetchData(getBookings);
  const [activeFilter, setActiveFilter] = useState("all");

  const counts = useMemo(() => {
    const result = {all: bookings.length};
    for (const booking of bookings) {
      result[booking.status] = (result[booking.status] ?? 0) + 1;
    }

    return result;
  }, [bookings]);

  const filteredBookings = activeFilter === "all" ? bookings : bookings.filter((b) => b.status === activeFilter);

  return (
    <section>
      <div className={styles.main}>
        <AdminNav />
        <div className={styles.info}>
          <AdminHeader />

          <div className={styles.body}>
            <div className={styles.body_headerBlock}>
              <h1 className={styles.body_headerBlock_title}>Bookings</h1>
              <p className={styles.body_headerBlock_subtitle}>
                {bookings.length} bookings across flights and hotels
              </p>
            </div>

            <div className={styles.body_headerBlock_btnBlock}>
              {filters.map(({key, name}) => (
                  <button key={key} onClick={() => setActiveFilter(key)} className={`${styles.body_headerBlock_btn} ${activeFilter === key ? styles.body_headerBlock_btnActive : ""}`}>
                    {name} <span className={activeFilter === key ? styles.body_headerBlock_btnActive__span : ""}>{counts[key] ?? 0}</span>
                  </button>
              ))}
            </div>

            <AdminBookingsTable bookings={filteredBookings} loading={loading} error={error} />
          </div>
        </div>
      </div>
    </section>
  );
}