import { useState } from "react";
import styles from "./Account.module.scss";
import editIcon from "../../shared/assets/image/editIcon.svg";
import addIcon from "../../shared/assets/image/addIcon.svg";
import {pathRequest} from "../../shared/api/http.js";
import {useAuth} from "../../shared/context/AuthContext.jsx";

const formatDate = (iso) => (iso ? iso.split("-").reverse().join("-") : "—");

export const Account = () => {
  const { user, updateUser } = useAuth();
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [error, setError] = useState("");

  if (!user) return <p>Loading...</p>;

  const fields = [
    {
      id: "firstName",
      label: "firstName",
      value: user.firstName,
      raw: user.firstName,
      type: "text",
    },
    {
      id: "lastName",
      label: "lastName",
      value: user.lastName,
      raw: user.lastName,
      type: "text",
    },
    {
      id: "email",
      label: "Email",
      value: user.email,
      raw: user.email,
      type: "email",
      extraAction: "Add another email",
    },
    {
      id: "password",
      label: "Password",
      value: "************",
      raw: "",
      type: "password",
    },
    {
      id: "phoneNumber",
      label: "Phone number",
      value: user.phone || "—",
      raw: user.phone || "",
      type: "tel",
    },
    {
      id: "dateOfBirth",
      label: "Date of birth",
      value: formatDate(user.dateOfBirth),
      raw: user.dateOfBirth || "",
      type: "date",
    },
  ];

  const startEdit = (f) => {
    setEditingId(f.id);
    setDraft(f.raw);
    setOldPassword("");
    setError("");
  };

  const cancel = () => {
    setEditingId(null);
    setError("");
  };

  const save = async (id) => {
    const isPassword = id === "password";
    const url = isPassword
      ? `/api/users/${user.id}/password`
      : `/api/users/${user.id}`;
    const body = isPassword
      ? { oldPassword, newPassword: draft }
      : { field: id, value: draft };

    try {
      const data = await pathRequest(url, body);

      if (!isPassword) updateUser(data);
      cancel();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className={styles.account}>
      <h2 className={styles.account__title}>Account</h2>

      <div className={styles.account__card}>
        {fields.map((f) => {
          const editing = editingId === f.id;
          return (
            <div className={styles.account__row} key={f.id}>
              <div className={styles.account__info}>
                <span className={styles.account__label}>{f.label}</span>

                {editing ? (
                  <>
                    {f.id === "password" && (
                      <input
                        className={styles.account__input}
                        type="password"
                        placeholder="Current password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                      />
                    )}
                    <input
                      className={styles.account__input}
                      type={f.type}
                      placeholder={f.id === "password" ? "New password" : ""}
                      value={draft}
                      onChange={(e) => setDraft(e.target.value)}
                    />
                    {error && (
                      <span className={styles.account__error}>{error}</span>
                    )}
                  </>
                ) : (
                  <span className={styles.account__value}>{f.value}</span>
                )}
              </div>

              <div className={styles.account__actions}>
                {f.extraAction && !editing && (
                  <button
                    type="button"
                    className={`${styles.account__button} ${styles["account__button--wide"]}`}
                    onClick={() => console.log(`${f.extraAction} clicked`)}
                  >
                    <img
                      src={addIcon}
                      alt=""
                      className={styles.account__icon}
                    />
                    {f.extraAction}
                  </button>
                )}

                {editing && (
                  <button
                    type="button"
                    className={styles.account__button}
                    onClick={cancel}
                  >
                    Cancel
                  </button>
                )}

                <button
                  type="button"
                  className={styles.account__button}
                  onClick={() => (editing ? save(f.id) : startEdit(f))}
                >
                  {!editing && (
                    <img
                      src={editIcon}
                      alt=""
                      className={styles.account__icon}
                    />
                  )}
                  {editing ? "Save" : "Change"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
