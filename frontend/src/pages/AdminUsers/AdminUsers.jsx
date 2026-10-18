import styles from "./AdminUsers.module.scss";
import { AdminNav } from "../../widgets/AdminNav/AdminNav.jsx";
import { AdminHeader } from "../../widgets/AdminHeader/AdminHeader.jsx";
import sprite from "../../shared/assets/icons/symbol-defs.svg";
import { AdminHotelsTable } from "../../widgets/AdminHotelsTable/AdminHotelsTable.jsx";
import { AdminUsersTable } from "../../widgets/AdminUsersTable/AdminUsersTable.jsx";

export const AdminUsers = () => {
  return (
    <section>
      <div className={styles.main}>
        <AdminNav />
        <div className={styles.info}>
          <AdminHeader />

          <div className={styles.body}>
            <div className={styles.body_headerBlock}>
              <h1 className={styles.body_headerBlock_title}>Users</h1>
              <p className={styles.body_headerBlock_subtitle}>
                7 registered users · 5 active
              </p>
            </div>

            <AdminUsersTable />
          </div>
        </div>
      </div>
    </section>
  );
};
