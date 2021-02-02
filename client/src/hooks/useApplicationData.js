import { useReducer } from 'react';

import dataReducer from '../reducers/dataReducer';


const useApplicationData = () => {
  const [state, dispatch] = useReducer(dataReducer, {
    caterers: [],
    catererItems: [],
    catererOrdersToday:[],
    catererOrderUpdate:{},
    catererOrderItems:[],
    dishesByName: [],
    catererOrders:[],
    topCaterers: [],
    categories: [],
    itemReviews: [],
    cart:[],
    customerAddress: {},
    catererItemsUpdate: {},
    catererItemsCreate: {},
    foodCategory: '',
    itemsCounter: 0,
    catererItemsCount: 0,
    catererItemsTodayCount: 0,
    
    loading: true,
  });

  return {
    state,
    dispatch,
  };
};

export default useApplicationData;