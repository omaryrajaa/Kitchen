import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import HomeIcon from "@material-ui/icons/Home";
import Container from "@material-ui/core/Container";
import FooterLayout from "../FooterLayout";
import useApplicationData from "../../hooks/useApplicationData";
import { SET_DELIVERY_AGENTS } from "../../reducers/dataReducer";

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
  title: {
    color: theme.palette.secondary.light,
  },
}));

const DeliveryAgentsList = (props) => {

  const classes = useStyles();
  const { state, dispatch } = useApplicationData();

  useEffect(() => {
    getData();
  }, [dispatch]);

  const getData = async () => {
    const response = await axios.get(`/api/delivery-agents`);

    dispatch({ type: SET_DELIVERY_AGENTS, deliveryAgents: response.data });
  };


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
            <Typography variant="h6" className={classes.title} noWrap>
              List Delivery Agents
            </Typography>
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
                    <TableCell>First Name</TableCell>
                    <TableCell>Last Name</TableCell>
                    <TableCell>Address</TableCell>
                    <TableCell>Phone Number</TableCell>
                    <TableCell>Email</TableCell>


                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {state.deliveryAgents && state.deliveryAgents.map((row, index) => (
                    <TableRow key={row.email}>
                      <TableCell>{row.first_name}</TableCell>
                      <TableCell>{row.last_name}</TableCell>
                      <TableCell>{row.address}</TableCell>
                      <TableCell>{row.phone}</TableCell>
                      <TableCell>{row.email}</TableCell>

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
};

export default DeliveryAgentsList;
