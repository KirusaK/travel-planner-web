import styles from "./AdminAdminsTable.module.scss";
import {ButtonEdit} from "../../shared/ui/ButtonEdit/ButtonEdit.jsx";
import {ButtonDelete} from "../../shared/ui/ButtonDelete/ButtonDelete.jsx";

export const AdminAdminsTable = ({admins, onDelete, onUpdate, isSuperAdmin}) => {

    return (
        <div className={styles.tableCard}>
            <section className={styles.tableHeaderSection}>
                <h2 className={styles.tableTitle}>Administrator Directory</h2>
            </section>

            <section className={styles.tableHeaderRow}>
                <span className={styles.headerCol}>Admin Name</span>
                <span className={styles.headerCol}>Email Address</span>
                <span className={styles.headerCol}>Role</span>
                <span className={styles.headerCol}>Status</span>
                <span className={styles.headerCol}>Actions</span>
            </section>

            <section className={styles.tableBody}>
                {admins.map((item) => (
                    <div key={item.id} className={styles.tableRow}>
                        <div className={styles.userCell}>
                            <div className={styles.avatar_circle}>
                                <span className={styles.avatar}>{`${item.firstName[0]}${item.lastName[0]}`}</span>
                            </div>
                            <span className={styles.userName}>{item.firstName} {" "} { item.lastName}</span>
                        </div>

                        <div className={styles.emailCell}>
                            {item.email}
                        </div>

                        <div className={item.role === "super_admin" ? styles.roleCell : styles.roleCellGreen}>
                            <span>{item.role}</span>
                        </div>

                        <div className={styles.statusCell}>
                            <span> {item.isActive ? "Active" : "Inactive"}</span>
                        </div>

                        {isSuperAdmin && (
                            <div className={styles.actionsCell}>
                                <ButtonEdit onClick={() => onUpdate(item.id, item)}/>
                                <ButtonDelete onClick={() => onDelete(item.id)}/>
                            </div>
                        )}
                    </div>
                ))}
            </section>
        </div>
    )
}