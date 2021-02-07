import React , { useEffect, useState }from 'react';
import { useHistory, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import axios from 'axios'

import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

import HomeIcon from '@material-ui/icons/Home';



import FooterLayout from '../FooterLayout';
import ItemMenuEditable from './ItemMenuEditable';
import useApplicationData from '../../hooks/useApplicationData'
import { SET_CATERER_ITEMS,  SET_CATERER_ITEMS_UPDATE } from '../../reducers/dataReducer';


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


const TodayMenu = props => {
 
  const classes = useStyles();
  const history = useHistory();

  const { authTokens, setAuthTokens } = useAuth();
  const catererId = authTokens.id;
  const { state, dispatch } = useApplicationData();
  

  function handleClick() {
    history.push("/full-menu", {params: {catererId}});
  }

  useEffect(() => {
    getData();
  }, [])

  const getData = async () => {
    const response = await axios.get(`/api/caterers/${catererId}/menus/today`)
    console.log('response = ', response.data)
   
        dispatch({ type: SET_CATERER_ITEMS, catererItems: response.data });
        
     
  }


    const removeData = (id) => { 
      axios.delete(`/api/caterers/${catererId}/menus/${id}`).then(res => {
        const del = state.catererItems.filter(item => id !== item.id)

          dispatch({ type: SET_CATERER_ITEMS, catererItems: del });
          
      })
    }

    const updateData = (id, values) => {
      console.log("state before update", state)
    
      console.log("Rajaa = ", values)
      const price = parseInt(values.price)
      
      
      axios.put(`/api/caterers/${catererId}/menus/${id}`, {
        
        dishName: values.title,
        foodDescription: values.description,
        foodPrice: price,
        status: values.status,
        quantity:values.quantity
        
      }).then(res => {
        console.log('data update= ', res.data)
  
        dispatch({ type: SET_CATERER_ITEMS_UPDATE, catererItemsUpdate: res.data });
          
      })
    }
  
   

  const renderBody = () => {
    const items = state.catererItems;
    console.log('mystate = ', state)
    return items && items.map((card) => {
        return (
          
            <Grid item  xs={12} sm={6} md={4} key={card.id}>
              <ItemMenuEditable 
              
              id={card.id}
              photo={card.photo}
              description={card.description}
              price={card.price}
              title={card.caterer_menu}
              category={card.category}
              catererId={catererId}
              status={card.active_status}
              quantity={card.quantity}
              onDelete={() => removeData(card.id)}
              onUpdate={updateData}
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
          <Link className={classes.button} to="/dashboard">      
          <HomeIcon fontSize="large" /> 
          </Link>
          </div>
          <div>  
             <Typography variant="h6" className={classes.title} noWrap>Today's Menu</Typography>
          </div>
          <div className={classes.right}>
          <div>
      <Button variant="text" className={classes.button} onClick={handleClick}>
        Add Dish
      </Button>
     
    </div>

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

export default TodayMenu