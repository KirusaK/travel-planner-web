import sprite from "../../shared/assets/icons/symbol-defs.svg";
import styles from "./AdminFlight.module.scss";
import { AdminNav } from "../../widgets/AdminNav/AdminNav.jsx";
import { AdminHeader } from "../../widgets/AdminHeader/AdminHeader.jsx";
import {AdminFlightsTable} from "../../widgets/AdminFlightsTable/AdminFlightsTable.jsx";
import { useState } from "react";
import { AdminModalFlight } from "../../widgets/AdminFlightModal/AdminModalFlight.jsx";


export const AdminFlight = () => {
  const [isMoadalOpen, setIsMoadalOpen] = useState(false);

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
                  Flight Management
                </h1>
                <p className={styles.body_headerBlock_subtitle}>
                  5 flights listed on Golobe
                </p>
              </div>

              <button
                className={styles.body_headerBlock_btn}
                onClick={() => setIsMoadalOpen(true)}
              >
                <svg width={16} height={16}>
                  <use href={sprite + "#icon-Frame7"} />
                </svg>
                Add New Flight
              </button>
            </div>

            <AdminFlightsTable />

            <AdminModalFlight
              isOpen={isMoadalOpen}
              isClose={() => setIsMoadalOpen(false)}
            />
          </div>
        </div>
      </div>
    </section>
  );
};