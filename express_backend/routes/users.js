const express = require("express");
const { route } = require(".");
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
  getDeliveryAgents
}) => {

  //*********************Delivery Agents List******************************************************* */

   // all delivery agents

   router.get("/delivery-agents", function (req, res) {
    getDeliveryAgents()
      .then((deliveryAgents) => res.json(deliveryAgents))
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });
  //********************************************Landing Page*************************************** */

  // all caterers

  router.get("/caterers", function (req, res) {
    getCaterers()
      .then((caterers) => res.json(caterers))
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  // top 3 caterers

  router.get("/caterers/top", function (req, res) {
    getTopCaterers()
      .then((menus) => res.json(menus))
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  /** return all dishes containing this
   * http://localhost:3005/api/menus/dish_name?dishName=cheese*/

  router.get("/menus/dish_name", function (req, res) {
    const { dishName } = req.query;

    getMenusByName(dishName)
      .then((menuItems) => res.json(menuItems))
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  //reviews for a dish

  router.get("/reviews/menuItem", function (req, res) {
    const { menuItemId } = req.query;

    getItemReviews(menuItemId)
      .then((reviews) => res.json(reviews))
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  // all food categories
  router.get("/foodTypes", function (req, res) {
    getFoodTypes()
      .then((foodTypes) => res.json(foodTypes))
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  // menu_items by Category

  router.get("/categories/:category/menuItems", function (req, res) {
    const { category } = req.query;

    getMenuByCategory(category)
      .then((menuItems) => res.json(menuItems))
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  //********************************************Register******************************************* */
  // new customer

  router.post("/customers/register", function (req, res) {
    const {
      name,
      address,
      phone,
      email,
      password
    } = req.body;

    getCustomerByEmail(email)
      .then((user) => {
        if (user) {
          res.json({
            msg: "Sorry, a user account with this email already exists",
          });
        } else {
          return addCustomer(
            name,
            address,
            phone,
            email,
            password
          );
        }
      })
      .then((newUser) => res.json(newUser))
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  //********************************************Login************************************************/
  // customer login
  router.post("/customers/login", function (req, res) {
    const { email, password } = req.body;

    getCustomerByEmailandPassword(email, password)
      .then((customers) => {
        if (!customers) {
          res.json({
            msg: "The email address or password is incorrect. Please try agan.",
          });
        } else {
        res.json(customers)}
        }
      )
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  // caterer login
  router.post("/caterers/login", function (req, res) {
    const { email, password } = req.body;

    getCatererByEmailandPassword(email, password)
      .then((caterers) => {
        if (!caterers) {
          res.json({
            msg: "The email address or password is incorrect. Please try agan.",
          });
        } else {
        res.json(caterers)}
        }
      )
        
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  // new Caterer

  router.post("/caterers/register", function (req, res) {
    const {
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
    } = req.body;

    getCatererByEmail(email, shopname)
      .then((user) => {
        if (user) {
          res.json({
            msg: "Sorry, a user account with this email already exists",
          });
        } else {
          return addCaterer(
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
          );
        }
      })
      .then((newCaterer) => res.json(newCaterer))
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  // new Caterer

  router.post("/delivery_agents/register", function (req, res) {
    const {
      firstname,
      lastname,
      address,
      phone,
      email,
      password,
      accountNumber,
    } = req.body;

    getDeliveryByEmail(email)
      .then((user) => {
        if (user) {
          res.json({
            msg: "Sorry, a user account with this email already exists",
          });
        } else {
          return addDelivery(
            firstname,
            lastname,
            address,
            phone,
            email,
            password,
            accountNumber
          );
        }
      })
      .then((newDelivery) => res.json(newDelivery))
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  //********************************************Orders************************************************/
  router.post("/orders", function (req, res) {
    const {
      customerId,
      statusId,
      totalAmount,
      phone,
      pickupTime,
      pickupOrDelivery,
      listItemsId,
      listPrices,
      listQty,
    } = req.body;

    addNewOrder(
      customerId,
      statusId,
      totalAmount,
      phone,
      pickupTime,
      pickupOrDelivery,
      listItemsId,
      listPrices,
      listQty
    )
      .then((newMenuItem) => res.json(newMenuItem))
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  // getOrdersByCaterer

  router.get("/caterers/:catererId/orders", function (req, res) {
    const { catererId } = req.params;

    getOrdersByCaterer(catererId)
      .then((caterer) => res.json(caterer))
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  // List orders for today

  router.get("/caterers/:catererId/orders/today", function (req, res) {
    const { catererId } = req.params;

    getOrdersByCatererAndDate(catererId)
      .then((caterer) => res.json(caterer))
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  // dishes
  router.get("/caterers/:catererId/orders/:orderId", function (req, res) {
    const { catererId, orderId } = req.params;

    getCatererItemsByOrder(catererId, orderId)
      .then((caterer) => res.json(caterer))
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  router.put("/caterers/:catererId/orders/:orderId", function (req, res) {
    const { orderId, status } = req.body;

    updateCatererOrderStatus(orderId, status)
      .then((newMenuItem) => res.json(newMenuItem))
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  //********************************************Menus************************************************/
  router.get("/caterers/:catererId/menus", function (req, res) {
    const { catererId } = req.params;
    getMenuForCaterer(catererId)
      .then((menus) => res.json(menus))
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  router.post("/caterers/:catererId/menus", function (req, res) {
    const {
      catererId,
      foodTypeName,
      dishName,
      foodDescription,
      foodPhoto,
      foodPrice,
      status,
      quantity,
      tags,
    } = req.body;

    addFoodType(dishName, foodPhoto)
      .then((foodType) => {
        return addMenuItem(
          catererId,
          foodType.id,
          dishName,
          foodDescription,
          foodPhoto,
          foodPrice,
          status,
          quantity,
          tags
        );
      })
      .then((newMenuItem) => res.json(newMenuItem))
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  // Update Menu Item
  router.put("/caterers/:catererId/menus/:menuItemId", function (req, res) {
    const { menuItemId } = req.params;

    const {
      dishName,
      foodDescription,
      foodPrice,
      status,
      quantity,
      tags,
    } = req.body;

    updateMenuItem(
      menuItemId,
      dishName,
      foodDescription,
      foodPrice,
      status,
      quantity,
      tags
    )
      .then((newMenuItem) => res.json(newMenuItem))
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  router.delete("/caterers/:catererId/menus/:menuItemId", function (req, res) {
    const { menuItemId } = req.params;

    deleteMenuItem(menuItemId)
      .then((newMenuItem) => res.json(newMenuItem))
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  // Today menu for specific caterer

  router.get("/caterers/:catererId/menus/today", function (req, res) {
    const { catererId } = req.params;
    getTodayMenuForCaterer(catererId)
      .then((menus) => res.json(menus))
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  // menu total for specific caterer

  router.get("/caterers/:catererId/totalItems", function (req, res) {
    const { catererId } = req.params;
    countCatererItems(catererId)
      .then((menus) => res.json(menus))
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  // menu total for specific caterer for today

  router.get("/caterers/:catererId/totalItems/today", function (req, res) {
    const { catererId } = req.params;
    countCatererTodayItems(catererId)
      .then((menus) => res.json(menus))
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  //******************************************Reviews***************** */

  router.post("/reviews", function (req, res) {
    const { customerId, menuItemId, rating, reviewText } = req.body;

    addReview(customerId, menuItemId, rating, reviewText)
      .then((newMenuItem) => res.json(newMenuItem))
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  router.get("/reviews/catererId", function (req, res) {
    const { catererId } = req.query;

    getCatererReviews(catererId)
      .then((reviews) => res.json(reviews))
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  return router;
};
