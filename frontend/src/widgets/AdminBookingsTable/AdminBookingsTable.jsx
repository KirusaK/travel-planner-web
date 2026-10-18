import sprite from "../../shared/assets/icons/symbol-defs.svg";
import styles from "./AdminBookingsTable.module.scss";

const AdminBookingsTable = () => {
  const bookings = [
    {
      id: "BK-10284",
      customerName: "Tomhoon Lee",
      customerEmail: "tomhoon@gmail.com",
      itemType: "flight",
      title: "Emirates · EZE → IST",
      date: "2026-10-12",
      payment: "Full",
      amount: 104,
      status: "Confirmed",
    },
    {
      id: "BK-10283",
      customerName: "Mehmet Yılmaz",
      customerEmail: "mehmet.y@gmail.com",
      itemType: "hotel",
      title: "CVK Park Bosphorus · 3 nights",
      date: "2026-10-11",
      payment: "Partial",
      amount: 720,
      status: "Pending",
    },
    {
      id: "BK-10282",
      customerName: "Amelia Watson",
      customerEmail: "amelia.w@outlook.com",
      itemType: "flight",
      title: "Flydubai · DXB → LHR",
      date: "2026-10-10",
      payment: "Full",
      amount: 186,
      status: "Confirmed",
    },
    {
      id: "BK-10281",
      customerName: "Ahmed Al Mansoori",
      customerEmail: "ahmed.m@etisalat.ae",
      itemType: "hotel",
      title: "Atlantis The Palm · 2 nights",
      date: "2026-10-09",
      payment: "Partial",
      amount: 1040,
      status: "Confirmed",
    },
    {
      id: "BK-10280",
      customerName: "Hana Suzuki",
      customerEmail: "hana.s@yahoo.co.jp",
      itemType: "flight",
      title: "Qatar Airways · DOH → JFK",
      date: "2026-10-08",
      payment: "Full",
      amount: 240,
      status: "Completed",
    },
    {
      id: "BK-10279",
      customerName: "Sofia Rossi",
      customerEmail: "sofia.rossi@libero.it",
      itemType: "hotel",
      title: "Hotel Artemide · 4 nights",
      date: "2026-10-06",
      payment: "Full",
      amount: 756,
      status: "Cancelled",
    },
    {
      id: "BK-10278",
      customerName: "Lucas Martín",
      customerEmail: "lucas.martin@gmail.com",
      itemType: "flight",
      title: "Turkish Airlines · IST → FCO",
      date: "2026-10-05",
      payment: "Partial",
      amount: 98,
      status: "Pending",
    },
    {
      id: "BK-10277",
      customerName: "Tomhoon Lee",
      customerEmail: "tomhoon@gmail.com",
      itemType: "hotel",
      title: "Eresin Sultanahmet · 2 nights",
      date: "2026-10-03",
      payment: "Full",
      amount: 208,
      status: "Completed",
    },
  ];

  const icons = {
    flight: "#icon-Frame1",
    hotel: "#icon-Frame2",
  };

  const status = {
    Full: "bookingsTable__payment--full",
    Partial: "bookingsTable__payment--partial",
    Confirmed: "bookingsTable__payment--confirmed",
    Pending: "bookingsTable__payment--pending",
    Completed: "bookingsTable__payment--completed",
    Cancelled: "bookingsTable__payment--cancelled",
  };

  return (
    <section className={styles.bookingsTable}>
      <div className={styles.bookingsTable__header}>
        <span className={styles.bookingsTable__headerCol}>Booking</span>
        <span className={styles.bookingsTable__headerCol}>Customer</span>
        <span className={styles.bookingsTable__headerCol}>Item</span>
        <span className={styles.bookingsTable__headerCol}>Date</span>
        <span className={styles.bookingsTable__headerCol}>Payment</span>
        <span className={styles.bookingsTable__headerCol}>Amount</span>
        <span className={styles.bookingsTable__headerCol}>Status</span>
      </div>

      <div className={styles.bookingsTable__list}>
        {bookings.map((item) => (
          <div key={item.id} className={styles.bookingsTable__row}>
            <h3 className={styles.bookingsTable__id}>{item.id}</h3>

            <div className={styles.bookingsTable__customer}>
              <p className={styles.bookingsTable__customerName}>
                {item.customerName}
              </p>
              <span className={styles.bookingsTable__customerEmail}>
                {item.customerEmail}
              </span>
            </div>

            <div className={styles.bookingsTable__item}>
              <div className={styles.bookingsTable__iconWrapper}>
                <svg
                  width={16}
                  height={16}
                  className={styles.bookingsTable__icon}
                >
                  <use href={sprite + icons[item.itemType]} />
                </svg>
              </div>

              <span className={styles.bookingsTable__itemTitle}>
                {item.title}
              </span>
            </div>

            <span className={styles.bookingsTable__date}>{item.date}</span>

            <span className={`${styles.bookingsTable__payment} ${styles[status[item.payment]]}`}>
              {item.payment}
            </span>

            <span className={styles.bookingsTable__amount}>${item.amount}</span>

            <span className={`${styles.bookingsTable__status} ${styles[status[item.status]]}`}>
              {item.status}
            </span>

          </div>
        ))}
      </div>
    </section>
  );
}
export default AdminBookingsTable