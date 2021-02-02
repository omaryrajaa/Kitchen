import React , { useEffect, useState }from 'react';
import { useHistory, Link } from "react-router-dom";
import { useLocation } from "react-router-dom";


import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import InputLabel from '@material-ui/core/InputLabel';
import Container from '@material-ui/core/Container';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import HomeIcon from '@material-ui/icons/Home';

import FooterLayout from '../FooterLayout';

import useApplicationData from '../../hooks/useApplicationData'
import { SET_CATERER_ORDER_ITEMS } from '../../reducers/dataReducer';


import Title from './Title';


const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  button: {
    color: theme.palette.secondary.light,
  },
  title:{
    color: theme.palette.secondary.light,

  }
}));

const OrderDetails = props => {
  

  const classes = useStyles();
  const { state, dispatch } = useApplicationData();
  const location = useLocation();
  const myparam = location.state.params;

  console.log("myparam here : ", myparam)


  useEffect(() => {
    getData();
  }, [])
  
  const getData = async () => {
    console.log('/////////////////')
    const response = await axios.get(`/api/caterers/${myparam.catererId}/orders/${myparam.orderId}`)
    console.log('response = ', response.data)
   
        dispatch({ type: SET_CATERER_ORDER_ITEMS, catererOrderItems: response.data });
        
      
    }
  
  
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
        <div>
          <Link className={classes.button} to="/dashboard">      
          <HomeIcon fontSize="large" /> 
          </Link>
          </div>
          <div>         
             <Typography variant="h6" className={classes.title} noWrap>Order Details</Typography>
          </div>
         
        </Toolbar>
        
      </AppBar>
      <main>

        <Container className={classes.cardGrid} maxWidth="md">
          
          <Grid container spacing={4}>
          <Container maxWidth="lg" className={classes.container}>
      <Title>Order Number: {myparam.orderId}</Title>
      <Table size="medium">
        <TableHead>
          <TableRow>
            <TableCell>Dish Name</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Price</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {state.catererOrderItems && state.catererOrderItems.map((row) => (
            <TableRow key={row.name}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.quantity}</TableCell>
              <TableCell>{row.order_items_price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
      <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
          <Input
                      inputProps={{
                        readOnly: true,
                      }}
                   
            id="standard-adornment-amount"
            value={myparam.amount}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />

      </div>
      </Container>
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <FooterLayout />
      {/* End footer */}
    </React.Fragment>
  );
  }

  export default OrderDetails
      

    