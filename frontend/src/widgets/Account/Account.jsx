import { useState } from "react";
import styles from "./Account.module.scss";
import editIcon from "../../shared/assets/image/editIcon.svg";
import addIcon from "../../shared/assets/image/addIcon.svg";
import { useUser } from "../../shared/context/UserContext";

const API = "http://localhost:5000/api";

// "1992-01-01" -> "01-01-1992"
const formatDate = (iso) => (iso ? iso.split("-").reverse().join("-") : "—");

export const Account = () => {
  const { user, setUser, userId, loadError } = useUser();
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [error, setError] = useState("");

  if (loadError) return <p>Помилка: {loadError}</p>;
  if (!user) return <p>Loading...</p>;

  const fields = [
    {
      id: "name",
      label: "Name",
      value: user.name,
      raw: user.name,
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
      value: user.phoneNumber || "—",
      raw: user.phoneNumber || "",
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
      ? `${API}/users/${userId}/password`
      : `${API}/users/${userId}`;
    const body = isPassword
      ? { oldPassword, newPassword: draft }
      : { field: id, value: draft };

    try {
      const r = await fetch(url, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await r.json();
      if (!r.ok) return setError(data.error || "Error");
      if (!isPassword) setUser(data);
      cancel();
    } catch {
      setError("Network error");
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
