import React , { useEffect, useState }from 'react';
import { useLocation, Link } from "react-router-dom";

import axios from 'axios'

import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import HomeIcon from '@material-ui/icons/Home';



import FooterLayout from './FooterLayout';


import useApplicationData from '../hooks/useApplicationData';
import { SET_CATERER_ITEMS } from '../reducers/dataReducer';
import MenuItem from './MenuItem';



const useStyles = makeStyles((theme) => ({
  cardGrid: {
    flex: 1,
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  right: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    color: theme.palette.secondary.light,
  },
  title:{
    color: theme.palette.secondary.light,

  }
}));


const CatererTodayDishes = () => {

  const classes = useStyles();
  const location = useLocation();
  const myparam = location.state.params;
  console.log("******************myparam = ", myparam)
  const { state, dispatch } = useApplicationData();


  useEffect(() => {
    getData();
  }, [dispatch])

  const getData = async () => {
    const response = await axios.get(`/api/caterers/${myparam.id}/menus/today`)
    console.log('response = ', response.data)
   
        dispatch({ type: SET_CATERER_ITEMS, catererItems: response.data });
        
     
  }
   
  const renderBody = () => {
    const items = state.catererItems;
    console.log('mystate = ', state)
    return  items.map((card) => {
        return (
          
            <Grid item  xs={12} sm={6} md={4} key={card.id}>
              <MenuItem
              
              id={card.id}
              photo={card.photo}
              description={card.description}
              price={card.price}
              title={card.caterer_menu}
              category={card.category}
              catererId={myparam.id}
              status={card.active_status}
            />
              
            </Grid>
        )
    })
}


  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <div>
          <Link className={classes.button} to="/">      
          <HomeIcon fontSize="large" /> 
          </Link>
          </div>
          <div>  
             <Typography variant="h6" className={classes.title} noWrap>{myparam.title} Today's Menu</Typography>
          </div>

        </Toolbar>
        
      </AppBar>
      <main>

        <Container className={classes.cardGrid} maxWidth="md">
          
          <Grid container spacing={4}>
          {renderBody()}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <FooterLayout />
      {/* End footer */}
    </React.Fragment>
  );
  }

export default CatererTodayDishes