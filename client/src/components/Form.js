import React, { useEffect, useState } from "react";
import axios from "axios";

import AddressLookup from "../components/AddressLookUp";
import useApplicationData from "../hooks/useApplicationData";
import { SET_CATERERS } from "../reducers/dataReducer";

import "./Form.css";

const Form = (props) => {
  const { state, dispatch } = useApplicationData();

  const [states, setStates] = useState({
    location: {},
    value: "",
  });

  const onAddressChange = (location) => {
    setStates({ location });
  };

  useEffect(() => {
    let mounted = true;
    axios
      .get(`/api/caterers`)
      .then((response) => {
        if (mounted) dispatch({ type: SET_CATERERS, caterers: response.data });
      })
      .catch((err) => console.log(err.message));

    return function cleanup() {
      mounted = false;
    };
  }, []);

  //************get caterers by distance*************** */
  /*
    console.log("***", states.location)
    if (states.location.postalCode) {
      const cateresList = state.caterers;
      const postalCateres = [];

      for (var i=0; i < cateresList.length; i++){
        postalCateres.push(cateresList[i].postal);
      }

      let service = new window.google.maps.DistanceMatrixService();
      service.getDistanceMatrix(
        {
          origins: [states.location.postalCode.longName],
          destinations: [postalCateres],
          travelMode: window.google.maps.TravelMode.DRIVING,
          unitSystem: window.google.maps.UnitSystem.IMPERIAL,
          avoidHighways: false,
          avoidTolls: false
        }, calcDistance);
    

    }

  

    function calcDistance(response, status) {
      
      if (status != window.google.maps.DistanceMatrixStatus.OK) {
        alert('Error was: ' + status);
      } else {
        var origins = response.originAddresses;
        var destinations = response.destinationAddresses;
        console.log(response.rows[0].elements)
        for (var i = 0; i < origins.length; i++) {
          var results = response.rows[i].elements;
    
          for (var j = 0; j < results.length; j++) {
    
            console.log(results[j].distance.text);
             // alert the result
             

          }
        }
      }
    }
*/

  return (
    <div className="lookup-container">
      <AddressLookup
        className="lookup-field"
        placeholder="Enter delivery address"
        onChange={onAddressChange}
        value={states.value}
      />
    </div>
  );
};

export default Form;
