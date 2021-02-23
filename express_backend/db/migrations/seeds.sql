INSERT INTO customers(id, name, address, phone, email, password) VALUES
 (1, 'Elen', 'Cortana Ave', '6134440099', 'elenaCor@mail.com', '1234');
INSERT INTO customers(id, name, address, phone, email, password) VALUES
 (2, 'Ann', 'Guess Ave', '6134440022', 'AnnGues@mail.com', '4444');
INSERT INTO customers(id, name, address, phone, email, password) VALUES
 (3, 'Roze', 'Lablaws Ave', '6134440088', 'RozeLab@mail.com', '1777');
INSERT INTO customers(id, name, address, phone, email, password) VALUES
 (4, 'Zahra', 'Alice Str', '6134440011', 'ZahraAlc@mail.com', '0815');
INSERT INTO customers(id, name, address, phone, email, password) VALUES
 (5, 'Martin', 'Cheers Ave', '6134441111', 'MartinCh@mail.com', '6111');
SELECT nextval('customers_id_seq'::regclass);

ALTER SEQUENCE customers_id_seq RESTART WITH 6;

INSERT INTO caterers (id, first_name, last_name, address, phone, email, password, account_number, shop_name, shop_logo, shop_description, address_latitude,address_longitude) VALUES
(1, 'Lawrence', 'Axe', 'Baltimore St', '6130006688', 'LawBalt@mail.com','1111', '123','happy shop','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 'Image1',46.449493, -75.637611);
INSERT INTO caterers (id, first_name, last_name, address, phone, email, password, account_number, shop_name, shop_logo, shop_description, address_latitude,address_longitude) VALUES
(2, 'Deen','Winchester', 'Grace St', '6130009999', 'DeenGrace@mail.com','2222','444','nice shop','happy shop','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 'Image2', 45.149493, -76.637611);
INSERT INTO caterers (id, first_name, last_name, address, phone, email, password, account_number, shop_name, shop_logo, shop_description, address_latitude,address_longitude) VALUES
(3, 'Marie','Joy', 'Van St', '6130001111', 'MarieVan@mail.com','3333', '333','hello shop','happy shop','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 'Image3', 45.281528, -75.876250);
INSERT INTO caterers (id, first_name, last_name, address, phone, email, password, account_number, shop_name, shop_logo, shop_description, address_latitude,address_longitude) VALUES
(4, 'Lara', 'Croft','Green St', '6130002233', 'LaraGreen@mail.com','4444', '578', 'grocery shop','happy shop','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 'Image1', 45.400691, -75.620150);
SELECT nextval('caterers_id_seq'::regclass);
ALTER SEQUENCE caterers_id_seq RESTART WITH 5;

INSERT INTO statuses (id, name) VALUES (1,'in progress');
INSERT INTO statuses (id, name) VALUES (2,'ready');
INSERT INTO statuses (id, name) VALUES (3,'completed');
SELECT nextval('statuses_id_seq'::regclass);
ALTER SEQUENCE statuses_id_seq RESTART WITH 4;

INSERT INTO food_types (id,name, icon) VALUES (1, 'canadian', 'Image2');
INSERT INTO food_types (id,name, icon) VALUES (2, 'oriental', 'Image3');
INSERT INTO food_types (id,name, icon) VALUES (3, 'asian', 'Image2');
INSERT INTO food_types (id,name, icon) VALUES (4, 'drinks', 'Image1');
INSERT INTO food_types (id,name, icon) VALUES (5, 'holiday', 'Image3');
INSERT INTO food_types (id,name, icon) VALUES (6, 'seafood', 'Image2');
INSERT INTO food_types (id,name, icon) VALUES (7, 'fastfood', 'Image1');
SELECT nextval('food_types_id_seq'::regclass);
ALTER SEQUENCE food_types_id_seq RESTART WITH 8;

INSERT INTO menu_items (id, caterer_id, food_type_id,name, description, photo, price, active_status, tags) VALUES
(1, 3, 1, 'cheese and broccoli', 'healthy food', 'Image1', 15, TRUE, 'cheese, broccoli');
INSERT INTO menu_items (id, caterer_id, food_type_id,name, description, photo, price,active_status, tags) VALUES
(2, 2, 2, 'mac and cheese', 'tasty food', 'Image2', 16, TRUE, 'mac, cheese');
INSERT INTO menu_items (id, caterer_id, food_type_id,name, description, photo, price, active_status, tags) VALUES
(3, 3, 3, 'beef and rice', 'traditional food', 'Image3', 20, TRUE, 'beef, rice');
INSERT INTO menu_items (id, caterer_id, food_type_id,name, description, photo, price,
active_status, tags) VALUES
(4, 2, 2, 'hummus', 'nutritional', 'Image1', 12, TRUE, 'hummus');
INSERT INTO menu_items (id, caterer_id, food_type_id,name, description, photo, price,
active_status, tags) VALUES
(5, 2, 7, 'hamburger', 'nice and tasty', 'Image3', 9, TRUE, 'hamburger');
INSERT INTO menu_items (id, caterer_id, food_type_id,name, description, photo, price,
active_status, tags) VALUES
(6, 2, 6, 'garlic butter shrimp', 'nice and tasty', 'Image2', 21, TRUE, 'garlic, butter, shrimp');
SELECT nextval('menu_items_id_seq'::regclass);
ALTER SEQUENCE caterers_id_seq RESTART WITH 7;

INSERT INTO pickup_times (id,  menu_item_id, start_time, end_time) VALUES (1, 1, '12:30:000Z', '19:30:000Z');
INSERT INTO pickup_times (id, menu_item_id, start_time, end_time) VALUES (2, 1, '13:00:000Z','19:30:000Z');
INSERT INTO pickup_times (id,  menu_item_id, start_time, end_time) VALUES (3, 3, '12:30:000Z','19:30:000Z');
INSERT INTO pickup_times (id, menu_item_id, start_time, end_time) VALUES (4, 3, '13:00:000Z','19:30:000Z');
INSERT INTO pickup_times (id, menu_item_id, start_time, end_time) VALUES (5, 3, '14:00:000Z','19:30:000Z');
SELECT nextval('pickup_times_id_seq'::regclass);
ALTER SEQUENCE pickup_times_id_seq RESTART WITH 6;

INSERT INTO orders (id, customer_id, status_id, total_amount, phone, pickup_time, pickup_delivery) VALUES
 (1, 1, 1, 22.11, '68700005513', '12:30:000Z', 'pickup');
INSERT INTO orders (id, customer_id,status_id, total_amount, phone, pickup_time, pickup_delivery) VALUES
 (2, 1, 1, 31.12, '68700004444', '15:30:000Z', 'delivery');
INSERT INTO orders (id, customer_id,status_id, total_amount, phone, pickup_time, pickup_delivery) VALUES
 (3, 1, 2, 17, '68700005151', '14:00:000Z', 'pickup');
INSERT INTO orders (id, customer_id,status_id, total_amount, phone, pickup_time, pickup_delivery) VALUES
 (4, 2, 2, 28, '68700005151', '17:00:000Z', 'pickup');
 INSERT INTO orders (id, customer_id,status_id, total_amount, phone, pickup_time, pickup_delivery) VALUES
 (5, 3, 2, 35, '68700005151', '12:00:000Z', 'pickup');
SELECT nextval('orders_id_seq'::regclass);
ALTER SEQUENCE orders_id_seq RESTART WITH 6;

INSERT INTO order_items (id, order_id, menu_item_id, price, quantity) VALUES (1, 3, 1, 11.45, 1);
INSERT INTO order_items (id, order_id, menu_item_id, price, quantity) VALUES (2, 3, 3, 30.67, 1);
INSERT INTO order_items (id, order_id, menu_item_id, price, quantity) VALUES (3, 2, 1, 11.45, 1);
INSERT INTO order_items (id, order_id, menu_item_id, price, quantity) VALUES (4, 2, 3, 30.67, 1);
INSERT INTO order_items (id, order_id, menu_item_id, price, quantity) VALUES (5, 2, 4, 10.67, 2);
SELECT nextval('order_items_id_seq'::regclass);
ALTER SEQUENCE orders_id_seq RESTART WITH 6;

INSERT INTO reviews (id,customer_id,menu_item_id,rating,review_text) VALUES
(1, 1, 1, 4.0, 'love this food');
INSERT INTO reviews (id,customer_id,menu_item_id,rating,review_text) VALUES
(2, 2, 2, 4.0, 'amazing food');
INSERT INTO reviews (id,customer_id,menu_item_id,rating,review_text) VALUES
(3, 1, 3, 4.0, 'tasty food');
INSERT INTO reviews (id,customer_id,menu_item_id,rating,review_text) VALUES
(4, 2, 3, 4.0, 'would recommend to my friends');
SELECT nextval('reviews_id_seq'::regclass);
ALTER SEQUENCE reviews_id_seq RESTART WITH 5;
