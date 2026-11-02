import sprite from "../../shared/assets/icons/symbol-defs.svg";
import styles from "./FlightTripsTab.module.scss";

export const FlightTripsTab = ({segments, onSegmentChange, onAddSegment}) => {
  return (
    <div className={styles.tripsTab}>
      {segments.map((segment, index) => (
        <section className={styles.tripsTab__trip}>
          <div className={styles.tripsTab__head}>
            <div className={styles.tripsTab__title}>
              <div className={styles.tripsTab__block__number}>
                <span className={styles.tripsTab__number}>{index + 1}</span>
              </div>

              <h3 className={styles.tripsTab__name}>Depart</h3>
            </div>

            <div className={styles.tripsTab__actions}>
              <button className={styles.tripsTab__iconBtn}>
                <svg
                  width={16}
                  height={16}
                  className={styles.tripsTab__icon__arrow}
                >
                  <use href={sprite + "#icon-chevron_down"} />
                </svg>
              </button>
              <button className={styles.tripsTab__iconBtn}>
                <svg width={16} height={16}>
                  <use href={sprite + "#icon-chevron_down"} />
                </svg>
              </button>
              <button className={styles.tripsTab__iconBtn}>
                <svg width={16} height={16}>
                  <use href={sprite + "#icon-Frame9"} />
                </svg>
              </button>
            </div>
          </div>

          <div className={styles.tripsTab__row}>
            <div className={styles.tripsTab__field}>
              <label
                className={styles.tripsTab__label}
                htmlFor={`segmentLabel-${index}`}
              >
                Segment Label
              </label>
              <select
                className={styles.tripsTab__input}
                id={`segmentLabel-${index}`}
                name="segmentLabel"
                value={segment.segmentLabel}
                onChange={(e) =>
                  onSegmentChange(index, "segmentLabel", e.target.value)
                }
              >
                <option value="Depart">Depart</option>
                <option value="Return">Return</option>
              </select>
            </div>
            <div className={styles.tripsTab__field}>
              <label
                htmlFor={`departureTime-${index}`}
                className={styles.tripsTab__label}
              >
                {" "}
                Departure Time
              </label>
              <input
                id={`departureTime-${index}`}
                name="departureTime"
                value={segment.departureTime}
                onChange={(e) =>
                  onSegmentChange(index, "departureTime", e.target.value)
                }
                type="time"
                placeholder="12:00 pm"
                className={styles.tripsTab__input}
              />
            </div>
            <div className={styles.tripsTab__field}>
              <label
                htmlFor={`arrivalTime-${index}`}
                className={styles.tripsTab__label}
              >
                {" "}
                Arrival Time
              </label>
              <input
                id={`arrivalTime-${index}`}
                name="arrivalTime"
                value={segment.arrivalTime}
                onChange={(e) =>
                  onSegmentChange(index, "arrivalTime", e.target.value)
                }
                type="time"
                placeholder="01:28 pm"
                className={styles.tripsTab__input}
              />
            </div>
          </div>

          <div className={styles.tripsTab__row}>
            <div className={styles.tripsTab__field}>
              <label
                htmlFor={`departureAirport-${index}`}
                className={styles.tripsTab__label}
              >
                {" "}
                Departure Airport
              </label>
              <input
                id={`departureAirport-${index}`}
                name="departureAirport"
                value={segment.departureAirport}
                onChange={(e) =>
                  onSegmentChange(index, "departureAirport", e.target.value)
                }
                type="text"
                placeholder="Ezeiza International (EZE)"
                className={styles.tripsTab__input}
              />
            </div>
            <div className={styles.tripsTab__field}>
              <label
                htmlFor={`arrivalAirport-${index}`}
                className={styles.tripsTab__label}
              >
                {" "}
                Arrival Airport
              </label>
              <input
                id={`arrivalAirport-${index}`}
                name="arrivalAirport"
                value={segment.arrivalAirport}
                onChange={(e) =>
                  onSegmentChange(index, "arrivalAirport", e.target.value)
                }
                type="text"
                placeholder="Istanbul Airport (IST)"
                className={styles.tripsTab__input}
              />
            </div>
            <div className={styles.tripsTab__field}>
              <label
                htmlFor={`date-${index}`}
                className={styles.tripsTab__label}
              >
                {" "}
                Date
              </label>
              <input
                id={`date-${index}`}
                name="date"
                type="date"
                value={segment.date}
                onChange={(e) => onSegmentChange(index, "date", e.target.value)}
                placeholder="EZE-IST"
                className={styles.tripsTab__input}
              />
            </div>
          </div>

          <div className={styles.tripsTab__row}>
            <div className={styles.tripsTab__field}>
              <label
                htmlFor={`flightType-${index}`}
                className={styles.tripsTab__label}
              >
                Flight Type
              </label>
              <select
                id={`flightType-${index}`}
                name="flightType"
                value={segment.flightType}
                onChange={(e) =>
                  onSegmentChange(index, "flightType", e.target.value)
                }
                className={styles.tripsTab__input}
              >
                <option value="non stop">non stop</option>
                <option value="1 stop">1 stop</option>
                <option value="2+ stop">2+ stop</option>
              </select>
            </div>

            <div className={styles.tripsTab__field}>
              <label
                htmlFor={`status-${index}`}
                className={styles.tripsTab__label}
              >
                Status
              </label>
              <select
                id={`status-${index}`}
                name="status"
                value={segment.status}
                onChange={(e) =>
                  onSegmentChange(index, "status", e.target.value)
                }
                className={styles.tripsTab__input}
              >
                <option value="Scheduled">Scheduled</option>
                <option value="On time">On time</option>
                <option value="Delayed">Delayed</option>
                <option value="Boarding">Boarding</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            <div className={styles.tripsTab__field}>
              <label
                htmlFor={`aircraftType-${index}`}
                className={styles.tripsTab__label}
              >
                Aircraft Type
              </label>
              <input
                id={`aircraftType-${index}`}
                name="aircraftType"
                value={segment.aircraftType}
                onChange={(e) =>
                  onSegmentChange(index, "aircraftType", e.target.value)
                }
                type="text"
                className={styles.tripsTab__input}
              />
            </div>
          </div>
        </section>
      ))}

      <button
        type="button"
        className={styles.tripsTab__addBtn}
        onClick={onAddSegment}
      >
        + Add room
      </button>
    </div>
  );
}