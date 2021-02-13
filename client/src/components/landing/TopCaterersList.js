import React, { useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import CatererCard from "../CatererCard";
import useApplicationData from "../../hooks/useApplicationData";
import { SET_TOP_CATERERS } from "../../reducers/dataReducer";

import Image1 from "../../assets/Caterer.jpg";
import Image2 from "../../assets/Caterer2.jpeg";
import Image3 from "../../assets/Caterer3.jpeg";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(10),
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: "100%",
    height: "auto",
  },
}));

const mapImg = (name) => {
  switch (name) {
    case "Image1":
      return Image1;
    case "Image2":
      return Image2;
    case "Image3":
      return Image3;
    default:
      return;
  }
};

export default function TopCaterersList() {
  const classes = useStyles();
  const { state, dispatch } = useApplicationData();

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      axios({
        method: "GET",
        url: `/api/caterers/top`,
      })
        .then((result) => {
          dispatch({ type: SET_TOP_CATERERS, topCaterers: result.data });
        })
        .catch((err) => console.log(err.message));
    }
    return function cleanup() {
      mounted = false;
    };
  }, []);

  return (
    <div className={classes.root}>
      <GridList
        cellHeight={"auto"}
        cols={3}
        spacing={60}
        className={classes.gridList}
      >
        {state.topCaterers.map((tile) => (
          <GridListTile key={tile.id}>
            <CatererCard
              key={tile.id}
              id={tile.id}
              title={tile.shop_name}
              logo={mapImg(tile.shop_logo)}
              address={tile.address}
              phone={tile.phone}
              email={tile.email}
              rate={tile.rate}
            ></CatererCard>
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
