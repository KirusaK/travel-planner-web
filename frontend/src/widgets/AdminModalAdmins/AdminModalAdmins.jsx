import styles from "./AdminModalAdmins.module.scss";
import {AdminModal} from "../../shared/ui/AdminModal/AdminModal.jsx";

export const AdminModalAdmins = ({isOpen, isClose}) => {
    return (
        <div className={styles.modalWrapper}>
            <AdminModal title={"Add new Admin"}
                        subtitle={"Create an account with administrative permissions."}
                        saveLabel={"Create Admin"}
                        isOpen={isOpen}
                        isClose={isClose}
            >
                <section className={styles.formSection}>
                    <div className={styles.rowFields}>
                        <div className={styles.fieldGroup}>
                            <label className={styles.label} htmlFor="firstName">First Name*</label>
                            <input className={styles.input} id="firstName" name="firstName" type="text" />
                        </div>
                        <div className={styles.fieldGroup}>
                            <label className={styles.label} htmlFor="lastName">Last Name*</label>
                            <input className={styles.input} id="lastName" name="lastName" type="text" />
                        </div>
                    </div>

                    <div className={styles.fieldGroup}>
                        <label className={styles.label} htmlFor="email">Email Address*</label>
                        <input className={styles.input} id="email" name="email" type="text" />
                    </div>

                    <div className={styles.fieldGroup}>
                        <label className={styles.label} className={styles.label} htmlFor="Role">Role*</label>
                        <select className={styles.select} id="role" name="role">
                            <option value="admin">Admin</option>
                            <option value="superAdmin">Super Admin</option>
                        </select>
                    </div>

                    <div className={styles.fieldGroup}>
                        <label className={styles.label} htmlFor="password">Password*</label>
                        <input className={styles.input} id="password" name="password" type="password" />
                    </div>

                    <div className={styles.fieldGroup}>
                        <label className={styles.label} htmlFor="confirmPassword">Confirm Password*</label>
                        <input className={styles.input} id="confirmPassword" name="confirmPassword" type="password" />
                    </div>
                </section>
            </AdminModal>
        </div>
    )
}