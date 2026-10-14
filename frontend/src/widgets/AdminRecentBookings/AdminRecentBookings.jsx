import image from "../../shared/assets/image/Ellipse 1.jpg";
import styles from "./AdminRecentBookings.module.scss";

export const AdminRecentBookings = () => {
  const data = [
    {
      id: 1,
      name: "Tomhoon Lee",
      info: "BK-10284 · Emirates · EZE → IST",
      date: "Oct 12, 2026",
      status: "Confirmed",
      price: "104",
    },
    {
      id: 2,
      name: "Mehmet Yılmaz",
      info: "BK-10283 · CVK Park Bosphorus · 3 nights",
      date: "Oct 11, 2026",
      status: "Pending",
      price: "720",
    },
    {
      id: 3,
      name: "Amelia Watson",
      info: "BK-10282 · Flydubai · DXB → LHR",
      date: "Oct 10, 2026",
      status: "Confirmed",
      price: "186",
    },
    {
      id: 4,
      name: "Ahmed Al Mansoori",
      info: "BK-10281 · Atlantis The Palm · 2 nights",
      date: "Oct 9, 2026",
      status: "Confirmed",
      price: "1,040",
    },
    {
      id: 5,
      name: "Hana Suzuki",
      info: "BK-10280 · Qatar Airways · DOH → JFK",
      date: "Oct 8, 2026",
      status: "Completed",
      price: "240",
    },
    {
      id: 6,
      name: "Sofia Rossi",
      info: "BK-10279 · Hotel Artemide · 4 nights",
      date: "Oct 6, 2026",
      status: "Cancelled",
      price: "756",
    },
  ];

  const statusClass = {
    Confirmed: "recentBookings__statusBadge--confirmed",
    Pending: "recentBookings__statusBadge--pending",
    Completed: "recentBookings__statusBadge--completed",
    Cancelled: "recentBookings__statusBadge--cancelled",
  }

  return (
    <section className={styles.recentBookings}>
      <div className={styles.recentBookings__header}>
        <div className={styles.recentBookings__titles}>
          <h3 className={styles.recentBookings__title}>Recent bookings</h3>
          <p className={styles.recentBookings__subtitle}>
            Latest activity across the platform
          </p>
        </div>

        <button className={styles.recentBookings__viewAllBtn}>View all</button>
      </div>

      <div className={styles.recentBookings__list}>
        {data.map((item) => (
          <div key={item.id} className={styles.recentBookings__item}>
            <div className={styles.recentBookings__userInfo}>
              <img
                src={image}
                alt="profil"
                className={styles.recentBookings__avatar}
              />

              <div className={styles.recentBookings__userText}>
                <h3 className={styles.recentBookings__userName}>{item.name}</h3>
                <span className={styles.recentBookings__userMeta}>
                  {item.info}
                </span>
              </div>
            </div>

            <div className={styles.recentBookings__rightSide}>
              <div className={styles.recentBookings__statusWrapper}>
                <span className={styles.recentBookings__date}>{item.date}</span>

                <div className={`${styles.recentBookings__statusBadge} ${styles[statusClass[item.status]]}`} >
                  <span className={styles.recentBookings__statusText}>
                    {item.status}
                  </span>
                </div>
              </div>

              <span className={styles.recentBookings__price}>${item.price}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};