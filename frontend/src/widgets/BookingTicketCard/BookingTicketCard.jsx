import sprite from "../../shared/assets/icons/symbol-defs.svg";
import defaultAvatar from "../../shared/assets/image/Ellipse 1.jpg";
import Barcode from "react-barcode";
import styles from "./BookingTicketCard.module.scss";

export const BookingTicketCard = ({booking, user, itemData, isFlight}) => {
  const passengerName = user
    ? `${user.firstName || user.first_name || "..."} ${user.lastName || user.last_name || "..."}`
    : "...";

  const firstTrip = isFlight ? itemData.trips[0] : null;
  const timeString = firstTrip?.time || "";
  const [departTime, arrivalTime] = timeString.includes("-") ? timeString.split("-").map((t) => t.trim()) : ["", ""];
  const startTitle = isFlight ? departTime : itemData?.dataStart;
  const endTitle = isFlight ? arrivalTime : itemData?.dataFinish ;
  const startSubtitle = isFlight ? firstTrip?.departureAirport : "Check-In";
  const endSubtitle = isFlight ? firstTrip?.arrivalAirport : "Check-Out";
  const typeFlight = isFlight ? itemData.flightClass : itemData.title || "Hotel";

  const detailsList = isFlight
    ? [
        {
          id: "date",
          icon: "#icon-calendar",
          label: "Date",
          value: firstTrip.start,
        },
        {
          id: "time",
          icon: "#icon-timmer",
          label: "Flight time",
          value: departTime,
        },
        {
          id: "gate",
          icon: "#icon-bi_door-closed-fill",
          label: "Gate",
          value: 12,
        },
        { id: "seat", icon: "#icon-down", label: "Seat", value: 128 },
      ]
    : [
        {
          id: "check-in",
          icon: "#icon-timmer",
          label: "Check-In time",
          value: itemData.timeStart,
        },
        {
          id: "check-out",
          icon: "#icon-timmer",
          label: "Check-Out time",
          value: itemData.timeFinish,
        },
        { id: "room", icon: "#icon-bi_door-closed-fill", label: "Room no.", value: "On arival" },
      ];

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
                  Boarding Pass N’123
                </p>
              </div>
            </div>

            <span className={styles.ticketCard_badge}>{typeFlight} Class</span>
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
                  {booking?.code || itemData?.airlineCode || "EK"}
                </h2>
                <p className={styles.ticketCard_codeSub}>
                  {booking?.id || booking?.bookingCode}
                </p>
              </div>

              <div className={styles.ticketCard_barcode}>
                <Barcode
                  value={booking?.bookingCode || "ABC12345"}
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
          <div className={styles.ticketCard_background}></div>
        </div>
      </div>
    </section>
  );
};