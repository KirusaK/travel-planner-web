import styles from "./Account.module.scss";
import editIcon from "../../shared/assets/image/editIcon.svg";
import addIcon from "../../shared/assets/image/addIcon.svg";

const fields = [
  {
    id: "name",
    label: "Name",
    value: "John Doe",
  },
  {
    id: "email",
    label: "Email",
    value: "john.doe@gmail.com",
    extraAction: "Add another email",
  },
  {
    id: "password",
    label: "Password",
    value: "************",
  },
  {
    id: "phone",
    label: "Phone number",
    value: "+1 000-000-0000",
  },
  {
    id: "address",
    label: "Address",
    value: "St 32 main downtown, Los Angeles, California, USA",
  },
  {
    id: "dob",
    label: "Date of birth",
    value: formatDate("1992-01-01"),
  },
];

function formatDate(isoString) {
  const date = new Date(isoString);
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
    .format(date)
    .replace(/\//g, "-");
}

export const Account = () => {
  return (
    <section className={styles.account}>
      <h2 className={styles.account__title}>Account</h2>

      <div className={styles.account__card}>
        {fields.map(({ id, label, value, extraAction }) => (
          <div className={styles.account__row} key={id}>
            <div className={styles.account__info}>
              <span className={styles.account__label}>{label}</span>
              <span className={styles.account__value}>{value}</span>
            </div>

            <div className={styles.account__actions}>
              {extraAction && (
                <button
                  type="button"
                  className={`${styles.account__button} ${styles["account__button--wide"]}`}
                  onClick={() => console.log(`${extraAction} clicked`)}
                >
                  <img src={addIcon} alt="" className={styles.account__icon} />
                  {extraAction}
                </button>
              )}

              <button
                type="button"
                className={styles.account__button}
                onClick={() => console.log(`Change ${label} clicked`)}
              >
                <img src={editIcon} alt="" className={styles.account__icon} />
                Change
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
