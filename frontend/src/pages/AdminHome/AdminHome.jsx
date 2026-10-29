import styles from "./AdminHome.module.scss";
import { AdminNav } from "../../widgets/AdminNav/AdminNav.jsx";
import { AdminHeader } from "../../widgets/AdminHeader/AdminHeader.jsx";
import { AdminStatsGroup } from "../../widgets/AdminStatsGroup/AdminStatsGroup.jsx";
import { AdminTopRated } from "../../widgets/AdminTopRated/AdminTopRated.jsx";
import {AdminRecentBookings} from "../../widgets/AdminRecentBookings/AdminRecentBookings.jsx";
import { useFetchData } from "../../shared/hooks/useFetchData.js";
import { getBookings, getUsers } from "../../shared/api/users.js";
import { getHotels } from "../../shared/api/hotels.js";
import { getFlights } from "../../shared/api/flights.js";

export const AdminHome = () => {
  const { data: users = [], loading: usersLoadnig, error: usersError } = useFetchData(getUsers);
  const { data: hotels = [], loading: hotelsLoadnig, error: hotelsError } = useFetchData(getHotels);
  const {
    data: flights = [],
    loading: flightsLoadnig,
    error: flightsError,
  } = useFetchData(getFlights);
  const {
    data: bookings = [],
    loading: bookingsLoadnig,
    error: bookingsError,
  } = useFetchData(getBookings);

  const loading =
    usersLoadnig || hotelsLoadnig || flightsLoadnig || bookingsLoadnig;
  const error = usersError || hotelsError || flightsError || bookingsError;

  return (
    <section>
      <div className={styles.main}>
        <AdminNav />
        <div className={styles.info}>
          <AdminHeader />

          <div className={styles.body}>
            <h1 className={styles.body_title}>Welcome back, John</h1>
            <p className={styles.body_par}>
              Here's what's happening with Golobe bookings today.
            </p>

            <AdminStatsGroup
              users={users}
              flights={flights}
              hotels={hotels}
              bookings={bookings}
              loading={loading}
              error={error}
            />
            <AdminTopRated />
            <AdminRecentBookings />
          </div>
        </div>
      </div>
    </section>
  );
};