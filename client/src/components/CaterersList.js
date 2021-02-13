import React, { useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import CssBaseline from "@material-ui/core/CssBaseline";

import CatereCard from "./CatererCard";
import FooterLayout from "./FooterLayout";
import CustomerHeaderLayout from "./CustomerHeaderLayout";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

import useApplicationData from "../hooks/useApplicationData";
import { SET_CATERERS } from "../reducers/dataReducer";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 1000,
    height: "auto",
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
  cardGrid: {
    flex: 1,
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

const CaterersList = () => {
  const classes = useStyles();
  const { state, dispatch } = useApplicationData();

  useEffect(() => {
    axios({
      method: "GET",
      url: `/api/caterers`,
      params: state.customerAddress,
    })
      .then((result) => dispatch({ type: SET_CATERERS, caterers: result.data }))
      .catch((err) => console.log(err.message));
  }, [dispatch]);

  return (
    <React.Fragment>
      <CssBaseline />
      <CustomerHeaderLayout />
      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            <GridList
              cellHeight={"auto"}
              cols={4}
              padding={20}
              className={classes.gridList}
            >
              {state.caterers.map((tile) => (
                <GridListTile key={tile.id}>
                  <CatereCard
                    key={tile.id}
                    id={tile.id}
                    title={tile.shop_name}
                    logo={tile.shop_logo}
                    address={tile.address}
                    phone={tile.phone}
                    email={tile.email}
                    rate={tile.rate}
                  ></CatereCard>
                </GridListTile>
              ))}
            </GridList>
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <FooterLayout />
      {/* End footer */}
    </React.Fragment>
  );
};

export default CaterersList;
