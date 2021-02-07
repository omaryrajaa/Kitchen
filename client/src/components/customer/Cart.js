import React from 'react';
import { useHistory } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import CssBaseline from '@material-ui/core/CssBaseline';

import FooterLayout from '../../components/FooterLayout';
import  Button  from '../../components/Button';
import CustomerHeaderLayout from '../CustomerHeaderLayout';


  
const TAX_RATE = 0.13;

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  button: {
    textAlign: 'end'
  }
});

const Cart = () => {
  const classes = useStyles();
  const history = useHistory();
  let localCart = JSON.parse(localStorage.getItem("cart"));

  console.log("cart = " , localCart)


const handleClick = () => {
 
  history.push("/checkout")
}


function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function subtotal(items) {

  return (localCart.map(item => item.quantity * item.price)).reduce((sum, i) => sum + i, 0);
}

 const invoiceSubtotal = subtotal(localCart);
  const invoiceTaxes = TAX_RATE * invoiceSubtotal;
 const invoiceTotal = invoiceTaxes + invoiceSubtotal;

  return (
    <React.Fragment>
      <CssBaseline />
      <CustomerHeaderLayout />
      <main>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={3}>
              Order Details
            </TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Desc</TableCell>
            <TableCell align="right">Qty.</TableCell>
            <TableCell align="right">Unit</TableCell>
            <TableCell align="right">Sum</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {localCart.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.title}</TableCell>
              <TableCell align="right">{row.quantity}</TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">{ccyFormat(row.price * row.quantity)}</TableCell>
            </TableRow>
          ))}

          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={2}>Subtotal</TableCell>
            <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Tax</TableCell>
            <TableCell align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
            <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      
    </TableContainer>
            <div className={classes.button}>
              <Button onClick={handleClick}>Checkout</Button>
            </div>
    </main>
  {/* Footer */}
  <FooterLayout />
      {/* End footer */}
    </React.Fragment>
  );
  }
export default Cart
