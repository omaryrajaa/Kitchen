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
  updateCatererOrderStatus



   }) => {


//********************************************Login************************************************/
// customer login 
router.post('/customers/login', function(req, res) {

  const {
    email,
    password
  } = req.body;

  console.log(req.body)

  getCustomerByEmailandPassword(email, password)
  .then(customers => console.log(res.json(customers)))
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
