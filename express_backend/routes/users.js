const express = require('express');
const { route } = require('.');
const router = express.Router();


module.exports = ({
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
  



   }) => {
//********************************************Landing Page*************************************** */


// all caterers

router.get('/caterers', function(req, res){
  
  getCaterers() 
    .then(caterers => res.json(caterers))
    .catch(err => res.json( {
      error: err.message
    }))
  
});

// top 3 caterers

router.get('/caterers/top', function(req, res){
  
  getTopCaterers() 
    .then(menus => res.json(menus))
    .catch(err => res.json( {
      error: err.message
    }))
  
});

/** return all dishes containing this 
 * http://localhost:3005/api/menus/dish_name?dishName=cheese*/

 router.get('/menus/dish_name', function(req, res) {

  const {
    dishName
  } = req.query;

  getMenusByName(dishName)
  .then(menuItems => res.json(menuItems))
  .catch(err => res.json( {
    error: err.message
  }))
});

//reviews for a dish


router.get('/reviews/menuItem', function(req, res) {

  const {
    menuItemId
  } = req.query;

  getItemReviews(menuItemId)
  .then(reviews => res.json(reviews))
  .catch(err => res.json( {
    error: err.message
  }))
});

// all food categories
router.get('/foodTypes', function(req, res){
  getFoodTypes()
  .then(foodTypes => res.json(foodTypes))
  .catch(err => res.json( {
    error: err.message
  }))
})


// menu_items by Category

router.get('/categories/:category/menuItems', function(req, res) {

  const {
    category
  } = req.query;

  getMenuByCategory(category)
  .then(menuItems => res.json(menuItems))
  .catch(err => res.json( {
    error: err.message
  }))
});


//********************************************Login************************************************/
// customer login 
router.post('/customers/login', function(req, res) {

  const {
    email,
    password
  } = req.body;

  console.log(req.body)

  getCustomerByEmailandPassword(email, password)
  .then(customers => res.json(customers))
  .catch(err => res.json( {
    error: err.message
  }))

});

// caterer login 
router.post('/caterers/login', function(req, res) {

  const {
    email,
    password
  } = req.body;

  console.log(req.body)

  getCatererByEmailandPassword(email, password)
  .then(caterers => res.json(caterers))
  .catch(err => res.json( {
    error: err.message
  }))

})


//********************************************Orders************************************************/

// getOrdersByCaterer 

router.get('/caterers/:catererId/orders', function(req, res) {

  const {
    catererId
  } = req.params;
  
  getOrdersByCaterer(catererId)
  .then(caterer => res.json(caterer))
  .catch(err => res.json( {
    error: err.message
  }))
});


// List orders for today

router.get('/caterers/:catererId/orders/today', function(req, res) {

  const {
    catererId
  } = req.params;
  
  getOrdersByCatererAndDate(catererId)
  .then(caterer => res.json(caterer))
  .catch(err => res.json( {
    error: err.message
  }))
});

// dishes
router.get('/caterers/:catererId/orders/:orderId', function(req, res) {

  const {
    catererId,
    orderId
  } = req.params;
  
  getCatererItemsByOrder(catererId,orderId)
  .then(caterer => res.json(caterer))
  .catch(err => res.json( {
    error: err.message
  }))
});

router.put('/caterers/:catererId/orders/:orderId',function(req, res) {
  console.log("**********************update order")

  const {
    orderId
  } = req.params;

  const {
    status
  } = req.body;

  updateCatererOrderStatus(orderId,status)
  .then(newMenuItem => res.json(newMenuItem))
  .catch(err => res.json({
    error: err.message
  }))
})




//********************************************Menus************************************************/
router.get('/caterers/:catererId/menus', function(req, res){
  
  const {
    catererId
  } = req.params;
  console.log("cateerr =", catererId)
  getMenuForCaterer(catererId)
    .then(menus => res.json(menus))
    .catch(err => res.json( {
      error: err.message
    }))
  
});

router.post('/caterers/:catererId/menus',function(req, res) {

  const {
    catererId,
    foodTypeName,
    dishName,
    foodDescription,
    foodPhoto,
    foodPrice,
    status,
    quantity
  } = req.body;

  addMenuItem(catererId,foodTypeName,dishName,foodDescription,foodPhoto,foodPrice,status,quantity)
  .then(newMenuItem => res.json(newMenuItem))
  .catch(err => res.json({
    error: err.message
  }))
})
 


// Update Menu Item
router.put('/caterers/:catererId/menus/:menuItemId',function(req, res) {
  console.log("**********************")

  const {
    menuItemId
  } = req.params;

  const {
    dishName,
    foodDescription,
    foodPrice,
    status,
    quantity
  } = req.body;

  updateMenuItem(menuItemId, dishName,foodDescription,foodPrice,status,quantity)
  .then(newMenuItem => res.json(newMenuItem))
  .catch(err => res.json({
    error: err.message
  }))
})


router.delete('/caterers/:catererId/menus/:menuItemId',function(req, res) {
  const {
    menuItemId
  } = req.params;
  console.log("menuItemI  ", menuItemId)

  deleteMenuItem(menuItemId)
  .then(newMenuItem => res.json(newMenuItem))
  .catch(err => res.json({
    error: err.message
  }))
})


 // Today menu for specific caterer

 router.get('/caterers/:catererId/menus/today', function(req, res){
  
  const {
    catererId
  } = req.params;
  console.log("cateerr =", catererId)
  getTodayMenuForCaterer(catererId)
    .then(menus => res.json(menus))
    .catch(err => res.json( {
      error: err.message
    }))
  
});

// menu total for specific caterer

router.get('/caterers/:catererId/totalItems', function(req, res){
  
  const {
    catererId
  } = req.params;
  console.log("cateerr =", catererId)
  countCatererItems(catererId)
    .then(menus => res.json(menus))
    .catch(err => res.json( {
      error: err.message
    }))
  
});

// menu total for specific caterer for today

router.get('/caterers/:catererId/totalItems/today', function(req, res){
  
  const {
    catererId
  } = req.params;
  console.log("cateerr =", catererId)
  countCatererTodayItems(catererId)
    .then(menus => res.json(menus))
    .catch(err => res.json( {
      error: err.message
    }))
  
});




return router;

}
