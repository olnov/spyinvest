DROP TABLE IF EXISTS portfolio_assets;
DROP TABLE IF EXISTS assets;
DROP TABLE IF EXISTS portfolios;
DROP TABLE IF EXISTS users;
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Users table.

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password TEXT NOT NULL,
    photo BYTEA,
    gender VARCHAR(1),
    birth_date DATE,
    registred_at DATE NOT NULL
);

-- Portfolios table

CREATE TABLE portfolios (
    id SERIAL PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    description VARCHAR(250),
    user_id INT NOT NULL,
    created_at DATE NOT NULL
);

-- Assets table
CREATE TABLE assets (
    id SERIAL PRIMARY KEY,
    asset VARCHAR(100) NOT NULL
);

-- Portfolio_assets table
CREATE TABLE portfolio_assets (
    id SERIAL PRIMARY KEY,
    portfolio_id INT NOT NULL,
    asset_id INT NOT NULL,
    date_purchase DATE NOT NULL,
    date_sell DATE,
    quantity_purchase INT NOT NULL,
    quantity_sell INT, 
    price_buy FLOAT NOT NULL,
    price_sell FLOAT,
    created_at DATE NOT NULL
);

ALTER TABLE portfolios ADD FOREIGN KEY (user_id) REFERENCES users (id);
ALTER TABLE portfolio_assets ADD FOREIGN KEY (portfolio_id) REFERENCES portfolios (id);
ALTER TABLE portfolio_assets ADD FOREIGN KEY (asset_id) REFERENCES assets (id);



-- Test data

INSERT INTO users (name, email, password) VALUES ('Marco Polo','marco@gmail.com',crypt('password!1', gen_salt('bf')));

