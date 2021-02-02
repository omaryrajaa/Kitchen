import React, {useEffect} from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';


import useApplicationData from '../../hooks/useApplicationData'
import { SET_CATERER_ITEMS_COUNT, SET_CATERER_ITEMS_TODAY_COUNT } from '../../reducers/dataReducer'



const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  rowStyle: {height: 50},
}));

export default function Menu() {
  const catererId = 2;

  const classes = useStyles();

  const { state, dispatch } = useApplicationData();

  useEffect(() => {
    getTotalItems();
  }, [])


  const getTotalItems = async () => {
    const response = await axios.get(`/api/caterers/${catererId}/totalItems`)

    console.log('response = ', response.data.total)
        dispatch({ type: SET_CATERER_ITEMS_COUNT, catererItemsCount: response.data.total});
 }

 useEffect(() => {
  getTotalTodayItems();
}, [])


const getTotalTodayItems = async () => {
  const response = await axios.get(`/api/caterers/${catererId}/totalItems/today`)

  console.log('response = ', response.data.total)
      dispatch({ type: SET_CATERER_ITEMS_TODAY_COUNT, catererItemsTodayCount: response.data.total});
}





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
              
              <TableCell align="right"><a href="/today-menu">{state.catererItemsTodayCount}</a></TableCell>
               
            </TableRow>
            <TableRow className={classes.rowStyle}>
              <TableCell>Full Menu</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              
              <TableCell align="right"><a href="/full-menu">{state.catererItemsCount}</a></TableCell>
              
              
            </TableRow>
        </TableBody>
      </Table>
      <div className={classes.seeMore}>

      </div>
    </React.Fragment>
  );
}