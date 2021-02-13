import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/auth";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Title from "./Title";

import useApplicationData from "../../hooks/useApplicationData";
import {
  SET_CATERER_ITEMS_COUNT,
  SET_CATERER_ITEMS_TODAY_COUNT,
} from "../../reducers/dataReducer";

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  rowStyle: { height: 50 },
}));

export default function Menu(props) {
  const { authTokens, setAuthTokens } = useAuth();
  const catererId = authTokens.id;

  const classes = useStyles();

  const { state, dispatch } = useApplicationData();
  let history = useHistory();

  useEffect(() => {
    getTotalItems();
  }, []);

  const getTotalItems = async () => {
    const response = await axios.get(`/api/caterers/${catererId}/totalItems`);

    dispatch({
      type: SET_CATERER_ITEMS_COUNT,
      catererItemsCount: response.data.total,
    });
  };

  useEffect(() => {
    getTotalTodayItems();
  }, []);

  const getTotalTodayItems = async () => {
    const response = await axios.get(
      `/api/caterers/${catererId}/totalItems/today`
    );

    dispatch({
      type: SET_CATERER_ITEMS_TODAY_COUNT,
      catererItemsTodayCount: response.data.total,
    });
  };

  const handleFullMenu = (event) => {
    event.preventDefault();
    if (catererId) {
      history.push(`/full-menu`, { params: { catererId } });
    } else {
      history.push("/login");
    }
  };

  const handleTodayMenu = (event) => {
    event.preventDefault();
    if (catererId) {
      history.push(`/today-menu`, { params: { catererId } });
    } else {
      history.push("/login");
    }
  };

  return (
    <React.Fragment>
      <Title>Menu</Title>
      <Table size="small">
        <TableBody>
          <TableRow>
            <TableCell>Today's Menu</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>

            <TableCell align="right">
              <Link onClick={(event) => handleTodayMenu(event)}>
                {state.catererItemsTodayCount}
              </Link>
            </TableCell>
          </TableRow>
          <TableRow className={classes.rowStyle}>
            <TableCell>Full Menu</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>

            <TableCell align="right">
              <Link onClick={(event) => handleFullMenu(event)}>
                {state.catererItemsCount}
              </Link>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <div className={classes.seeMore}></div>
    </React.Fragment>
  );
}
