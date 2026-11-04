import styles from "./AdminAdminsTable.module.scss";
import {ButtonEdit} from "../../shared/ui/ButtonEdit/ButtonEdit.jsx";
import {ButtonDelete} from "../../shared/ui/ButtonDelete/ButtonDelete.jsx";

const data = [
    {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        email: "john.d@golobe.com",
        role: "Super Admin",
        status: "Active",
    }
]

export const AdminAdminsTable = () => {
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
                {data.map((item) => (
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

                        <div className={styles.roleCell}>
                            <span>{item.role}</span>
                        </div>

                        <div className={styles.statusCell}>
                            <span> {item.status}</span>
                        </div>

                        <div className={styles.actionsCell}>
                            <ButtonEdit />
                            <ButtonDelete />
                        </div>
                    </div>
                ))}
            </section>
        </div>
    )
}