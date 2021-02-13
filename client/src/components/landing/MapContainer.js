import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  GoogleMap,
  LoadScript,
  Marker,
  Circle,
  InfoWindow,
} from "@react-google-maps/api";
import "./MapContainer.css";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PhoneIcon from "@material-ui/icons/Phone";
import { SET_CATERERS } from "../../reducers/dataReducer";
import useApplicationData from "../../hooks/useApplicationData";

const MapContainer = (props) => {
  const { state, dispatch } = useApplicationData();

  // for infoWindow
  const [selected, setSelected] = useState({});
  const onSelect = (store) => {
    setSelected(store);
  };

  // Saving lat/lng in sessionStorage
  const addToSessionStorage = (key, value) => {
    let location = {
      latitude: value.latitude,
      longitude: value.longitude,
    };
    sessionStorage.setItem(key, JSON.stringify(location));
  };

  const getToSessionStorage = (key) => {
    return sessionStorage.getItem(key);
  };

  const successLocation = (position) => {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    addToSessionStorage("user_location", {
      latitude: latitude,
      longitude: longitude,
    });

    let user_position = getToSessionStorage("user_location");
  };

  // getting geoLocation of users with HTML API 'geolocation'
  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      successLocation,
      handleLocationError
    );
  };

  const handleLocationError = (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.");
        break;
      default:
        alert("An unknown error occurred.");
    }
  };
  getLocation();
  // To get the user location set in sessionStorage
  const userLocation = JSON.parse(sessionStorage.getItem("user_location"));
  const latitudeLocation = userLocation["latitude"];
  const longitudeLocation = userLocation["longitude"];

  const mapStyles = {
    height: "50vh",
    width: "80vw",
    marginLeft: "auto",
    marginRight: "auto",
  };

  const mapTheme = [
    {
      featureType: "all",
      elementType: "geometry.fill",
      stylers: [
        {
          weight: "2.00",
        },
      ],
    },
    {
      featureType: "all",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#9c9c9c",
        },
      ],
    },
    {
      featureType: "all",
      elementType: "labels.text",
      stylers: [
        {
          visibility: "on",
        },
      ],
    },
    {
      featureType: "landscape",
      elementType: "all",
      stylers: [
        {
          color: "#f2f2f2",
        },
      ],
    },
    {
      featureType: "landscape",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#ffffff",
        },
      ],
    },
    {
      featureType: "landscape.man_made",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#ffffff",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "all",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "all",
      stylers: [
        {
          saturation: -100,
        },
        {
          lightness: 45,
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#eeeeee",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#7b7b7b",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#ffffff",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "all",
      stylers: [
        {
          visibility: "simplified",
        },
      ],
    },
    {
      featureType: "road.arterial",
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "transit",
      elementType: "all",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "all",
      stylers: [
        {
          color: "#46bcec",
        },
        {
          visibility: "on",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#c8d7d4",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#070707",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#ffffff",
        },
      ],
    },
  ];

  const defaultCenter = {
    lat: latitudeLocation,
    lng: longitudeLocation,
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

  return (
    <GoogleMap
      mapContainerStyle={mapStyles}
      zoom={14}
      center={defaultCenter}
      options={{
        styles: mapTheme,
        scrollwheel: true,
      }}
    >
      <Circle
        center={defaultCenter}
        radius={2000}
        options={{
          fillColor: "#32CD32",
          fillOpacity: "0.2",
          strokeWeight: "0.2",
        }}
      />
      <Marker
        label="You Are Here"
        name="Customer Location"
        position={defaultCenter}
      />
      {state.caterers.map((caterer) => {
        return (
          <Marker
            key={caterer.id}
            position={caterer.location}
            onClick={() => onSelect(caterer)}
          />
        );
      })}
      {selected.location && (
        <InfoWindow
          position={selected.location}
          clickable={true}
          onCloseClick={() => setSelected({})}
        >
          <div className="infoWindow" style={{ opacity: 1 }}>
            <div
              className="message"
              style={{ fontWeight: "bold", color: "red" }}
            >
              {selected.shop_name}
            </div>
            <div className="name-store">
              <img className="store-img" alt="" src={selected.shop_logo}></img>
              <h2>{selected.name}</h2>
            </div>
            <span className="store-des">
              <LocationOnIcon className="icon-ui" />
              {selected.address}
            </span>
            <span className="store-des">
              <PhoneIcon className="icon-ui" />
              {selected.phone}
            </span>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

export default MapContainer;
