INSERT INTO customers(id, name, address, phone, email, password, address_latitude,address_longitude, postal_code) VALUES
 (1, 'Elen', 'Cortana Ave', '6134440099', 'elenaCor@mail.com', '1234', 45.449493, -75.637611, 'K1K4Z1');
INSERT INTO customers(id, name, address, phone, email, password, address_latitude,address_longitude, postal_code) VALUES
 (2, 'Ann', 'Guess Ave', '6134440022', 'AnnGues@mail.com', '4444', 45.449493, -75.737611, 'J8Y1N3 ');
INSERT INTO customers(id, name, address, phone, email, password, address_latitude,address_longitude, postal_code) VALUES
 (3, 'Roze', 'Lablaws Ave', '6134440088', 'RozeLab@mail.com', '1777', 45.549493, -75.637611,'J8R3G1');
INSERT INTO customers(id, name, address, phone, email, password, address_latitude,address_longitude, postal_code) VALUES
 (4, 'Zahra', 'Alice Str', '6134440011', 'ZahraAlc@mail.com', '0815', 45.349493, -75.437611, 'K4C9Z9');
INSERT INTO customers(id, name, address, phone, email, password, address_latitude,address_longitude, postal_code) VALUES
 (5, 'Martin', 'Cheers Ave', '6134441111', 'MartinCh@mail.com', '6111', 44.449493, -76.637611, 'K0H1V0');
SELECT nextval('customers_id_seq'::regclass);

ALTER SEQUENCE customers_id_seq RESTART WITH 6;
INSERT INTO caterers (id, first_name, last_name, address, phone, email, password, account_number, shop_name, shop_logo, address_latitude,address_longitude, postal_code) VALUES
(1, 'Lawrence', 'Axe', 'Baltimore St', '6130006688', 'LawBalt@mail.com','1111', '123','happy shop', 'Image1',46.449493, -75.637611, 'J9L0T9');
INSERT INTO caterers (id, first_name, last_name, address, phone, email, password, account_number, shop_name, shop_logo, address_latitude,address_longitude, postal_code) VALUES
(2, 'Deen','Winchester', 'Grace St', '6130009999', 'DeenGrace@mail.com','2222','444','nice shop', 'Image2', 45.149493, -76.637611,'K0A2L0 ');
INSERT INTO caterers (id, first_name, last_name, address, phone, email, password, account_number, shop_name, shop_logo, address_latitude,address_longitude, postal_code) VALUES
(3, 'Marie','Joy', 'Van St', '6130001111', 'MarieVan@mail.com','3333', '333','hello shop', 'Image3', 45.281528, -75.876250, 'K2S0T7');
INSERT INTO caterers (id, first_name, last_name, address, phone, email, password, account_number, shop_name, shop_logo, address_latitude,address_longitude, postal_code) VALUES
(4, 'Lara', 'Croft','Green St', '6130002233', 'LaraGreen@mail.com','4444', '578', 'grocery shop', 'Image1', 45.400691, -75.620150, 'K1B4K1');
SELECT nextval('caterers_id_seq'::regclass);
ALTER SEQUENCE caterers_id_seq RESTART WITH 5;

INSERT INTO statuses (id, name) VALUES (1,'in progres');
INSERT INTO statuses (id, name) VALUES (2,'ready for pick up');
INSERT INTO statuses (id, name) VALUES (3,'done');
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
INSERT INTO menu_items (id, caterer_id, food_type_id,name, description, photo, price, active_status) VALUES
(1, 3, 1, 'cheese and broccoli', 'healthy food', 'Image1', 15, TRUE);
INSERT INTO menu_items (id, caterer_id, food_type_id,name, description, photo, price,active_status) VALUES
(2, 2, 2, 'mac and cheese', 'tasty food', 'Image2', 16, TRUE);
INSERT INTO menu_items (id, caterer_id, food_type_id,name, description, photo, price, active_status) VALUES
(3, 3, 3, 'beef and rice', 'traditional food', 'Image3', 20, TRUE);
INSERT INTO menu_items (id, caterer_id, food_type_id,name, description, photo, price,
active_status) VALUES
(4, 2, 2, 'hummus', 'nutritional', 'Image1', 12, TRUE);
INSERT INTO menu_items (id, caterer_id, food_type_id,name, description, photo, price,
active_status) VALUES
(5, 2, 7, 'hamburger', 'nice and tasty', 'Image3', 9, TRUE);
INSERT INTO menu_items (id, caterer_id, food_type_id,name, description, photo, price,
active_status) VALUES
(6, 2, 6, 'garlic butter shrimp', 'nice and tasty', 'Image2', 21, TRUE);
SELECT nextval('menu_items_id_seq'::regclass);
ALTER SEQUENCE caterers_id_seq RESTART WITH 7;
INSERT INTO pickup_times (id,  menu_item_id, time) VALUES (1, 1, '12:30:000Z');
INSERT INTO pickup_times (id, menu_item_id, time) VALUES (2, 1, '13:00:000Z');
INSERT INTO pickup_times (id,  menu_item_id, time) VALUES (3, 3, '12:30:000Z');
INSERT INTO pickup_times (id, menu_item_id, time) VALUES (4, 3, '13:00:000Z');
INSERT INTO pickup_times (id, menu_item_id, time) VALUES (5, 3, '14:00:000Z');
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
