import sprite from "../../shared/assets/icons/symbol-defs.svg";
import styles from "./AdminBookingsTable.module.scss";
import { Badge } from "../../shared/ui/Badge/Badge.jsx";

const AdminBookingsTable = ({bookings, loading, error}) => {
  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>;

  const icons = {
    flight: "#icon-Frame1",
    hotel: "#icon-Frame2",
  };

  const variants  = {
    Full: "success",
    Partial: "warning",
    Confirmed: "success",
    Pending: "warning",
    Completed: "dark",
    Cancelled: "danger",
  };

  return (
    <section className={styles.bookingsTable}>
      <div className={styles.bookingsTable__header}>
        <span className={styles.bookingsTable__headerCol}>Booking</span>
        <span className={styles.bookingsTable__headerCol}>Customer</span>
        <span className={styles.bookingsTable__headerCol}>Item</span>
        <span className={styles.bookingsTable__headerCol}>Date</span>
        <span className={styles.bookingsTable__headerCol}>Payment</span>
        <span className={styles.bookingsTable__headerCol}>Amount</span>
        <span className={styles.bookingsTable__headerCol}>Status</span>
      </div>

      <div className={styles.bookingsTable__list}>
        {bookings.map((item) => (
          <div key={item.id} className={styles.bookingsTable__row}>
            <h3 className={styles.bookingsTable__id}>{item.id}</h3>

            <div className={styles.bookingsTable__customer}>
              <p className={styles.bookingsTable__customerName}>
                {item.customerName}
              </p>
              <span className={styles.bookingsTable__customerEmail}>
                {item.customerEmail}
              </span>
            </div>

            <div className={styles.bookingsTable__item}>
              <div className={styles.bookingsTable__iconWrapper}>
                <svg
                  width={16}
                  height={16}
                  className={styles.bookingsTable__icon}
                >
                  <use href={sprite + icons[item.itemType]} />
                </svg>
              </div>

              <span className={styles.bookingsTable__itemTitle}>
                {item.title}
              </span>
            </div>

            <span className={styles.bookingsTable__date}>
              {item.date}
            </span>

            <Badge variant={variants[item.payment]}>{item.payment}</Badge>

            <span className={styles.bookingsTable__amount}>${item.amount}</span>

            <Badge variant={variants[item.status]}>{item.status}</Badge>
          </div>
        ))}
      </div>
    </section>
  );
}
export default AdminBookingsTable