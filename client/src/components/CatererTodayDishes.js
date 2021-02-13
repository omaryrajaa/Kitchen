import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

import axios from "axios";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Title from "../components/caterer/Title";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import FooterLayout from "./FooterLayout";

import useApplicationData from "../hooks/useApplicationData";
import {
  SET_CATERER_ITEMS,
  SET_CATERER_REVIEWS,
} from "../reducers/dataReducer";
import MenuItem from "./MenuItem";
import CustomerHeaderLayout from "./CustomerHeaderLayout";

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    flex: 1,
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  right: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    color: theme.palette.secondary.light,
  },
  title: {
    color: theme.palette.secondary.light,
  },
}));

const CatererTodayDishes = () => {
  const classes = useStyles();
  const location = useLocation();
  const myparam = location.state.params;
  const catererId = myparam.id;
  const { state, dispatch } = useApplicationData();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await axios.get(`/api/caterers/${catererId}/menus/today`);

    dispatch({ type: SET_CATERER_ITEMS, catererItems: response.data });
  };

  useEffect(() => {
    getReviews();
  }, []);

  const getReviews = async () => {
    axios({
      method: "GET",
      url: `/api/reviews/catererId`,
      params: { catererId },
    })
      .then((result) =>
        dispatch({ type: SET_CATERER_REVIEWS, catererReviews: result.data })
      )
      .catch((err) => console.log(err.message));
  };

  const renderBody = () => {
    const items = state.catererItems;
    return items.map((card) => {
      return (
        <Grid item xs={12} sm={6} md={4} key={card.id}>
          <MenuItem
            id={card.id}
            photo={card.photo}
            description={card.description}
            price={card.price}
            title={card.caterer_menu}
            category={card.category}
            catererId={catererId}
            status={card.active_status}
            quantity={card.quantity}
            shop_name={card.shop_name}
            shop_description={card.shop_description}
            shop_logo={card.shop_logo}
          />
        </Grid>
      );
    });
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <CustomerHeaderLayout />
      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {renderBody()}
          </Grid>
        </Container>

        <Title>Reviews ({state.catererReviews.length})</Title>
        <Divider />
        <Table size="small">
          <TableBody>
            {state.catererReviews.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <List className={classes.root}>
                    <ListItem alignItems="flex-start">
                      <ListItemText
                        primary={
                          <React.Fragment>
                            <Typography
                              component="span"
                              variant="h6"
                              className={classes.inline}
                              color="textPrimary"
                            >
                              {row.name} {row.rating} {row.date}
                            </Typography>
                          </React.Fragment>
                        }
                        secondary={
                          <React.Fragment>
                            <Typography
                              component="span"
                              variant="body1"
                              className={classes.inline}
                              color="textPrimary"
                            >
                              {row.text}
                            </Typography>
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                  </List>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </main>
      {/* Footer */}
      <FooterLayout />
      {/* End footer */}
    </React.Fragment>
  );
};

export default CatererTodayDishes;
