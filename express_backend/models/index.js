module.exports = (db) => {

  // Customer login
  
  const getCustomerByEmailandPassword = (email, password) => {
  
    const query = {
      text:`SELECT id, name, address, phone, email FROM customers
      WHERE email = $1 AND password = $2`,
      values: [email, password]
  };
  
    return db.query(query)
    .then(result => result.rows[0])
    .catch(err => err)
  }

   // Caterer login
  
   const getCatererByEmailandPassword = (email, password) => {
  
    const query = {
      text:`SELECT id, first_name,last_name, address, phone, email, shop_name, shop_logo FROM caterers
      WHERE email = $1 AND password = $2`,
      values: [email, password]
  };
  
    return db.query(query)
    .then(result => result.rows[0])
    .catch(err => err)
  }

  //orders for specifiic caterer

const getOrdersByCaterer = (catererId) => {

  const query = {
    text:`SELECT orders.id as order,
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
    values:[catererId]
};

  return db
    .query(query)
    .then(result => result.rows)
    .catch(err => err);

};

const getOrdersByCatererAndDate = (catererId) => {
    
  const query = {
    text:`SELECT orders.id as order,
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
group by (orders.id, customers.name, customers.address, statuses.name, caterers.first_name, customers.phone, customers.address,caterers.last_name)`,
    values:[catererId]
};

  return db
    .query(query)
    .then(result => result.rows)
    .catch(err => err);

};


  // all dishes (I called it menus)
  const countCatererItems = (catererId) => {
    console.log("countCatereItems")
    const query = {
      text: `SELECT count(id) as total FROM menu_items
      WHERE caterer_id = $1`,
      values: [catererId]
    }
    return db.query(query)
    .then(result => result.rows[0])
    .catch(err => err)
  }

  // all dishes for today(I called it menus)
  const countCatererTodayItems = (catererId) => {
    console.log("countCatereTotalItems")
    const query = {
      text: `SELECT count(id) as total FROM menu_items
      WHERE caterer_id = $1 
      AND active_status = true`,
      values: [catererId]
    }
    return db.query(query)
    .then(result => result.rows[0])
    .catch(err => err)
  }



  // dishes (menu) for specidic caterer 
    
  const getTodayMenuForCaterer = (catererId) => {
    
    const query = {
      text: `SELECT menu_items.id, menu_items.name as caterer_menu, menu_items.description as description, menu_items.price as price, food_types.name as category, menu_items.photo as photo, caterers.id as caterer_id, caterers.first_name, caterers.last_name, active_status,quantity 
      FROM menu_items
      JOIN caterers ON caterers.id = menu_items.caterer_id
      JOIN food_types ON food_types.id = menu_items.food_type_id 
      WHERE caterers.id = $1
      AND active_status = true
      AND quantity > 0`,
      values: [catererId]
    }

    return db.query(query)
    .then(result => result.rows)
    .catch(err => err)
  }
  
  
 
  
  return {
    getCustomerByEmailandPassword,
    getCatererByEmailandPassword,
    getOrdersByCaterer,
    getOrdersByCatererAndDate,
    countCatererItems,
    countCatererTodayItems,
    getTodayMenuForCaterer


  };
  
  }