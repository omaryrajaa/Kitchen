module.exports = (db) => {
  // Customer login

  const getCustomerByEmailandPassword = (email, password) => {
    const query = {
      text: `SELECT id, name, address, phone, email FROM customers
      WHERE email = $1 AND password = $2`,
      values: [email, password],
    };

    return db
      .query(query)
      .then((result) => result.rows[0])
      .catch((err) => err);
  };

  // Caterer login

  const getCatererByEmailandPassword = (email, password) => {
    const query = {
      text: `SELECT id, first_name,last_name, address, phone, email, shop_name, shop_logo FROM caterers
      WHERE email = $1 AND password = $2`,
      values: [email, password],
    };

    return db
      .query(query)
      .then((result) => result.rows[0])
      .catch((err) => err);
  };

  //orders for specifiic caterer

  const getOrdersByCaterer = (catererId) => {
    const query = {
      text: `SELECT orders.id as order,
    orders.total_amount AS amount,
    customers.name AS customer,
    customers.address AS customer_address,
    customers.phone AS customer_phone,
    statuses.name AS status,
    caterers.first_name as caterer, caterers.last_name 
    FROM orders
    JOIN customers ON customers.id = orders.customer_id
    JOIN statuses on orders.status_id = statuses.id
    JOIN order_items ON order_items.order_id = orders.id
    JOIN menu_items ON menu_items.id = order_items.menu_item_id
    JOIN caterers ON caterers.id = menu_items.caterer_id
    WHERE caterers.id = $1

group by (orders.id, customers.name, customers.address, statuses.name, caterers.first_name, customers.phone, customers.address,caterers.last_name)`,
      values: [catererId],
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getOrdersByCatererAndDate = (catererId) => {
    const query = {
      text: `SELECT orders.id as order,
    orders.total_amount AS amount,
    customers.name AS customer,
    customers.address AS customer_address,
    customers.phone AS customer_phone,
    statuses.name AS status,
    orders.pickup_time,
    orders.pickup_delivery,
    caterers.first_name as caterer, caterers.last_name 
    FROM orders
    JOIN customers ON customers.id = orders.customer_id
    JOIN statuses on orders.status_id = statuses.id
    JOIN order_items ON order_items.order_id = orders.id
    JOIN menu_items ON menu_items.id = order_items.menu_item_id
    JOIN caterers ON caterers.id = menu_items.caterer_id
    WHERE caterers.id = $1
    AND orders.created_at = CURRENT_DATE
    AND orders.status_id IN (1, 2)
group by (orders.id, customers.name, customers.address, statuses.name, caterers.first_name, customers.phone, customers.address,caterers.last_name)
ORDER BY orders.pickup_time`,
      values: [catererId],
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  // all dishes (I called it menus)
  const countCatererItems = (catererId) => {
    const query = {
      text: `SELECT count(id) as total FROM menu_items
      WHERE caterer_id = $1`,
      values: [catererId],
    };
    return db
      .query(query)
      .then((result) => result.rows[0])
      .catch((err) => err);
  };

  // all dishes for today(I called it menus)
  const countCatererTodayItems = (catererId) => {
    const query = {
      text: `SELECT count(id) as total FROM menu_items
      WHERE caterer_id = $1 
      AND active_status = true
      AND quantity > 0`,
      values: [catererId],
    };
    return db
      .query(query)
      .then((result) => result.rows[0])
      .catch((err) => err);
  };

  // dishes (menu) for specidic caterer

  const getMenuForCaterer = (catererId) => {
    const query = {
      text: `SELECT menu_items.id, menu_items.name as caterer_menu, menu_items.description as description, menu_items.price as price,menu_items.quantity, menu_items.tags, food_types.name as category, menu_items.photo as photo, caterers.id as caterer_id, caterers.last_name, caterers.first_name,caterers.shop_logo,caterers.shop_name,caterers.shop_description, active_status, menu_items.quantity 
    FROM menu_items
    JOIN caterers ON caterers.id = menu_items.caterer_id
    INNER JOIN food_types ON food_types.id = menu_items.food_type_id 
    WHERE caterers.id = $1`,
      values: [catererId],
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  // dishes (menu) for specidic caterer

  const getTodayMenuForCaterer = (catererId) => {
    const query = {
      text: `SELECT menu_items.id, menu_items.name as caterer_menu, menu_items.description as description, menu_items.price as price,menu_items.tags, food_types.name as category, menu_items.photo as photo, caterers.id as caterer_id, caterers.first_name, caterers.last_name,caterers.shop_name, caterers.shop_logo, caterers.shop_description, active_status,quantity 
      FROM menu_items
      JOIN caterers ON caterers.id = menu_items.caterer_id
      JOIN food_types ON food_types.id = menu_items.food_type_id 
      WHERE caterers.id = $1
      AND active_status = true
      AND quantity > 0`,
      values: [catererId],
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  // add new food type
  const addFoodType = (name, icon) => {
    const query = {
      text: `WITH s AS( 
        select id,"name","icon"
        from food_types
        where name = $1
        ),
        i AS (
        INSERT INTO food_types("name", "icon")
                SELECT $1, $2
                WHERE NOT EXISTS (SELECT 1 FROM s) returning id)
        select id from i union all select id from s`,
      values: [name, icon],
    };

    return db
      .query(query)
      .then((result) => result.rows[0])
      .catch((err) => err);
  };

  // add new dish
  const addMenuItem = (
    catererId,
    foodType,
    dishName,
    foodDescription,
    foodPhoto,
    foodPrice,
    status,
    quantity,
    tags
  ) => {
    const query = {
      text: `insert into menu_items 
      (id,caterer_id, food_type_id, name,description, photo, price,active_status,quantity,tags)
      VALUES
      (DEFAULT,$1,$2, $3, $4, $5, $6,$7,$8,$9) RETURNING *`,
      values: [
        catererId,
        foodType,
        dishName,
        foodDescription,
        foodPhoto,
        foodPrice,
        status,
        quantity,
        tags,
      ],
    };
    return db
      .query(query)
      .then((result) => result.rows[0])
      .catch((err) => err);
  };

  //updateCatererMenu
  // change menu item
  const updateMenuItem = (
    menuItemId,
    dishName,
    foodDescription,
    foodPrice,
    status,
    quantity,
    tags
  ) => {
    const query = {
      text: `UPDATE menu_items SET  name = $2, description = $3, price = $4, active_status = $5, quantity = $6, tags = $7  WHERE id = $1 RETURNING *`,
      values: [
        menuItemId,
        dishName,
        foodDescription,
        foodPrice,
        status,
        quantity,
        tags,
      ],
    };

    return db
      .query(query)
      .then((result) => result.rows[0])
      .catch((err) => err);
  };

  //deleteCatererMenu

  const deleteMenuItem = (menuItemId) => {
    const query = {
      text: `DELETE from menu_items WHERE id = $1`,
      values: [menuItemId],
    };

    return db
      .query(query)
      .then((result) => result.rows[0])
      .catch((err) => err);
  };

  // dishes in Oreder
  const getCatererItemsByOrder = (catererId, orderId) => {
    const query = {
      text: `select menu_items.* ,order_items.price as order_items_price, order_items.quantity , orders.* 
    from menu_items
    join order_items ON order_items.menu_item_id = menu_items.id
    JOIN orders ON orders.id = order_items.order_id
    where caterer_id = $1
    and order_id = $2`,
      values: [catererId, orderId],
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  // change order status
  const updateCatererOrderStatus = (orderId, status) => {
    const query = {
      text: `UPDATE orders SET  status_id = (SELECT id from statuses where name = $2) , updated_at = CURRENT_DATE  WHERE id = $1 RETURNING *`,
      values: [orderId, status],
    };
    return db
      .query(query)
      .then((result) => result.rows[0])
      .catch((err) => err);
  };

  // all caterers

  const getCaterers = () => {
    const query = {
      text: `select ROUND(AVG(rating),1) AS rate , caterers.id, first_name, last_name, address, phone, email, shop_name , shop_logo,shop_description, json_build_object('lat', address_latitude, 'lng', address_longitude) AS location 
    from reviews 
    RIGHT join menu_items ON menu_items.id  = reviews.menu_item_id 
    RIGHT join caterers on caterers.id = menu_items.caterer_id
    group by (caterers.id) order by shop_name`,
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  // top 3 caterers

  const getTopCaterers = () => {
    const query = {
      text: `select ROUND(AVG(rating),1) AS rate , caterers.* 
    from reviews 
    join menu_items ON menu_items.id  = reviews.menu_item_id 
    join caterers on caterers.id = menu_items.caterer_id
    group by (caterers.id) order by avg(rating) desc LIMIT 3`,
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  // list menu_items per name
  const getMenusByName = (dishName) => {
    const query = {
      text: `SELECT menu_items.id as menu_item_id,
    menu_items.name as dish_name,
    caterers.id AS caterer_id,
    caterers.last_name,
    caterers.first_name,
    caterers.address,
    caterers.phone,
    caterers.shop_name,
    caterers.shop_logo,
    caterers.shop_description,
    food_types.id,
    food_types.name as category,
    menu_items.photo,
    menu_items.price, 
    menu_items.description,
    menu_items.quantity
    FROM menu_items
    JOIN food_types ON menu_items.food_type_id = food_types.id
    JOIN caterers ON menu_items.caterer_id = caterers.id
    WHERE menu_items.tags ILIKE '%' || $1 || '%'`,
      values: [dishName],
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  // list menu_items per category

  const getMenuByCategory = (category) => {
    const query = {
      text: `SELECT menu_items.id AS id,
    menu_items.name as name,
    caterers.id as caterer_id,
    caterers.first_name,
    caterers.last_name,
    caterers.address,
    caterers.phone,
    caterers.shop_logo,
    caterers.shop_name,
    caterers.shop_description,
    food_types.id,
    food_types.name as category,
    menu_items.photo,
    menu_items.price, 
    menu_items.description,
    menu_items.quantity
    FROM menu_items
    JOIN food_types ON menu_items.food_type_id = food_types.id
    JOIN caterers ON menu_items.caterer_id = caterers.id
    WHERE food_types.id = $1`,
      values: [category],
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  // all categories
  const getFoodTypes = () => {
    const query = {
      text: `SELECT * FROM food_types`,
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  // reviews by item

  const getItemReviews = (menuItemId) => {
    const query = {
      text: `SELECT reviews.id, reviews.rating, reviews.review_text as text,TO_CHAR(date :: DATE, 'dd/mm/yyyy') as date, customers.name AS name
          FROM reviews 
          JOIN customers ON customers.id = reviews.customer_id
          WHERE menu_item_id = $1`,
      values: [menuItemId],
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  // add review
  const addReview = (customerId, menuItemId, rating, reviewText) => {
    const query = {
      text: `insert into reviews 
    (id,customer_id, menu_item_id, rating,review_text)
    VALUES
    (DEFAULT,$1, $2 , $3, $4) RETURNING *`,
      values: [customerId, menuItemId, rating, reviewText],
    };

    return db
      .query(query)
      .then((result) => result.rows[0])
      .catch((err) => err);
  };

  // reviews by item

  const getCatererReviews = (catererId) => {
    const query = {
      text: `SELECT reviews.id, reviews.rating, reviews.review_text as text,TO_CHAR(date :: DATE, 'dd/mm/yyyy') as date, customers.name AS name
          FROM reviews 
          JOIN customers ON customers.id = reviews.customer_id
          JOIN menu_items ON menu_items.id = reviews.menu_item_id
          JOIN caterers ON caterers.id = menu_items.caterer_id
          WHERE caterers.id = $1`,
      values: [catererId],
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  // login and password check

  const getCustomerByEmail = (email) => {
    const query = {
      text: `SELECT * FROM customers
    WHERE email = $1`,
      values: [email],
    };

    return db
      .query(query)
      .then((result) => result.rows[0])
      .catch((err) => err);
  };

  // new Customer
  const addCustomer = (
    name,
    address,
    phone,
    email,
    password
  ) => {
    const query = {
      text: `INSERT INTO customers (name, address, phone, email, password) VALUES ($1, $2, $3,$4, $5) RETURNING *`,
      values: [name, address, phone, email, password],
    };

    return db
      .query(query)
      .then((result) => result.rows[0])
      .catch((err) => err);
  };

  //Caterer signUp

  const addCaterer = (
    firstname,
    lastname,
    address,
    phone,
    email,
    password,
    accountNumber,
    shopname,
    shoplogo,
    shopdescription,
    latitude,
    longitude,
    delivery
  ) => {
    const query = {
      text: `INSERT INTO caterers (first_name, last_name, address, phone, email, password, account_number, shop_name, shop_logo, shop_description,address_latitude,address_longitude,delivery) VALUES ($1, $2, $3,$4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *`,
      values: [
        firstname,
        lastname,
        address,
        phone,
        email,
        password,
        accountNumber,
        shopname,
        shoplogo,
        shopdescription,
        latitude,
        longitude,
        delivery,
      ],
    };

    return db
      .query(query)
      .then((result) => result.rows[0])
      .catch((err) => err);
  };

  //Delivery signUp

  const addDelivery = (
    firstname,
    lastname,
    address,
    phone,
    email,
    password,
    accountNumber
  ) => {
    const query = {
      text: `INSERT INTO delivery_agents (first_name, last_name, address, phone, email, password, account_number) VALUES ($1, $2, $3,$4, $5, $6, $7) RETURNING *`,
      values: [
        firstname,
        lastname,
        address,
        phone,
        email,
        password,
        accountNumber,
      ],
    };

    return db
      .query(query)
      .then((result) => result.rows[0])
      .catch((err) => err);
  };

  // register Delivery (email check)

  const getDeliveryByEmail = (email) => {
    const query = {
      text: `SELECT * FROM delivery_agents
      WHERE email = $1`,
      values: [email],
    };

    return db
      .query(query)
      .then((result) => result.rows[0])
      .catch((err) => err);
  };

  // register Caterer (email check)

  const getCatererByEmail = (email, shopname) => {
    const query = {
      text: `SELECT * FROM caterers
    WHERE email = $1 
    OR shop_name = $2`,
      values: [email, shopname],
    };

    return db
      .query(query)
      .then((result) => result.rows[0])
      .catch((err) => err);
  };

  // when we add new order we should add order items at the same moment

  const addNewOrder = (
    customerId,
    statusId,
    totalAmount,
    phone,
    pickupTime,
    pickupOrDelivery,
    listItemsId,
    ListPrices,
    listQty
  ) => {
    const query = {
      text: `WITH order_key AS (INSERT INTO orders(customer_id,status_id,total_amount,phone,pickup_time,created_at,updated_at,pickup_delivery) 
          VALUES($1,$2,$3, $4,$5,CURRENT_DATE,CURRENT_DATE,$6) RETURNING id)
          INSERT INTO order_items(order_id,menu_item_id,price,quantity) 
          SELECT order_key.id, t.a, t.b, t.c
          FROM order_key,(SELECT UNNEST($7::int[]) AS a, UNNEST($8::numeric[]) AS b, UNNEST($9::smallint[]) AS c) t`,
      values: [
        customerId,
        statusId,
        totalAmount,
        phone,
        pickupTime,
        pickupOrDelivery,
        listItemsId,
        ListPrices,
        listQty,
      ],
    };
    return db.query(query)
    .then((result) => result.rows[0])
    .catch((err) => err);
  };

  return {
    getCustomerByEmailandPassword,
    getCatererByEmailandPassword,
    getOrdersByCaterer,
    getOrdersByCatererAndDate,
    countCatererItems,
    countCatererTodayItems,
    getTodayMenuForCaterer,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    getMenuForCaterer,
    getCatererItemsByOrder,
    updateCatererOrderStatus,
    getCaterers,
    getTopCaterers,
    getMenusByName,
    getMenuByCategory,
    getFoodTypes,
    getItemReviews,
    addReview,
    getCatererReviews,
    getCustomerByEmail,
    addCustomer,
    getCatererByEmail,
    addCaterer,
    addNewOrder,
    addFoodType,
    getDeliveryByEmail,
    addDelivery,
  };
};
