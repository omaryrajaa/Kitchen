DROP TABLE IF EXISTS delivery_agents CASCADE;
CREATE TABLE delivery_agents(
    id SERIAL PRIMARY KEY NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    phone VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    account_number VARCHAR(255) NOT NULL
);

DROP TABLE IF EXISTS customers CASCADE;
CREATE TABLE customers(
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    phone VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

DROP TABLE IF EXISTS caterers CASCADE;
CREATE TABLE caterers(
    id SERIAL PRIMARY KEY NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    phone VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    account_number VARCHAR(255) NOT NULL,
    shop_name VARCHAR(255) NOT NULL,
    shop_logo VARCHAR(255) NOT NULL,
    shop_description VARCHAR(255),
    address_latitude NUMERIC(8,6),
    address_longitude NUMERIC(8,6),
    approved BOOLEAN DEFAULT FALSE
);

/**  1: 'in process', 2:'ready', 3: 'completed'*/
DROP TABLE IF EXISTS statuses CASCADE;
CREATE TABLE statuses (
  id SERIAL PRIMARY KEY NOT NULL , 
  name TEXT CHECK (name IN ('in progress', 'ready', 'completed'))
);


DROP TABLE IF EXISTS food_types CASCADE;
CREATE table food_types (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  icon VARCHAR(255)
);

DROP TABLE IF EXISTS menu_items CASCADE;
CREATE TABLE menu_items (
  id SERIAL PRIMARY KEY NOT NULL,
  caterer_id INTEGER REFERENCES caterers(id) ON DELETE CASCADE,
  food_type_id INTEGER REFERENCES food_types(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  photo VARCHAR(255) NOT NULL,
  price NUMERIC(6,2) DEFAULT 0,
  quantity SMALLINT DEFAULT 0,
  active_status BOOLEAN DEFAULT FALSE,
  tags VARCHAR(255) NOT NULL
);

DROP TABLE IF EXISTS pickup_times CASCADE;
CREATE TABLE pickup_times (
 id SERIAL PRIMARY KEY NOT NULL,
 menu_item_id INTEGER REFERENCES menu_items(id) ON DELETE CASCADE,
 start_time TIME,
 end_time TIME
);

DROP TABLE IF EXISTS orders CASCADE;
CREATE TABLE orders (
  id SERIAL PRIMARY KEY NOT NULL,
  customer_id INTEGER REFERENCES customers(id) ON DELETE CASCADE,
  status_id INTEGER REFERENCES statuses(id) ON DELETE CASCADE,
  total_amount NUMERIC(6,2) DEFAULT 0,
  phone VARCHAR(255) NOT NULL,
  pickup_time TIME,
  created_at DATE DEFAULT CURRENT_DATE,
  updated_at DATE DEFAULT CURRENT_DATE,
  pickup_delivery VARCHAR(255) NOT NULL
);

CREATE TABLE order_items (
  id SERIAL PRIMARY KEY NOT NULL,
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
  menu_item_id INTEGER REFERENCES menu_items(id) ON DELETE CASCADE,
  price NUMERIC(6,2) DEFAULT 0,
  quantity SMALLINT DEFAULT 0
);

CREATE TABLE reviews (
  id SERIAL PRIMARY KEY NOT NULL,
  customer_id INTEGER REFERENCES customers(id) ON DELETE CASCADE,
  menu_item_id INTEGER REFERENCES menu_items(id) ON DELETE CASCADE,
  rating NUMERIC(2, 1),
  review_text TEXT,
  date DATE DEFAULT CURRENT_DATE
)