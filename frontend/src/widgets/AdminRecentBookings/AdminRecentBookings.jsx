import image from "../../shared/assets/image/Ellipse 1.jpg";
import styles from "./AdminRecentBookings.module.scss";
import { Link } from "react-router-dom";
import {useFetchData} from "../../shared/hooks/useFetchData.js";
import {getBookings} from "../../shared/api/users.js";

export const AdminRecentBookings = () => {
  const {
    data: bookings = [],
    loading,
    error,
  } = useFetchData(() => getBookings(6));

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const statusClass = {
    Confirmed: "recentBookings__statusBadge--confirmed",
    Pending: "recentBookings__statusBadge--pending",
    Completed: "recentBookings__statusBadge--completed",
    Cancelled: "recentBookings__statusBadge--cancelled",
  };

  return (
    <section className={styles.recentBookings}>
      <div className={styles.recentBookings__header}>
        <div className={styles.recentBookings__titles}>
          <h3 className={styles.recentBookings__title}>Recent bookings</h3>
          <p className={styles.recentBookings__subtitle}>
            Latest activity across the platform
          </p>
        </div>

        <Link className={styles.recentBookings__viewAllBtn} to="/AdminBookings">
          View all
        </Link>
      </div>

      <div className={styles.recentBookings__list}>
        {bookings.map((item) => (
          <div key={item.id} className={styles.recentBookings__item}>
            <div className={styles.recentBookings__userInfo}>
              <div className={styles.recentBookings__avatar}>
                {item.initials}
              </div>

              <div className={styles.recentBookings__userText}>
                <h3 className={styles.recentBookings__userName}>
                  {item.customerName}
                </h3>
                <span className={styles.recentBookings__userMeta}>
                  {item.id} {item.title}
                </span>
              </div>
            </div>

            <div className={styles.recentBookings__rightSide}>
              <div className={styles.recentBookings__statusWrapper}>
                <span className={styles.recentBookings__date}>{item.date}</span>

                <div
                  className={`${styles.recentBookings__statusBadge} ${styles[statusClass[item.status]]}`}
                >
                  <span className={styles.recentBookings__statusText}>
                    {item.status}
                  </span>
                </div>
              </div>

              <span className={styles.recentBookings__price}>
                ${item.amount}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};