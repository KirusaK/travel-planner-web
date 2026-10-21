import sprite from "../../assets/icons/symbol-defs.svg";
import styles from "./AdminModal.module.scss";
import { useEffect } from "react";

export const AdminModal = ({isOpen, isClose, children, title, subtitle}) => {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        isClose();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {document.removeEventListener("keydown", onKeyDown)};
  }, [isOpen, isClose]);

  if(!isOpen) {
    return null;
  }

  return (
    <section>
      <div className={styles.overlay} onClick={isClose}>
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
          <div className={styles.modal__header}>
            <div>
              <h2 className={styles.modal__title}>{title}</h2>
              <p className={styles.modal__subtitle}>
                {subtitle}
              </p>
            </div>

            <button
              type="button"
              onClick={isClose}
              className={styles.modal__close}
            >
              <svg width={20} height={20}>
                <use href={sprite + "#icon-close"} />
              </svg>
            </button>
          </div>

          <div className={styles.modal__body}>{children}</div>

          <div className={styles.modal__footer}>
            <button
              type="button"
              onClick={isClose}
              className={styles.modal__footer__close}
            >
              Cancel
            </button>
            <button type="button" className={styles.modal__footer__add}>
              Add Flight
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}