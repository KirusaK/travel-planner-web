import sprite from "../../shared/assets/icons/symbol-defs.svg";
import defaultAvatar from "../../shared/assets/image/Ellipse 1.jpg";
import Barcode from "react-barcode";
import styles from "./BookingTicketCard.module.scss";
import { formatTime, formatDate } from "../../shared/lib/format.js";
import flightImage from "../../shared/assets/image/background.jpg";
import hotelImage from "../../shared/assets/image/background2.jpg";

export const BookingTicketCard = ({booking, user, itemData, isFlight}) => {
  const passengerName = user
    ? `${user.firstName || user.first_name || "..."} ${user.lastName || user.last_name || "..."}`
    : "...";

  const firstTrip = isFlight ? itemData.trips[0] : null;
  const startTitle = isFlight
    ? firstTrip && formatTime(firstTrip.departureTime)
    : "error";
  const endTitle = isFlight ? firstTrip && formatTime(firstTrip.arrivalTime) : "error";
  const startSubtitle = isFlight ? firstTrip && `${firstTrip.departureAirport} (${firstTrip.departureCode})` : "Check-In";
  const endSubtitle = isFlight ? firstTrip && `${firstTrip.arrivalAirport} (${firstTrip.arrivalCode})` : "Check-Out";
  const badgeText = isFlight ? `${itemData.flightClass} Class` : itemData.rooms?.[0]?.title || "Hotel";
  const background = isFlight ? flightImage : hotelImage;


  const detailsList = isFlight
    ? [
        {
          id: "date",
          icon: "#icon-calendar",
          label: "Date",
          // "2026-12-24" -> "Thu, Dec 24"
          value: firstTrip && formatDate(firstTrip.date),
        },
        {
          id: "time",
          icon: "#icon-timmer",
          label: "Flight time",
          value: firstTrip && formatTime(firstTrip.departureTime),
        },
        // Gate и Seat пока заглушки: в базе их нет
        {
          id: "gate",
          icon: "#icon-bi_door-closed-fill",
          label: "Gate",
          value: 12,
        },
        { id: "seat", icon: "#icon-down", label: "Seat", value: 128 },
      ]
    : [
        // Время заезда и выезда мы в базу не клали, поэтому заглушки
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
      ];

  const bookingCode = `BK-${booking.id}`;

  return (
    <section className={styles.ticketCard}>
      <div className={styles.ticketCard_inner}>
        <div className={styles.ticketCard_schedule}>
          <div className={styles.ticketCard_timeBlock}>
            <h1 className={styles.ticketCard_time}>{startTitle}</h1>
            <p className={styles.ticketCard_location}>{startSubtitle}</p>
          </div>

          <svg width={36} height={92}>
            <use href={sprite + "#icon-Frame-286"} />
          </svg>

          <div className={styles.ticketCard_timeBlock}>
            <h1 className={styles.ticketCard_time}>{endTitle}</h1>
            <p className={styles.ticketCard_location}>{endSubtitle}</p>
          </div>
        </div>

        <div className={styles.ticketCard_details}>
          <div className={styles.ticketCard_header}>
            <div className={styles.ticketCard_passenger}>
              <img src={defaultAvatar} alt="User Avatar" />

              <div className={styles.ticketCard_passengerMeta}>
                <h3 className={styles.ticketCard_passengerName}>
                  {passengerName}
                </h3>
                <p className={styles.ticketCard_passNumber}>
                  Boarding Pass N’{booking.id}
                </p>
              </div>
            </div>

            <span className={styles.ticketCard_badge}>{badgeText}</span>
          </div>

          <div>
            <div className={styles.ticketCard_infoGrid}>
              {detailsList.map((item) => (
                <div key={item.id} className={styles.ticketCard_infoItem}>
                  <div className={styles.ticketCard_iconBox}>
                    <svg width={22} height={22}>
                      <use href={sprite + `${item.icon}`} />
                    </svg>
                  </div>

                  <div className={styles.ticketCard_infoMeta}>
                    <h3 className={styles.ticketCard_infoLabel}>
                      {item.label}
                    </h3>
                    <p className={styles.ticketCard_infoValue}>{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.ticketCard_footer}>
              <div className={styles.ticketCard_code}>
                <h2 className={styles.ticketCard_codeTitle}>
                  {isFlight ? "EK" : itemData.name?.slice(0, 3).toUpperCase()}
                </h2>
                <p className={styles.ticketCard_codeSub}>{bookingCode}</p>
              </div>

              <div className={styles.ticketCard_barcode}>
                <Barcode
                  value={bookingCode}
                  height={49}
                  width={1.5}
                  displayValue={false}
                  background="transparent"
                  margin={0}
                />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.ticketCard_photo}>
          <div
            style={{
              backgroundImage: `url(${background})`,
            }}
            className={styles.ticketCard_background}
          ></div>
        </div>
      </div>
    </section>
  );
};