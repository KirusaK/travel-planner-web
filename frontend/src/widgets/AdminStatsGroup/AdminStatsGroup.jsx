import sprite from "../../shared/assets/icons/symbol-defs.svg";
import styles from "./AdminStatsGroup.module.scss";
import { Link } from "react-router-dom";

export const AdminStatsGroup = ({users, flights, hotels, bookings, loading, error}) => {
  const usersCount = users.length;
  const flightsCount = flights.length;
  const hotelsCount = hotels.length;
  const bookingsCount = bookings.length;

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>;

  const statsData = [
    {
      id: "bookings",
      title: "Bookings",
      count: bookingsCount,
      icon: "#icon-Frame4",
      link: "/AdminBookings",
    },
    {
      id: "flights",
      title: "Active Flights",
      count: flightsCount,
      icon: "#icon-Frame1",
      link: "/AdminFlight",
    },
    {
      id: "hotels",
      title: "Listed Hotels",
      count: hotelsCount,
      icon: "#icon-Frame2",
      link: "/AdminHotel",
    },
    {
      id: "users",
      title: "Registered Users",
      count: usersCount,
      icon: "#icon-Frame3",
      link: "/AdminUsers",
    },
  ];

  return (
    <section className={styles.statsGroup}>
      {statsData.map((item) => (
        <Link key={item.id} to={item.link} className={styles.statsGroup_card}>
          <div className={styles.statsGroup_top}>
            <div className={styles.statsGroup_iconWrapper}>
              <svg
                width={20}
                height={20}
                className={styles.statsGroup_icon}
                style={{ "--color1": "#112211" }}
              >
                <use href={sprite + `${item.icon}`} />
              </svg>
            </div>

            <svg width={16} height={16} className={styles.statsGroup_arrow}>
              <use href={sprite + `#icon-Frame6`} />
            </svg>
          </div>

          <div className={styles.statsGroup_content}>
            <p className={styles.statsGroup_title}>{item.title}</p>
            <span className={styles.statsGroup_count}>{item.count}</span>
          </div>
        </Link>
      ))}
    </section>
  );
};