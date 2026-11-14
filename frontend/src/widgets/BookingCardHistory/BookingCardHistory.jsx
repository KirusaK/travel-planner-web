import styles from "./BookingCardHistory.module.scss"
import sprite from "../../shared/assets/icons/symbol-defs.svg";
import {formatDuration, formatTime} from "../../shared/lib/format.js";

const config = {
    flight: (item) => {
      const trip = item.trips?.[0]

        return {
            logo: item.logo,
            alt: item.airlineName,
            points: [
                {id: "from", top: trip?.departureCode ?? "-", bottom: trip ? formatTime(trip.departureTime) : "-"},
                {id: "to", top: trip?.arrivalCode ?? "-", bottom: trip ? formatTime(trip.arrivalTime) : "-"},
            ],
            details: [
                {
                    id: "date",
                    icon: "#icon-calendar",
                    label: "Date",
                    value: trip?.date ?? item.date,
                },
                {
                    id: "time",
                    icon: "#icon-timmer",
                    label: "Flight time",
                    value: trip ? formatDuration(trip.durationMinutes) : "-",
                },
                // Gate и Seat пока заглушки: в базе их нет
                {
                    id: "gate",
                    icon: "#icon-bi_door-closed-fill",
                    label: "Gate",
                    value: "On arival",
                },
                { id: "seat", icon: "#icon-down", label: "Seat", value: "On arival" },
            ]
        }
    },


    hotel: (item) => ({
        logo: item.cover,
        alt: item.hotelName,
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
    const { logo, alt, points, details} = (config[item.itemType] ?? config.flight)(item);

    return (
        <div className={styles.bookingHistory}>
            <section className={styles.bookingHistory__main}>
                <section className={styles.bookingHistory__logoBox}>
                    {logo ? (
                        <img src={logo} alt={alt} className={styles.bookingHistory__logo} />
                    ) : (
                        <span className={styles.bookingHistory__logoTitel}>{item.title?.[0]}</span>
                    )}
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
            </section>
        </div>
    );
}