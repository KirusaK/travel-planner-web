import styles from "./AdminAdmins.module.scss";
import {AdminNav} from "../../widgets/AdminNav/AdminNav.jsx";
import {AdminHeader} from "../../widgets/AdminHeader/AdminHeader.jsx";
import {ButtonNewAdd} from "../../shared/ui/ButtonNewAdd/ButtonNewAdd.jsx";
import {AdminAdminsTable} from "../../widgets/AdminAdminsTable/AdminAdminsTable.jsx";
import {AdminModalAdmins} from "../../widgets/AdminModalAdmins/AdminModalAdmins.jsx";
import {useState} from "react";

export const AdminAdmins = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

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
                                <ButtonNewAdd onClick={handleOpenModal} title="Add new Admin" />
                            </div>
                        </div>

                        <AdminAdminsTable />

                        <AdminModalAdmins isOpen={isModalOpen} isClose={handleCloseModal} />
                    </section>
                </div>
            </div>
        </div>
    )
}