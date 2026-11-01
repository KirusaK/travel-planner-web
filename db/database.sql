CREATE TABLE hotels (
  id              SERIAL PRIMARY KEY,
  name            VARCHAR(150) NOT NULL,
  logo_url        TEXT,
  address         VARCHAR(255) NOT NULL,
  google_maps_url TEXT,
  map_embed_url   TEXT,
  description     TEXT,
  features        TEXT[] NOT NULL DEFAULT '{}',   -- features, как в БД
  price_per_night NUMERIC(10, 2) NOT NULL CHECK (price_per_night > 0),
  rating          NUMERIC(2, 1) CHECK (rating BETWEEN 0 AND 5),
  reviews_count   INT NOT NULL DEFAULT 0 CHECK (reviews_count >= 0),
  created_at      TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE hotel_rooms (
  id         SERIAL PRIMARY KEY,
  hotel_id   INT NOT NULL REFERENCES hotels(id) ON DELETE CASCADE,
  sort_order SMALLINT NOT NULL DEFAULT 0,
  title      VARCHAR(255) NOT NULL,
  price      NUMERIC(10, 2) NOT NULL CHECK (price > 0),
  image_url  TEXT
);

CREATE TABLE amenities (
  id   SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL,
  icon VARCHAR(100)
);

CREATE TABLE hotel_amenities (
  hotel_id   INT NOT NULL REFERENCES hotels(id) ON DELETE CASCADE,
  amenity_id INT NOT NULL REFERENCES amenities(id) ON DELETE CASCADE,  -- amenity_id
  PRIMARY KEY (hotel_id, amenity_id)
);

CREATE TABLE hotel_reviews (
  id          SERIAL PRIMARY KEY,
  hotel_id    INT NOT NULL REFERENCES hotels(id) ON DELETE CASCADE,
  user_id     INT REFERENCES users(id) ON DELETE SET NULL,  -- без NOT NULL
  author_name VARCHAR(100) NOT NULL,                        -- исправлена опечатка
  avatar_url  TEXT,
  rating      NUMERIC(2, 1) NOT NULL CHECK (rating BETWEEN 0 AND 5),
  text        TEXT NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_hotel_rooms_hotel_id   ON hotel_rooms(hotel_id);
CREATE INDEX idx_hotel_reviews_hotel_id ON hotel_reviews(hotel_id);