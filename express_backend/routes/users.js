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
  getTodayMenuForCaterer


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

//********************************************Menus************************************************/
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
