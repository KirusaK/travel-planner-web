export const getRoomPhoto = (hotel, limit = 4) => {
  if (!hotel?.rooms) return [];

  return hotel.rooms
    .map((room) => room.imageUrl)
    .filter(Boolean)
    .slice(0, 4);
};
