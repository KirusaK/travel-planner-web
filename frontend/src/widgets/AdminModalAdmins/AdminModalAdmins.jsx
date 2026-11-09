import styles from "./AdminModalAdmins.module.scss";
import {AdminModal} from "../../shared/ui/AdminModal/AdminModal.jsx";
import {useAdminForm} from "../../shared/hooks/useAdminForm.js";
import {createAdmin, updateAdmin} from "../../shared/api/admins.js";
import {useEffect} from "react";

const initialAdmins = {
    firstName: "",
    lastName: "",
    email: "",
    role: "admin",
    password: "",
};

export const AdminModalAdmins = ({isOpen, isClose, onCreated, editingId, initialData}) => {
    const submitFn = editingId ? (data) => updateAdmin(editingId, data) : createAdmin;
    const isEditing = Boolean(editingId);
    const {
        formData,
        setFormData,
        error,
        isSubmitting,
        handleChange,
        handleSubmit,
        handleClose,
    } = useAdminForm({initialData: initialAdmins, submit: submitFn, onCreated, onClose: isClose});

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            setFormData(initialAdmins);
        }
    }, [initialData, setFormData]);

    return (
        <div className={styles.modalWrapper}>
            <AdminModal title={isEditing ? "Edit Admin" : "Add new Admin"}
                        saveLabel={isEditing ? "Save changes" : "Add admin"}
                        subtitle={"Create an account with administrative permissions."}
                        isOpen={isOpen}
                        isClose={handleClose}
                        isSaving={isSubmitting}
                        error={error}
                        onSave={handleSubmit}
            >
                <section className={styles.formSection}>
                    <div className={styles.rowFields}>
                        <div className={styles.fieldGroup}>
                            <label className={styles.label} htmlFor="firstName">First Name*</label>
                            <input className={styles.input} id="firstName" name="firstName" type="text" value={formData.firstName} onChange={handleChange} />
                        </div>
                        <div className={styles.fieldGroup}>
                            <label className={styles.label} htmlFor="lastName">Last Name*</label>
                            <input className={styles.input} id="lastName" name="lastName" type="text" value={formData.lastName} onChange={handleChange} />
                        </div>
                    </div>

                    <div className={styles.fieldGroup}>
                        <label className={styles.label} htmlFor="email">Email Address*</label>
                        <input className={styles.input} id="email" name="email" type="text" value={formData.email} onChange={handleChange} />
                    </div>

                    <div className={styles.fieldGroup}>
                        <label className={styles.label} className={styles.label} htmlFor="Role">Role*</label>
                        <select className={styles.select} id="role" name="role" value={formData.role} onChange={handleChange}>
                            <option value="" disabled>Select role</option>
                            <option value="admin">Admin</option>
                            <option value="super_admin">Super Admin</option>
                        </select>
                    </div>

                    <div className={styles.fieldGroup}>
                        <label className={styles.label} htmlFor="password">Password*</label>
                        <input className={styles.input} id="password" name="password" type="password" value={formData.password} onChange={handleChange} />
                    </div>

                    <div className={styles.fieldGroup}>
                        <label className={styles.label} htmlFor="confirmPassword">Confirm Password*</label>
                        <input className={styles.input} id="confirmPassword" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} />
                    </div>
                </section>
            </AdminModal>
        </div>
    )
}