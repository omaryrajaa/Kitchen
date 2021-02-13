import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";

import CustomerHeaderLayout from "./CustomerHeaderLayout";
import FooterLayout from "./FooterLayout";
import ItemReviews from "./ItemReviews";
import CatererInfo from "../components/caterer/CatererInfo";

import {
  Card,
  CardContent,
  CardActions,
  Typography,
  CardMedia,
  Button,
  Box,
} from "@material-ui/core";
import food from "../assets/Food.jpeg";

const useStyles = makeStyles((theme) => ({
  card: {
    display: "block",
    margin: 5,
    [theme.breakpoints.up("sm")]: {
      display: "flex",
    },
    borderRadius: 0,
  },

  caption: {
    textTransform: "uppercase",
  },

  title: {
    textTransform: "uppercase",
    color: theme.palette.primary.main,
    fontWeight: "bold",
  },

  media: {
    width: "auto",
    height: 300,
    [theme.breakpoints.up("sm")]: {
      width: 1500,
    },
    flexBasis: "50%",
  },

  content: {
    display: "flex",
    flexDirection: "column",
    flexBasis: "50%",
    backgroundColor: "#eee",
  },

  cardText: {
    flex: "1 0 auto",
    marginBottom: 15,
    [theme.breakpoints.up("sm")]: {
      marginBottom: 0,
    },
  },

  linkAction: {
    textDecoration: "none",
    textTransform: "uppercase",
    color: theme.palette.primary.main,
    fontWeight: "bold",
  },
  chips: {
    fontSize: "xx-large",
  },
}));

const MenuItemDetails = (props) => {
  const location = useLocation();
  const item = location.state.params;
  const classes = useStyles();
  const [quantity, setQuantity] = useState(0);

  let [cart, setCart] = useState([]);

  let localCart = localStorage.getItem("cart");

  const addItem = (item, quantity) => {
    // let idItem = item.id;

    // let  itemList = {}
    let itemList = { ...item, quantity };
    //create a copy of our cart state, avoid overwritting existing state
    let cartCopy = [...cart];

    //assuming we have an ID field in our item

    let { id } = itemList;

    //look for item in cart array
    let existingItem = cartCopy.find((cartItem) => cartItem.id == id);

    //if item already exists
    if (existingItem) {
      existingItem.quantity += itemList.quantity; //update item
    } else {
      //if item doesn't exist, simply add it
      cartCopy.push(itemList);
    }

    //update app state
    setCart(cartCopy);

    //make cart a string and store in local space
    let stringCart = JSON.stringify(cartCopy);
    localStorage.setItem("cart", stringCart);
  };

  const handleClicAddCart = (event, item) => {
    event.preventDefault();
    addItem(item, quantity);
  };

  //this is called on component mount
  useEffect(() => {
    //turn it into js
    localCart = JSON.parse(localCart);
    //load persisted cart into state if it exists
    if (localCart) setCart(localCart);
  }, []); //the empty array ensures useEffect only runs once

  const handleClickPlus = () => {
    setQuantity((prevCount) => prevCount + 1);
  };

  const handleClickMinus = () => {
    setQuantity((prevCount) => prevCount - 1);
  };

  return (
    <React.Fragment>
      <CustomerHeaderLayout />
      <main>
        <div>
          <Card className={classes.card}>
            <CardMedia
              image={food}
              title={item.title}
              className={classes.media}
            />
            <CardContent className={classes.content}>
              <div className={classes.cardText}>
                <Typography variant="h6" className={classes.title} gutterBottom>
                  {item.title} ${item.price}
                </Typography>
                <Typography variant="body1">{item.description}</Typography>
              </div>
              <CardActions>
                <Chip
                  className={classes.chips}
                  label="-"
                  onClick={handleClickMinus}
                />
                <Typography>{quantity}</Typography>
                <Chip
                  className={classes.chips}
                  label="+"
                  onClick={handleClickPlus}
                />

                <Button
                  onClick={(event) => handleClicAddCart(event, item, quantity)}
                >
                  Add to Order
                </Button>
              </CardActions>
            </CardContent>
          </Card>
        </div>
        <Box>
          <ItemReviews id={item.id} />
        </Box>
        <Box border="ridge">
          <CatererInfo
            catererId={item.catererId}
            shop_name={item.shop_name}
            shop_logo={item.shop_logo}
            shop_description={item.shop_description}
          />
        </Box>
      </main>

      <FooterLayout />
    </React.Fragment>
  );
};

export default MenuItemDetails;
