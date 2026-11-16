import { useState } from "react";
import sprite from "../../../shared/assets/icons/symbol-defs.svg";
import styles from "./DepartureTime.module.scss";

const MIN = 1;
const MAX = 1436;

const formatTime = (minutes) => {
  const h = Math.floor(minutes / 60);
  const m = String(minutes % 60).padStart(2, "0");
  return `${h % 12 || 12}:${m}${h >= 12 ? "Pm" : "Am"}`;
};

export const DepartureTime = ({ value, onChange }) => {
  const [inner, setInner] = useState([MIN, MAX]);
  const [from, to] = value ?? inner;

  const update = (next) => {
    setInner(next);
    onChange?.(next);
  };
  return (
    <div>
      <section>
        <div className={styles.DepartureTime_block}>
          <h3 className={styles.DepartureTime_title}>Departure Time</h3>
          <button className={styles.DepartureTime_button}>
            <svg width="24" height="24" className={styles.DepartureTime_icon}>
              <use href={sprite + "#icon-chevron_down"} />
            </svg>
          </button>
        </div>

        <div className={styles.DepartureTime_slider}>
          <div className={styles.DepartureTime_track} />
          <input
            type="range"
            min={MIN}
            max={MAX}
            value={from}
            onChange={(e) => update([Math.min(Number(e.target.value), to), to])}
            className={styles.DepartureTime_thumb}
          />
          <input
            type="range"
            min={MIN}
            max={MAX}
            value={to}
            onChange={(e) =>
              update([from, Math.max(Number(e.target.value), from)])
            }
            className={styles.DepartureTime_thumb}
          />
        </div>
        <div className={styles.DepartureTime_range}>
          <p className={styles.DepartureTime_time}>{formatTime(from)}</p>
          <p className={styles.DepartureTime_time}>{formatTime(to)}</p>
        </div>

        <hr className={styles.DepartureTime_hr} />
      </section>
    </div>
  );
};
