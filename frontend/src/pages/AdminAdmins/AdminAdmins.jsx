import styles from "./AdminAdmins.module.scss";
import {AdminNav} from "../../widgets/AdminNav/AdminNav.jsx";
import {AdminHeader} from "../../widgets/AdminHeader/AdminHeader.jsx";
import {ButtonNewAdd} from "../../shared/ui/ButtonNewAdd/ButtonNewAdd.jsx";
import {AdminAdminsTable} from "../../widgets/AdminAdminsTable/AdminAdminsTable.jsx";
import {AdminModalAdmins} from "../../widgets/AdminModalAdmins/AdminModalAdmins.jsx";
import {useState} from "react";
import {useFetchData} from "../../shared/hooks/useFetchData.js";
import {deleteAdmin, getAdmins} from "../../shared/api/admins.js";
import {useAuth} from "../../shared/context/AuthContext.jsx";

export const AdminAdmins = () => {
    const {user} = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingAdminId, setEditingAdminId] = useState(null);
    const [initialModalData, setInitialModalData] = useState(null);
    const {data: admins = [], loading, error, refetch} = useFetchData(getAdmins);

    const adminActive = admins.filter((a) => a.isActive).length
    const isSuperAdmin =user?.role === "super_admin";

    const handleDeleteAdmin = async (id) => {
        if (!isSuperAdmin) {
            alert("Only Super Admin can delete administrators.");
            return;
        }

        if (!window.confirm("Are you sure you want to delete this admin?")) return;

        try {
            await deleteAdmin(id);
            await refetch();
        } catch (err) {
            console.error("Error deleting admin", err.message);
        }
    }

    const handleOpenEditModal = async (id, adminData) => {
        if (!isSuperAdmin) {
            alert("Only Super Admin can edit administrators.");
            return;
        }

        try {
            setEditingAdminId(id);
            setInitialModalData({
                firstName: adminData.firstName,
                lastName: adminData.lastName,
                email: adminData.email,
                role: adminData.role,
                password: "",
            });

            setIsModalOpen(true)
        } catch (err) {
            console.error("Error loading admin for edit:", err.message);
        }
    }

    const handleOpenCreateModal = () => {
        if (!isSuperAdmin) return;
        setEditingAdminId(null);
        setInitialModalData(null);
        setIsModalOpen(true);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingAdminId(null);
        setInitialModalData(null);
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

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
                                    <p className={styles.activeBadge}>{adminActive} Active Admins</p>
                                </div>

                                <p className={styles.pageSubtitle}>Manage administrator accounts, security credentials, and access permissions.</p>
                            </div>
                            {isSuperAdmin && (
                                <div className={styles.actionWrapper}>
                                    <ButtonNewAdd onClick={handleOpenCreateModal} title="Add new Admin" />
                                </div>
                            )}
                        </div>

                        <AdminAdminsTable admins={admins} onDelete={handleDeleteAdmin} onUpdate={handleOpenEditModal} isSuperAdmin={isSuperAdmin} />

                        <AdminModalAdmins isOpen={isModalOpen} isClose={handleCloseModal} onCreated={refetch} editingId={editingAdminId} initialData={initialModalData}/>
                    </section>
                </div>
            </div>
        </div>
    )
}