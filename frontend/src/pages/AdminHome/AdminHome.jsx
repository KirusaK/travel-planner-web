import styles from "./AdminHome.module.scss";
import { AdminNav } from "../../widgets/AdminNav/AdminNav.jsx";

export const AdminHome = () => {
  return (
    <section>
      <div className={styles.main}>
        <AdminNav />
        <div></div>
      </div>
    </section>
  );
};