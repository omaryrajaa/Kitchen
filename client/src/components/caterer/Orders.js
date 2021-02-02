import React, { useState,useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios'
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MessageIcon from '@material-ui/icons/Message';
import Title from './Title';

import useApplicationData from '../../hooks/useApplicationData'
import { SET_CATERER_ORDERS_TODAY} from '../../reducers/dataReducer';


const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders(props) {
  console.log(" props orders = ", props)
  const catererId = props.catererId;
  const classes = useStyles();
  const history = useHistory();
  const [value, setValue] = useState('');

  const handleRadioChange = (event, index) => {
      const updatedTodayOrder = state.catererOrdersToday.map((row, i) => {
        if (i !== index) {
          return row
        } else {
          return {...row, status: event.target.value }
        }
      } )
      dispatch({ type: SET_CATERER_ORDERS_TODAY, catererOrdersToday: updatedTodayOrder });

   updateData(updatedTodayOrder, index);
  };  



    const updateData = (value, index) => {

      axios.put(`/api/caterers/${catererId}/orders/${state.catererOrdersToday[index].order}`, {orderId:state.catererOrdersToday[index].order, status: value[index].status})
      .then(res => res.data)
  
    }

 
  

  const { state, dispatch } = useApplicationData();

  function preventDefault(event) {
    event.preventDefault();
  }

  const handleOrderDetails = (event, index) => {
    event.preventDefault();
    if (catererId) {
      history.push(`/order-details/${state.catererOrdersToday[index].order}`, {params: {catererId, orderId: state.catererOrdersToday[index].order, amount: state.catererOrdersToday[index].amount }})
    }
    else {
      history.push('/login')
    }
   
  }
  
  

  useEffect(() => {
    getData();
  }, [])

  const getData = async () => {
    const response = await axios.get(`/api/caterers/${catererId}/orders/today`)
    console.log('response here = ', response.data)
   
        dispatch({ type: SET_CATERER_ORDERS_TODAY, catererOrdersToday: response.data });
        setValue(response.data.status)

         
    }



  return (
    <React.Fragment>
      
      <Title>Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Order Status</TableCell>
            <TableCell>Order Number</TableCell>
            <TableCell>Pickup Time</TableCell>
            <TableCell>Customer Name</TableCell>
            <TableCell>Customer Address</TableCell>
            <TableCell>Customer Phone Number</TableCell>
            <TableCell>Delivery/Pickup</TableCell>

            <TableCell>
            </TableCell>

            <TableCell align="right">Message</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {state.catererOrdersToday.map((row, index) => (
            <TableRow key={row.order}>
              <TableCell>{row.status}</TableCell>
              <TableCell><Link onClick={(event) => handleOrderDetails(event, index)}>{row.order}</Link></TableCell>
              <TableCell>{row.pickup_time}</TableCell>
              <TableCell>{row.customer}</TableCell>
              <TableCell>{row.customer_address}</TableCell>
              <TableCell>{row.customer_phone}</TableCell>
              <TableCell>{row.pickup_delivery}</TableCell>
              <TableCell>
            <RadioGroup aria-label="role" name={`status-${row.order}`}  value={row.status} onChange={event => handleRadioChange(event, index)} row>
              <FormControlLabel value="ready" control={<Radio />} label="Ready" />
              <FormControlLabel value="completed" control={<Radio />} label="Completed" />
          </RadioGroup>
            </TableCell>
              <TableCell align="right"><MessageIcon></MessageIcon></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more orders
        </Link>
      </div>
    </React.Fragment>
  );
}