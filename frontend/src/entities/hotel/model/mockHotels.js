import logoHotel from "../../../shared/assets/image/Hotel.svg";
import room1 from "../../../shared/assets/image/Rectangle 5.jpg";
import room2 from "../../../shared/assets/image/Rectangle 6.jpg";
import room3 from "../../../shared/assets/image/Rectangle 7.jpg";
import room4 from "../../../shared/assets/image/Rectangle 8.jpg";
import people from "../../../shared/assets/image/Ellipse 1.jpg";

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

    amenitiesList: [
      { id: "outdoor-pool", name: "Outdoor pool", icon: "icon-mdi_pool" },
      { id: "indoor-pool", name: "Indoor pool", icon: "icon-mdi_pool" },
      {
        id: "spa-wellness",
        name: "Spa and wellness center",
        icon: "icon-material-symbols_spa-rounded",
      },
      {
        id: "restaurant",
        name: "Restaurant",
        icon: "icon-ic_round-restaurant",
      },
      {
        id: "room-service",
        name: "Room service",
        icon: "icon-material-symbols_room-service-rounded",
      },
      {
        id: "fitness-center",
        name: "Fitness center",
        icon: "icon-maki_fitness-centre",
      },
      { id: "bar", name: "Bar/Lounge", icon: "icon-ion_wine" },
      { id: "wi-fi", name: "Free Wi-Fi", icon: "icon-Wifi" },
      { id: "tea-coffee", name: "Tea/coffee machine", icon: "icon-Breakfast" },
      { id: "parking", name: "Free parking", icon: "icon-local_parking" },
      {
        id: "airport-shuttle",
        name: "Airport shuttle",
        icon: "icon-airport_shuttle",
      },
      {
        id: "air-conditioning",
        name: "Air conditioning",
        icon: "air-conditioning",
      },
      {
        id: "24h-front-desk",
        name: "24-hour front desk",
        icon: "icon-brightness-contrast",
      },
      { id: "beachfront", name: "Beachfront access", icon: "icon-sun" },
      { id: "pet-friendly", name: "Pet friendly", icon: "icon-github" },
      { id: "laundry", name: "Laundry service", icon: "icon-lanyrd" },
      { id: "non-smoking", name: "Non-smoking rooms", icon: "non-smoking" },
      { id: "family-rooms", name: "Family rooms", icon: "family-rooms" },
      { id: "elevator", name: "Elevator", icon: "elevator" },
      { id: "heating", name: "Heating", icon: "heating" },
      { id: "breakfast", name: "Superb breakfast", icon: "breakfast" },
      {
        id: "business-center",
        name: "Business center",
        icon: "business-center",
      },
      { id: "balcony", name: "Private balcony", icon: "balcony" },
      { id: "ev-charging", name: "EV charging station", icon: "ev-charging" },
      { id: "kids-club", name: "Kids' club", icon: "kids-club" },
      { id: "terrace", name: "Sun terrace", icon: "balcony" },
      { id: "sauna", name: "Sauna", icon: "sauna" },
      { id: "hot-tub", name: "Hot tub / Jacuzzi", icon: "hot-tub" },
      { id: "concierge", name: "Concierge service", icon: "concierge" },
      {
        id: "luggage-storage",
        name: "Luggage storage",
        icon: "luggage-storage",
      },
      {
        id: "currency-exchange",
        name: "Currency exchange",
        icon: "currency-exchange",
      },
      { id: "car-hire", name: "Car hire", icon: "car-hire" },
      { id: "golf-course", name: "Golf course", icon: "golf-course" },
    ],

    reviews: [
      {
        id: "1",
        img: people,
        assessment: "5.0 Amazing",
        name: "Omar Siphron",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      },
      {
        id: "2",
        img: people,
        assessment: "5.0 Amazing",
        name: "Cristofer Ekstrom Bothman",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      },
      {
        id: "3",
        img: people,
        assessment: "5.0 Amazing",
        name: "Kaiya Lubin",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      },
      {
        id: "4",
        img: people,
        assessment: "5.0 Amazing",
        name: "Erin Septimus",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      },
      {
        id: "5",
        img: people,
        assessment: "5.0 Amazing",
        name: "Terry George",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      },
    ],
  },
];
