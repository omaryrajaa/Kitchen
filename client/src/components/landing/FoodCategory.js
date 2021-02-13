import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";

import Container from "@material-ui/core/Container";
import Typography from "../Typography";

import useApplicationData from "../../hooks/useApplicationData";
import { SET_CATEGORIES } from "../../reducers/dataReducer";
import Image1 from "../../assets/Image1.jpeg";
import Image2 from "../../assets/Image2.jpg";
import Image3 from "../../assets/Image3.jpeg";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(4),
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
    margin: "15px !important",
  },
  title: {
    color: theme.palette.secondary.light,
    textAlign: "center",
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
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

export default function FoodCategory() {
  const classes = useStyles();

  const history = useHistory();

  const { state, dispatch } = useApplicationData();

  useEffect(() => {
    axios({
      method: "GET",
      url: "/api/FoodTypes",
    })
      .then((result) =>
        dispatch({ type: SET_CATEGORIES, categories: result.data })
      )
      .catch((err) => console.log(err.message));
  }, []);

  const onTileTouch = (id) => {
    axios({
      method: "GET",
      url: `/api/categories/${id}/menuItems`,
      params: { category: id },
    })
      .then((result) => {
        history.push("/items-by-category", { params: result.data });
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <Container className={classes.root} component="section">
      <Typography variant="h4" marked="center" align="center" component="h2">
        For all tastes and all desires
      </Typography>
      <GridList className={classes.gridList} cols={3}>
        {state.categories.map((tile) => (
          <GridListTile
            key={tile.id}
            onClick={(e) => {
              onTileTouch(tile.id);
            }}
          >
            <img src={mapImg(tile.icon)} alt={tile.name} />
            <GridListTileBar
              title={tile.name}
              classes={{
                root: classes.titleBar,
                title: classes.title,
              }}
            />
          </GridListTile>
        ))}
      </GridList>
    </Container>
  );
}
