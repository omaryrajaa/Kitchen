import React from 'react';
import withRoot from '../modules/withRoot';
import FooterLayout from '../components/FooterLayout';
import CustomerHeaderLayout from '../components/CustomerHeaderLayout';
import BecomeCatererLayout from '../components/landing/BecomeCatererLayout';
import BecomeDelivery from '../components/landing/BecomeDelivery';
import SearchByAddressLayout from '../components/landing/SearchByAddressLayout'
import FoodCategory from '../components/landing/FoodCategory';
import TopCaterersLayout from '../components/landing/TopCaterersLayout';
import MapContainer from '../components/landing/MapContainer';



const Home = (props) => {

  return (

    <div>
      
        <CustomerHeaderLayout />
       
        <FoodCategory />
        <TopCaterersLayout />
        <BecomeCatererLayout />
        <BecomeDelivery />
        <MapContainer />
        <FooterLayout />
    
      </div>
  )
}

export default withRoot(Home);