import styles from "./AdminUsersTable.module.scss";
import image from "../../shared/assets/image/Ellipse 1.jpg";
import { ButtonDelete } from "../../shared/ui/ButtonDelete/ButtonDelete.jsx";
import { Badge } from "../../shared/ui/Badge/Badge.jsx";

export const AdminUsersTable = ({users, loading, error}) => {


  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>;

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
            <span className={styles.usersTable__number}>
              {item.phoneNumber}
            </span>

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