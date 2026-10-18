import styles from "./AdminUsersTable.module.scss";
import image from "../../shared/assets/image/Ellipse 1.jpg";
import { ButtonDelete } from "../../shared/ui/ButtonDelete/ButtonDelete.jsx";
import { Badge } from "../../shared/ui/Badge/Badge.jsx";

export const AdminUsersTable = () => {
  const users = [
    {
      id: 1,
      firstName: "Tomhoon",
      lastName: "Lee",
      email: "tomhoon@gmail.com",
      phone: "+1 202 555 0143",
      country: "United States",
      joined: "2026-02-14",
      bookingsCount: 8,
      status: "Active",
    },
    {
      id: 2,
      firstName: "Amelia",
      lastName: "Watson",
      email: "amelia.w@outlook.com",
      phone: "+44 20 7946 0958",
      country: "United Kingdom",
      joined: "2026-03-02",
      bookingsCount: 5,
      status: "Active",
    },
    {
      id: 3,
      firstName: "Mehmet",
      lastName: "Yılmaz",
      email: "mehmet.y@gmail.com",
      phone: "+90 212 555 0199",
      country: "Turkey",
      joined: "2026-04-21",
      bookingsCount: 12,
      status: "Active",
    },
    {
      id: 4,
      firstName: "Sofia",
      lastName: "Rossi",
      email: "sofia.rossi@libero.it",
      phone: "+39 06 555 0123",
      country: "Italy",
      joined: "2026-05-09",
      bookingsCount: 2,
      status: "Inactive",
    },
    {
      id: 5,
      firstName: "Ahmed",
      lastName: "Al Mansoori",
      email: "ahmed.m@etisalat.ae",
      phone: "+971 4 555 0177",
      country: "UAE",
      joined: "2026-06-17",
      bookingsCount: 7,
      status: "Active",
    },
    {
      id: 6,
      firstName: "Lucas",
      lastName: "Martín",
      email: "lucas.martin@gmail.com",
      phone: "+54 11 5555 0101",
      country: "Argentina",
      joined: "2026-07-03",
      bookingsCount: 1,
      status: "Suspended",
    },
    {
      id: 7,
      firstName: "Hana",
      lastName: "Suzuki",
      email: "hana.s@yahoo.co.jp",
      phone: "+81 3 5555 0188",
      country: "Japan",
      joined: "2026-08-25",
      bookingsCount: 4,
      status: "Active",
    },
  ];

  const status = {
    Active: "success",
    Inactive: "neutral",
    Suspended: "danger",
  };

  return (
    <section className={styles.usersTable}>
      <div className={styles.usersTable__header}>
        <span className={styles.usersTable__headerCol}>User</span>
        <span className={styles.usersTable__headerCol}>Phone</span>
        <span className={styles.usersTable__headerCol}>Country</span>
        <span className={styles.usersTable__headerCol}>Joined</span>
        <span className={styles.usersTable__headerCol}>Bookings</span>
        <span className={styles.usersTable__headerCol}>Status</span>
        <span className={styles.usersTable__headerCol}>Actions</span>
      </div>

      <div className={styles.usersTable__list}>
        {users.map((item) => (
          <div key={item.id} className={styles.usersTable__row}>
            <div className={styles.usersTable__userInfo}>
              <img src={image} alt="" className={styles.usersTable__avatar} />

              <div className={styles.usersTable__textGroup}>
                <h3 className={styles.usersTable__userName}>
                  {item.firstName} {item.lastName}
                </h3>
                <span className={styles.usersTable__userEmail}>
                  {item.email}
                </span>
              </div>
            </div>
            <span className={styles.usersTable__number}>{item.phone}</span>

            <span className={styles.usersTable__item}>{item.country}</span>

            <span className={styles.usersTable__joined}>{item.joined}</span>

            <span className={styles.usersTable__item}>
              <b>{item.bookingsCount}</b>
            </span>

            <Badge variant={status[item.status]}>{item.status}</Badge>

            <ButtonDelete />
          </div>
        ))}
      </div>
    </section>
  );
};