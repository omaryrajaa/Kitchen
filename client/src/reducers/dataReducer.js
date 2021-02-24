export const SET_CATEGORIES = "SET_CATEGORIES";
export const SET_CATERERS = "SET_CATERERS";
export const SET_CUSTOMER_ADDRESS = "SET_CUSTOMER_ADDRESS";
export const SET_TOP_CATERERS = "SET_TOP_CATERERS";
export const SET_FOOD_CATEGORY = "SET_FOOD_CATEGORY";
export const SET_CATERER_ITEMS = "SET_CATERER_ITEMS";
export const SET_CATERER_ORDERS_TODAY = "SET_CATERER_ORDERS_TODAY";
export const SET_CATERER_ORDERS = "SET_CATERER_ORDERS";
export const SET_CATERER_ITEMS_UPDATE = "SET_CATERER_ITEMS_UPDATE";
export const SET_CATERER_ITEMS_CREATE = "SET_CATERER_ITEMS_CREATE";
export const SET_DISHES_BY_NAME = "SET_DISHES_BY_NAME";
export const SET_CATERER_ORDER_ITEMS = "SET_CATERER_ORDER_ITEMS";
export const SET_CATERER_ORDER_UPDATE = "SET_CATERER_ORDER_UPDATE";
export const SET_ITEM_REVIEWS = "SET_ITEM_REVIEWS";
export const SET_CATERER_REVIEWS = "SET_CATERER_REVIEWS";
export const SET_ITEMS_COUNT = "SET_ITEMS_COUNT";
export const SET_CART = "SET_CART";
export const SET_CATERER_ITEMS_COUNT = "SET_CATERER_ITEMS_COUNT";
export const SET_CATERER_ITEMS_TODAY_COUNT = "SET_CATERER_ITEMS_TODAY_COUNT";
export const SET_NEW_CUSTOMER = "SET_NEW_CUSTOMER";
export const SET_CUSTOMER_ORDER = "SET_CUSTOMER_ORDER";
export const SET_DELIVERY_AGENTS = "SET_DELIVERY_AGENTS";


const dataReducer = (state, action) => {
  switch (action.type) {
    case SET_NEW_CUSTOMER:
      return {
        ...state,
        newCustomer: action.newCustomer,
        loading: false,
      };
    case SET_CUSTOMER_ORDER:
      return {
        ...state,
        customerOrder: action.customerOrder,
        loading: false,
      };
    case SET_CATEGORIES:
      return {
        ...state,
        categories: action.categories,
        loading: false,
      };
    case SET_CART:
      return {
        ...state,
        cart: action.cart,
        loading: false,
      };

    case SET_ITEMS_COUNT:
      return { ...state, itemsCounter: action.itemsCounter };

    case SET_ITEM_REVIEWS:
      return {
        ...state,
        itemReviews: action.itemReviews,
        loading: false,
      };

    case SET_CATERER_REVIEWS:
      return {
        ...state,
        catererReviews: action.catererReviews,
        loading: false,
      };
    case SET_CATERER_ITEMS:
      return {
        ...state,
        catererItems: action.catererItems,
        loading: false,
      };
    case SET_CATERER_ITEMS_COUNT:
      return {
        ...state,
        catererItemsCount: action.catererItemsCount,
        loading: false,
      };
    case SET_CATERER_ITEMS_TODAY_COUNT:
      return {
        ...state,
        catererItemsTodayCount: action.catererItemsTodayCount,
        loading: false,
      };
    case SET_CATERER_ORDERS_TODAY:
      return {
        ...state,
        catererOrdersToday: action.catererOrdersToday,
        loading: false,
      };
    case SET_CATERER_ORDER_UPDATE:
      return {
        ...state,
        catererOrderUpdate: action.catererOrderUpdate,
        loading: false,
      };
    case SET_CATERER_ORDER_ITEMS:
      return {
        ...state,
        catererOrderItems: action.catererOrderItems,
        loading: false,
      };
    case SET_CATERER_ORDERS:
      return {
        ...state,
        catererOrders: action.catererOrders,
        loading: false,
      };
    case SET_CATERER_ITEMS_UPDATE:
      return {
        ...state,
        catererItemsUpdate: action.catererItemsUpdate,
        loading: false,
      };
    case SET_CATERER_ITEMS_CREATE:
      return {
        ...state,
        catererItems: [...state.catererItems, action.catererItemsCreate],
        loading: false,
      };
    case SET_FOOD_CATEGORY:
      return {
        ...state,
        category: action.category,
        loading: false,
      };
    case SET_CATERERS:
      return {
        ...state,
        caterers: action.caterers,
        loading: false,
      };
    case SET_CUSTOMER_ADDRESS:
      return {
        ...state,
        customerAddress: action.location,
        loading: false,
      };
    case SET_TOP_CATERERS:
      return {
        ...state,
        topCaterers: action.topCaterers,
        loading: false,
      };
    case SET_DISHES_BY_NAME:
      return {
        ...state,
        dishesByName: action.dishesByName,
        loading: false,
      };
      case SET_DELIVERY_AGENTS:
      return {
        ...state,
        deliveryAgents: action.deliveryAgents,
        loading: false,
      };

    default:
      return state;
  }
};

export default dataReducer;
