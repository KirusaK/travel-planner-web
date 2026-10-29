import styles from "./AdminBookings.module.scss";
import { AdminNav } from "../../widgets/AdminNav/AdminNav.jsx";
import { AdminHeader } from "../../widgets/AdminHeader/AdminHeader.jsx";
import AdminBookingsTable from "../../widgets/AdminBookingsTable/AdminBookingsTable.jsx";
import { useFetchData } from "../../shared/hooks/useFetchData.js";
import { getBookings } from "../../shared/api/users.js";

export const AdminBookings = () => {
  const {
    data: bookings,
    loading,
    error,
  } = useFetchData(getBookings);
  const countBookings = bookings.length;


  const btn = [
    { id: 1, name: "All", count: countBookings },
    { id: 2, name: "Confirmed", count: 3 },
    { id: 3, name: "Pending", count: 2 },
    { id: 4, name: "Completed", count: 2 },
    { id: 5, name: "Cancelled", count: 1 },
  ];

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
                {countBookings} bookings across flights and hotels
              </p>
            </div>

            <div className={styles.body_headerBlock_btnBlock}>
              {btn.map((item) => (
                <div key={item.id}>
                  <button className={styles.body_headerBlock_btn}>
                    {item.name} {item.count}
                  </button>
                </div>
              ))}
            </div>

            <AdminBookingsTable bookings={bookings} loading={loading} error={error} />
          </div>
        </div>
      </div>
    </section>
  );
}