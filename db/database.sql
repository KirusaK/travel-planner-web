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
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE ,
    card_number VARCHAR(30) NOT NULL ,
    exp_date VARCHAR(7) NOT NULL ,
    name_on_card VARCHAR(100) NOT NULL ,
    country VARCHAR(100) NOT NULL ,
    is_saved BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
)

CREATE TABLE favorites (
    id SERIAL PRIMARY KEY ,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    item_type VARCHAR(20) NOT NULL CHECK (item_type IN ('flight', 'hotel')),
    item_id VARCHAR(100) NOT NULL, -- ID рейса или отеля
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_user_favorite UNIQUE (user_id, item_type, item_id)
)