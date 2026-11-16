// "12:00" -> 720 (хвилини від початку доби)
export const timeToMinutes = (time) => {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
};

export const getFilterBounds = (flights) => {
  if (!flights.length) {
    return { minPrice: 0, maxPrice: 0, airlines: [] };
  }
  const prices = flights.map((f) => f.price);
  return {
    minPrice: Math.min(...prices),
    maxPrice: Math.max(...prices),
    airlines: [...new Set(flights.map((f) => f.airlineName))],
  };
};

export const filterFlights = (flights, filters) => {
  const { price, departureTime, rating, airlines, trips } = filters;
  return flights.filter((flight) => {
    // ціна: [min, max]
    if (price && (flight.price < price[0] || flight.price > price[1])) {
      return false;
    }

    // рейтинг: 3 означає rating >= 3
    if (rating && flight.rating < rating) return false;

    // авіакомпанії: порожній масив = без фільтра
    if (airlines?.length && !airlines.includes(flight.airlineName)) {
      return false;
    }

    // час вильоту: підходить, якщо хоча б один рейс потрапляє в діапазон
    if (departureTime) {
      const [from, to] = departureTime;
      const ok = flight.trips.some((trip) => {
        const t = timeToMinutes(trip.departureTime);
        return t >= from && t <= to;
      });
      if (!ok) return false;
    }
    if (trips?.length) {
      const types = [];
      if (flight.tripsCount === 2) types.push("roundtrip");
      if (flight.tripsCount === 1) types.push("onway");

      const supported = trips.filter((t) => t === "roundtrip" || t === "onway");
      if (supported.length && !supported.some((t) => types.includes(t))) {
        return false;
      }
    }

    return true;
  });
};
