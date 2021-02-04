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
    
const getMenuForCaterer = (catererId) => {
    
  const query = {
    text: `SELECT menu_items.id, menu_items.name as caterer_menu, menu_items.description as description, menu_items.price as price, food_types.name as category, menu_items.photo as photo, caterers.id as caterer_id, caterers.last_name, caterers.first_name, active_status, menu_items.quantity 
    FROM menu_items
    JOIN caterers ON caterers.id = menu_items.caterer_id
    INNER JOIN food_types ON food_types.id = menu_items.food_type_id 
    WHERE caterers.id = $1`,
    values: [catererId]
  }

  return db.query(query)
  .then(result => result.rows)
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
  
  // add new dish 
  const addMenuItem = (catererId,foodTypeName, dishName, foodDescription, foodPhoto, foodPrice, status, quantity) => {

    const query = {
      text: `insert into menu_items 
      (id,caterer_id, food_type_id, name,description, photo, price,active_status,quantity)
      VALUES
      (DEFAULT,$1,(SELECT id from food_types where name = $2), $3, $4, $5, $6,$7,$8) RETURNING *`,
      values: [catererId, foodTypeName, dishName, foodDescription, foodPhoto, foodPrice,status,quantity]
    }

    return db.query(query)
      .then(result => result.rows[0])
      .catch(err => err)
  }
  
  //updateCatererMenu
   // change menu item 
   const updateMenuItem = (menuItemId, dishName, foodDescription, foodPrice, status,quantity) => {
    console.log("///////////////////////")
    const query = {
      text: `UPDATE menu_items SET  name = $2, description = $3, price = $4, active_status = $5, quantity = $6  WHERE id = $1 RETURNING *`,
      values: [menuItemId, dishName, foodDescription, foodPrice, status,quantity]
      
  }

    return db.query(query)
      .then(result => result.rows[0])
      .catch(err => err)
}

//deleteCatererMenu

  const deleteMenuItem = (menuItemId) => {

    const query = {
      text: `DELETE from menu_items WHERE id = $1`,
      values: [menuItemId]
    }

    return db.query(query)
    .then(result => result.rows[0])
    .catch(err => err)
  }
  

  // dishes in Oreder
 const getCatererItemsByOrder = (catererId, orderId) => {
    
  const query = {
    text: `select menu_items.* ,order_items.price as order_items_price, order_items.quantity , orders.* 
    from menu_items
    join order_items ON order_items.menu_item_id = menu_items.id
    JOIN orders ON orders.id = order_items.order_id
    where caterer_id = $1
    and order_id = $2`,
    values: [catererId, orderId]
  }

  return db.query(query)
  .then(result => result.rows)
  .catch(err => err)
}

 
    // change order status 
    const updateCatererOrderStatus = (orderId,status) => {
      console.log("///////////////////////")
      const query = {
        text: `UPDATE orders SET  status_id = (SELECT id from statuses where name = $2) , updated_at = CURRENT_DATE  WHERE id = $1 RETURNING *`,
        values: [orderId,status]
        
    }
    
      return db.query(query)
        .then(result => result.rows[0])
        .catch(err => err)
    }

    // all caterers 

const getCaterers = () => {

  const query = {
    text:`SELECT id, first_name, last_name, address, phone, email, account_number, shop_name AS shop, shop_logo,shop_description, json_build_object('lat', address_latitude, 'lng', address_longitude) AS location FROM caterers`
};

  return db.query(query)
  .then(result => result.rows)
  .catch(err => err)
}

// top 3 caterers

const getTopCaterers = () => {
    
  const query = {
    text: `select avg(rating) , caterers.* 
    from reviews 
    join menu_items ON menu_items.id  = reviews.menu_item_id 
    join caterers on caterers.id = menu_items.caterer_id
    group by (caterers.id) order by avg(rating) desc LIMIT 3`
  }

  return db.query(query)
  .then(result => result.rows)
  .catch(err => err)

}

// list menu_items per name 
const getMenusByName = (dishName) => {
  console.log("dishName get= ", dishName)

  const query = {
    text:`SELECT menu_items.id as menu_item_id,
    menu_items.name as dish_name,
    caterers.last_name,
    caterers.first_name,
    caterers.address,
    caterers.phone,
    food_types.id,
    food_types.name as category,
    menu_items.photo,
    menu_items.price, 
    menu_items.description
    FROM menu_items
    JOIN food_types ON menu_items.food_type_id = food_types.id
    JOIN caterers ON menu_items.caterer_id = caterers.id
    WHERE menu_items.name LIKE '%' || $1 || '%'`,
    values: [dishName]
};

  return db.query(query)
  .then(result => result.rows)
  .catch(err => err)
}

// list menu_items per category 
    
const getMenuByCategory = (category) => {
  console.log("dishName get= ", category)

  const query = {
    text:`SELECT menu_items.id AS id,
    menu_items.name as name,
    caterers.first_name,
    caterers.last_name,
    caterers.address,
    caterers.phone,
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
    values: [category]
}

  return db.query(query)
  .then(result => result.rows)
  .catch(err => err)
}



// all categories
const getFoodTypes = () => {

  const query = {
    text:`SELECT * FROM food_types`
};

  return db.query(query)
  .then(result => result.rows)
  .catch(err => err)
}

// reviews by item

const getItemReviews = (menuItemId) => {
    
  const query = {
    text: `SELECT *
          FROM reviews 
          WHERE menu_item_id = $1`,
    values: [menuItemId]
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
    getItemReviews


  };
  
  }