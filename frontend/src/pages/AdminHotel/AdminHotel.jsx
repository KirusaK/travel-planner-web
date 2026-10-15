import styles from "./AdminHotel.module.scss";
import { AdminNav } from "../../widgets/AdminNav/AdminNav.jsx";
import { AdminHeader } from "../../widgets/AdminHeader/AdminHeader.jsx";
import sprite from "../../shared/assets/icons/symbol-defs.svg";
import { AdminHotelsTable } from "../../widgets/AdminHotelsTable/AdminHotelsTable.jsx";

export const AdminHotel = () => {
  return (
    <section>
      <div className={styles.main}>
        <AdminNav />
        <div className={styles.info}>
          <AdminHeader />

          <div className={styles.body}>
            <div className={styles.body_headerBlock}>
              <div className={styles.body_headerBlock_info}>
                <h1 className={styles.body_headerBlock_title}>
                  Hotel Management
                </h1>
                <p className={styles.body_headerBlock_subtitle}>
                  4 properties listed on Golobe
                </p>
              </div>

              <button className={styles.body_headerBlock_btn}>
                <svg width={16} height={16}>
                  <use href={sprite + "#icon-Frame7"} />
                </svg>
                Add New Hotel
              </button>
            </div>

            <AdminHotelsTable />
          </div>
        </div>
      </div>
    </section>
  );
};