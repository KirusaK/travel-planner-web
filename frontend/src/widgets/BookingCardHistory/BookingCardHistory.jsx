import styles from "./BookingCardHistory.module.scss"
import sprite from "../../shared/assets/icons/symbol-defs.svg";

const config = {
    flight: (item) => ({
        points: [
            {id: "from", top: "Newark(EWR)", bottom: "12:00 pm"},
            {id: "to", top: "Newark(EWR)", bottom: "6:00 pm"},
        ],
        details: [
            {
                id: "date",
                icon: "#icon-calendar",
                label: "Date",
                value: item.date,
            },
            {
                id: "time",
                icon: "#icon-timmer",
                label: "Flight time",
                value: "Newark(EWR)",
            },
            // Gate и Seat пока заглушки: в базе их нет
            {
                id: "gate",
                icon: "#icon-bi_door-closed-fill",
                label: "Gate",
                value: "A12",
            },
            { id: "seat", icon: "#icon-down", label: "Seat", value: 128 },
        ]
    }),


    hotel: (item) => ({
        points: [
            { id: "in", top: "Check-In", bottom: "Thur, Dec 8" },
            { id: "out", top: "Check Out", bottom: "Fri, Dec 9" },
        ],
        details: [
            {
                id: "check-in",
                icon: "#icon-timmer",
                label: "Check-In time",
                value: "12:00pm",
            },
            {
                id: "check-out",
                icon: "#icon-timmer",
                label: "Check-Out time",
                value: "11:30pm",
            },
            {
                id: "room",
                icon: "#icon-bi_door-closed-fill",
                label: "Room no.",
                value: "On arival",
            },
        ]
    })
}

export const BookingCardHistory = ({item}) => {
    if (!item) return null;
    const {points, details} = (config[item.itemType] ?? config.flight)(item);

    return (
        <div className={styles.bookingHistory}>
            <section className={styles.bookingHistory__main}>
                <section className={styles.bookingHistory__logoBox}>
                    <span>{item.title?.[0]}</span>
                </section>

                <section className={styles.bookingHistory__route}>
                    {points.map((point, index) => (
                        <div key={point.id} className={styles.bookingHistory__routeItem}>
                            {index > 0 && (
                                <span className={styles.bookingHistory__divider}>-</span>
                            )}
                            <div className={styles.bookingHistory__point}>
                                <p className={styles.bookingHistory__city}>{point.top}</p>
                                <span className={styles.bookingHistory__time}>{point.bottom}</span>
                            </div>
                        </div>
                    ))}
                </section>

                <div className={styles.bookingHistory__decoration}></div>

                <section className={styles.bookingHistory__details}>
                    {details.map((detail) => (
                        <div key={detail.id} className={styles.bookingHistory__detail}>
                            <div className={styles.bookingHistory__detailIcon}>
                                <svg width={22} height={22}>
                                    <use href={sprite + detail.icon} />
                                </svg>
                            </div>
                            <div className={styles.bookingHistory__detailText}>
                                <p className={styles.bookingHistory__par}>{detail.label}</p>
                                <span className={styles.bookingHistory__span}>{detail.value}</span>
                            </div>
                        </div>
                    ))}
                </section>
            </section>

            <section className={styles.bookingHistory__actions}>
                <button type="button" className={styles.bookingHistory__download}>
                    Download Ticket
                </button>

                <button type="button" className={styles.bookingHistory__more}>
                    <svg width={16} height={16} className={styles.bookingHistory__arrow}>
                        <use href={sprite + "#icon-chevron_down"} />
                    </svg>
                </button>
            </section>
        </div>
    );
}