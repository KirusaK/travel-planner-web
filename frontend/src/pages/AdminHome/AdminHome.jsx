import styles from "./AdminHome.module.scss";
import { AdminNav } from "../../widgets/AdminNav/AdminNav.jsx";
import { AdminHeader } from "../../widgets/AdminHeader/AdminHeader.jsx";
import { AdminStatsGroup } from "../../widgets/AdminStatsGroup/AdminStatsGroup.jsx";
import { AdminTopRated } from "../../widgets/AdminTopRated/AdminTopRated.jsx";
import {AdminRecentBookings} from "../../widgets/AdminRecentBookings/AdminRecentBookings.jsx";

export const AdminHome = () => {
  return (
    <section>
      <div className={styles.main}>
        <AdminNav />
        <div className={styles.info}>
          <AdminHeader />

          <div className={styles.body}>
            <h1 className={styles.body_title}>Welcome back, John</h1>
            <p className={styles.body_par}>
              Here's what's happening with Golobe bookings today.
            </p>

            <AdminStatsGroup />
            <AdminTopRated />
            <AdminRecentBookings />
          </div>
        </div>
      </div>
    </section>
  );
};