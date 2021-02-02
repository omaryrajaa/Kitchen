import React, { useEffect} from 'react';
import { useHistory, Link } from "react-router-dom";
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import HomeIcon from '@material-ui/icons/Home';
import Container from '@material-ui/core/Container';

import FooterLayout from '../views/FooterLayout';


import useApplicationData from '../hooks/useApplicationData'
import { SET_CATERER_ORDERS } from '../reducers/dataReducer';




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


const OrdersHistory = props => {
  const catererId = 3;
  const classes = useStyles();
  const history = useHistory();

  const { state, dispatch } = useApplicationData();
    

  useEffect(() => {
    getData();
  }, [])

  const getData = async () => {
    console.log('/////////////////')
    const response = await axios.get(`/api/caterers/${catererId}/orders`)
    console.log('response = ', response.data)
   
        dispatch({ type: SET_CATERER_ORDERS, catererOrders: response.data });
           
    }

    const handleOrderDetails = (event, index) => {
      event.preventDefault();
  
      history.push(`/order-details/${state.catererOrders[index].order}`, {params: {catererId, orderId: state.catererOrders[index].order, amount: state.catererOrders[index].amount }})
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
           <Typography variant="h6" className={classes.title} noWrap>Orders History</Typography>
        </div>
       
      </Toolbar>
      
    </AppBar>
    <main>

      <Container className={classes.cardGrid} maxWidth="md">
        
        <Grid container spacing={4}>
        <Container maxWidth="lg" className={classes.container}>
      <Table size="small">
        <TableHead>
          <TableRow>
            
            <TableCell>Order Number</TableCell>
            <TableCell>Customer Name</TableCell>
            <TableCell>Order Status</TableCell>
            <TableCell>Total Amount</TableCell>
            
            <TableCell></TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {state.catererOrders.map((row, index) => (
            <TableRow key={row.order}>
              <TableCell><Link onClick={(event) => handleOrderDetails(event, index)}>{row.order}</Link></TableCell>
              <TableCell>{row.customer}</TableCell>
              <TableCell>{row.status}</TableCell>            
              <TableCell>{row.amount}</TableCell>
              
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
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

  export default OrdersHistory
      