import logoHotel from "../../../shared/assets/image/Hotel.svg";
import room1 from "../../../shared/assets/image/Rectangle 5.jpg";
import room2 from "../../../shared/assets/image/Rectangle 6.jpg";
import room3 from "../../../shared/assets/image/Rectangle 7.jpg";
import room4 from "../../../shared/assets/image/Rectangle 8.jpg";

export const hotels = [
  {
    id: "otel-1",
    logo: logoHotel,
    hotelName: "CVK Park Bophysorus Hotel Istanbul",
    location: "Gümüssuyu Mah. Inönü Cad. No:8, Istanbul 34437",
    googleMapsUrl:
      "https://www.google.com/maps/place/G%C3%BCm%C3%BC%C5%9Fsuyu,+%C4%B0n%C3%B6n%C3%BC+Cd.+No:8,+34437+Beyo%C4%9Flu%2F%C4%B0stanbul,+%D0%A2%D1%83%D1%80%D1%86%D0%B8%D1%8F/@41.0349911,28.9858347,17z/data=!3m1!4b1!4m6!3m5!1s0x14cab77b3040c957:0x3d87cd4f09fccfa8!8m2!3d41.0349871!4d28.9884096!16s%2Fg%2F11yw9x2t8z?entry=ttu&g_ep=EgoyMDI2MDcyOS4wIKXMDSoASAFQAw%3D%3D",
    mapEmbedUrl:
      "https://maps.google.com/maps?q=CVK%20Park%20Bosphorus%20Hotel%20Istanbul&t=&z=15&ie=UTF8&iwloc=&output=embed",
    stars: 5,
    type: "Hotel",
    amenities: "20+ Amenities",
    rating: 4.2,
    ratingStatus: "Very Good",
    countReviews: 371,
    price: 240,
    description:
      "Located in Taksim Gmsuyu, the heart of Istanbul, the CVK Park Bosphorus Hotel Istanbul has risen from the ashes of the historic Park Hotel, which also served as Foreign Affairs Palace 120 years ago and is hosting its guests by assuming this hospitality mission. With its 452 luxurious rooms and suites, 8500 m2 SPA and fitness area, 18 meeting rooms including 4 dividable ones and 3 terraces with Bosphorus view, Istanbuls largest terrace with Bosphorus view (4500 m2) and latest technology infrastructure, CVK Park Bosphorus Hotel Istanbul is destined to be the popular attraction point of the city. Room and suite categories at various sizes with city and Bosphorus view, as well as 68 separate luxury suites, are offered to its special guests as a wide variety of selection.",
    features: ["Near park", "Near nightlife", "Near theater", "Clean Hotel"],

    rooms: [
      {
        id: "room-1",
        title: "Superior room - 1 double bed or 2 twin beds",
        price: 240,
        image: room1,
      },
      {
        id: "room-2",
        title: "Superior room - City view  - 1 double bed or 2 twin beds",
        price: 280,
        image: room2,
      },
      {
        id: "room-3",
        title: "Superior room - City view - 1 double bed or 2 twin beds",
        price: 320,
        image: room3,
      },
      {
        id: "room-4",
        title: "Superior room - City view - 1 double bed or 2 twin beds",
        price: 350,
        image: room4,
      },
    ],
  },
];
