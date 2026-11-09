import styles from "./AdminUsers.module.scss";
import { AdminNav } from "../../widgets/AdminNav/AdminNav.jsx";
import { AdminHeader } from "../../widgets/AdminHeader/AdminHeader.jsx";
import { AdminUsersTable } from "../../widgets/AdminUsersTable/AdminUsersTable.jsx";
import {useFetchData} from "../../shared/hooks/useFetchData.js";
import {deleteUser, getUsers} from "../../shared/api/users.js";

export const AdminUsers = () => {
  const { data: users = [], loading, error, refetch } = useFetchData(getUsers);
  const countUsers = users.length;
  const activeUsers = users.filter(u => u.status === "Active").length;

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await deleteUser(id);
      await refetch();
    } catch (err) {
      console.error("Error deleting user:", err.message);
      alert(err.message);
    }
  }

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

            <AdminUsersTable users={users} loading={loading} error={error} onDelete={handleDeleteUser}/>
          </div>
        </div>
      </div>
    </section>
  );
};
