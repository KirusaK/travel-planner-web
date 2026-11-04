import styles from "./AdminAdmins.module.scss";
import {AdminNav} from "../../widgets/AdminNav/AdminNav.jsx";
import {AdminHeader} from "../../widgets/AdminHeader/AdminHeader.jsx";
import {ButtonNewAdd} from "../../shared/ui/ButtonNewAdd/ButtonNewAdd.jsx";
import {AdminAdminsTable} from "../../widgets/AdminAdminsTable/AdminAdminsTable.jsx";

export const AdminAdmins = () => {
    return (
        <div>
            <div className={styles.main}>
                <AdminNav />
                <div className={styles.info}>
                    <AdminHeader />

                    <section className={styles.topSection}>
                        <div className={styles.headerBlock}>
                            <div className={styles.titleWrapper}>
                                <div className={styles.titleRow}>
                                    <h2 className={styles.pageTitle}>Admin Management</h2>
                                    <p className={styles.activeBadge}>3 Active Admins</p>
                                </div>

                                <p className={styles.pageSubtitle}>Manage administrator accounts, security credentials, and access permissions.</p>
                            </div>
                            <div className={styles.actionWrapper}>
                                <ButtonNewAdd title="Add new Admin" />
                            </div>
                        </div>

                        <AdminAdminsTable />
                    </section>
                </div>
            </div>
        </div>
    )
}