import styles from "./AdminUsers.module.scss";
import { AdminNav } from "../../widgets/AdminNav/AdminNav.jsx";
import { AdminHeader } from "../../widgets/AdminHeader/AdminHeader.jsx";
import { AdminUsersTable } from "../../widgets/AdminUsersTable/AdminUsersTable.jsx";
import {useFetchData} from "../../shared/hooks/useFetchData.js";
import {getUsers} from "../../shared/api/users.js";

export const AdminUsers = () => {
  const { data: users = [], loading, error } = useFetchData(getUsers);
  const countUsers = users.length;
  const activeUsers = users.filter(u => u.status === "Active").length;

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
                {countUsers} registered users · {activeUsers} active
              </p>
            </div>

            <AdminUsersTable users={users} loading={loading} error={error} />
          </div>
        </div>
      </div>
    </section>
  );
};
