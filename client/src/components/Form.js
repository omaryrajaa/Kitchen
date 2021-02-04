import React, { useState } from 'react';
import useApplicationData from '../hooks/useApplicationData'
import { SET_CUSTOMER_ADDRESS } from '../reducers/dataReducer';


import AddressLookup from '../components/AddressLookUp';

import './Form.css'



const Form = props => {
  const [value, setValue] = useState('');
  const { state, dispatch } = useApplicationData();

  const onAddressChange =  location => {
    dispatch({type: SET_CUSTOMER_ADDRESS, location })
  }

  return (
    <div className="lookup-container">
      <AddressLookup
        className="lookup-field"
        placeholder="Enter delivery address"
        onChange={onAddressChange}
        value={value} />
      
    </div>
  )
}

export default Form