
CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	first_name VARCHAR(50) NOT NULL,
	last_name VARCHAR(50) NOT NULL,
	email VARCHAR(100) UNIQUE NOT NULL,
	phone_number VARCHAR(20),
	password VARCHAR(255) NOT NULL,
	date_of_birth DATE,
	created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE cards (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    card_number VARCHAR(30) NOT NULL,
    exp_date VARCHAR(7) NOT NULL,
    name_on_card VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL,
    is_saved BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
)

CREATE TABLE favorites (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    item_type VARCHAR(20) NOT NULL CHECK (item_type IN ('flight', 'hotel')),
    item_id VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_user_favorite UNIQUE (user_id, item_type, item_id)
)

CREATE TABLE bookings (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    card_id INT NOT NULL,
    item_type VARCHAR(50) NOT NULL,
    item_id VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'confirmed',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

CREATE TABLE flights (
	id SERIAL PRIMARY KEY,
	airline_name VARCHAR(100) NOT NULL,
	logo TEXT,
	flight_class VARCHAR(20) NOT NULL default 'Economy' CHECK(flight_class IN ('Economy', 'Business', 'First', 'Premium ')),
	rating NUMERIC(2, 1) CHECK(rating BETWEEN 0 AND 5),
	reviews_count INT NOT NULL DEFAULT 0 CHECK (reviews_count >= 0),
	airport VARCHAR(150) NOT NULL,
	from_code VARCHAR(10) NOT NULL,
	to_code VARCHAR(10) NOT NULL,
	base_price NUMERIC(10, 2) NOT NULL CHECK (base_price > 0),
	part_due_date DATE,
	created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

create table flight_trips (
	id serial primary key,
	flight_id int not null references flights(id) on delete cascade,
	sort_order smallint not null default 0,
	direction varchar(10) not null check (direction in ('Depart', 'Return')),
	trip_date date not null,
	departure_time time not null,
	arrival_time time not null,
	duration_minutes int not null check(duration_minutes > 0),
	departure_airport varchar(100) not null,
	departure_code varchar(10) not null,
	arrival_airport varchar(100) not null,
	arrival_code varchar(10) not null,
	stops varchar(20) not null default 'non stop' check(stops in ('non stop', '1 stop', '2+ stops')),
	status varchar(20) not null default 'Scheduled' check (status in ('Scheduled', 'On time', 'Delayed', 'Boarding', 'Cancelled')),
	aircraft varchar(50)
);

create index idx_flight_trips_flight_id on flight_trips(flight_id);

create table hotels (
	id serial primary key,
	name varchar(150) not null,
	logo_url text,
	country varchar(100) not null,
	city varchar(100) not null,
	address varchar(255) not null,
	google_maps_url text,
	map_embed_url text,
	description text,
	feature text[] not null default '{}',
	price_per_night numeric(10, 2) not null check(price_per_night > 0),
	rating numeric(2, 1) not null check(rating between 0 and 5),
	reviews_count int not null default 0 check (reviews_count >= 0),
	part_due_date date,
	created_at timestamptz default current_timestamp
);

create table hotel_rooms (
	id serial primary key,
	hotel_id int not null references hotels(id) on delete cascade,
	sort_order smallint not null default 0,
	title varchar(255) not null,
	price numeric(10, 2) not null check(price > 0),
	image_url text
);

create table amenities (
	id serial primary key,
	name varchar(100) unique not null,
	icon varchar(100)
);

create table hotel_amenities (
	hotel_id int not null references hotels(id) on delete cascade,
	amenities_id int not null references amenities(id) on delete cascade,
	primary key (hotel_id, amenities_id)
);

create table hotel_reviews (
	id serial primary key,
	hotel_id int not null references hotels(id) on delete cascade,
	user_id int not null references users(id) on delete set null,
	authot_name varchar(100) not null,
	avatar_url text,
	rating numeric(2, 1) not null check(rating between 0 and 5),
	text text not null,
	created_at  TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_hotel_rooms_hotel_id    ON hotel_rooms(hotel_id);
CREATE INDEX idx_hotel_reviews_hotel_id  ON hotel_reviews(hotel_id);
CREATE INDEX idx_hotels_city             ON hotels(city);

select * from hotel_rooms;