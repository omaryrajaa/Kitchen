import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import CssBaseline from "@material-ui/core/CssBaseline";

import FooterLayout from "../../components/FooterLayout";
import Button from "../../components/Button";
import CustomerHeaderLayout from "../CustomerHeaderLayout";
import useApplicationData from "../../hooks/useApplicationData";
import { SET_CUSTOMER_ORDER } from "../../reducers/dataReducer";

const TAX_RATE = 0.13;

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    alignItems: "center",
  },
  table: {
    minWidth: 700,
  },
  textField: {
    width: 200,
  },
});

const AntSwitch = withStyles((theme) => ({
  root: {
    margin: 0,
    width: 28,
    height: 16,
    padding: 0,
    display: "flex",
  },
  switchBase: {
    padding: 2,
    color: theme.palette.grey[500],
    "&$checked": {
      transform: "translateX(12px)",
      color: theme.palette.common.white,
      "& + $track": {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
      },
    },
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: "none",
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white,
  },
  checked: {},
}))(Switch);

const Cart = () => {
  const { state, dispatch } = useApplicationData();

  const classes = useStyles();
  const history = useHistory();
  const [states, setState] = useState({
    checkedA: true,
  });
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleChange = (event) => {
    setState({ ...states, [event.target.name]: event.target.checked });
  };

  let localCart = JSON.parse(localStorage.getItem("cart"));
  let customer = JSON.parse(localStorage.getItem("tokens"));

  const handleClick = (event) => {
    event.preventDefault();
    createData();

    // history.push("/checkout")
  };

  function ccyFormat(num) {
    if (num) return `${num.toFixed(2)}`;
  }

  function subtotal(items) {
    if (items) {
      return items
        .map((item) => item.quantity * item.price)
        .reduce((sum, i) => sum + i, 0);
    }
  }

  const invoiceSubtotal = subtotal(localCart);
  const invoiceTaxes = TAX_RATE * invoiceSubtotal;
  const invoiceTotal = invoiceTaxes + invoiceSubtotal;

  const createData = () => {
    if (localCart) {
      localStorage.setItem("total_amount", JSON.stringify(invoiceTotal));
      const listItemsId = localCart.map((item) => item.id);
      const listPrices = localCart.map((item) => item.price);
      const listQty = localCart.map((item) => item.quantity);

      axios
        .post(`/api/orders`, {
          customerId: customer.id,
          statusId: 1,
          totalAmount: invoiceTotal,
          phone: customer.phone,
          pickupTime: selectedDate.toTimeString().slice(0, 8),
          pickupOrDelivery: states.checkedA ? "delivery" : "pickup",
          listItemsId,
          listPrices,
          listQty,
        })
        .then((res) => {
          dispatch({ type: SET_CUSTOMER_ORDER, customerOrder: res.data[0] });
        });
    }
  };
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
              {localCart &&
                localCart.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.title}</TableCell>
                    <TableCell align="right">{row.quantity}</TableCell>
                    <TableCell align="right">{row.price}</TableCell>
                    <TableCell align="right">
                      {ccyFormat(row.price * row.quantity)}
                    </TableCell>
                  </TableRow>
                ))}

              <TableRow>
                <TableCell rowSpan={3} />
                <TableCell colSpan={2}>Subtotal</TableCell>
                <TableCell align="right">
                  {ccyFormat(invoiceSubtotal)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Tax</TableCell>
                <TableCell align="right">{`${(TAX_RATE * 100).toFixed(
                  0
                )} %`}</TableCell>
                <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2}>Total</TableCell>
                <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container className={classes.root}>
          <Grid item xs>
            <Typography component="div" gutterBottom>
              <Grid component="label" container alignItems="center" spacing={1}>
                <Grid item>Pickup</Grid>
                <Grid item>
                  <AntSwitch
                    checked={states.checkedA}
                    onChange={handleChange}
                    name="checkedA"
                  />
                </Grid>
                <Grid item>Delivery</Grid>
              </Grid>
            </Typography>
          </Grid>
          <Grid item xs>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardTimePicker
                margin="normal"
                id="time-picker"
                label="Time picker"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change time",
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs>
            <Button onClick={handleClick}>Checkout</Button>
          </Grid>
        </Grid>
      </main>
      {/* Footer */}
      <FooterLayout />
      {/* End footer */}
    </React.Fragment>
  );
};
export default Cart;
