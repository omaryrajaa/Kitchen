import React, { useState, useContext } from 'react';
import {useHistory} from 'react-router-dom';
import { useAuth } from "../context/auth";

import clsx from 'clsx';

import axios from 'axios';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';



import LandingBar from './LandingBar';
import Toolbar, { styles as toolbarStyles } from './ToolBar';

import useApplicationData from '../hooks/useApplicationData'


const styles = (theme) => ({
  title: {
    fontSize: 24,
    color: 'white'
  },
  placeholder: toolbarStyles(theme).root,
  toolbar: {
    justifyContent: 'space-between',
  },
  left: {
    flex: 1,
  },
  leftLinkActive: {
    color: theme.palette.common.black,
  },
  right: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  rightLink: {
    fontSize: 16,
    fill : theme.palette.secondary.light,
    marginLeft: theme.spacing(3),
    
  },
  linkSecondary: {
    color: theme.palette.secondary.main,
  },
  center: {
    
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
  },
  searchField:{
    backgroundColor: theme.palette.secondary.light,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },


});

function CustomerHeaderLayout(props) {
  const { authTokens, setAuthTokens } = useAuth();

  const customerId = authTokens ? authTokens.id : 0
  const { classes } = props;
  const { state, dispatch } = useApplicationData();

  const [values, setValues] = useState({
    dishName: ''
  });
  const history = useHistory();


  const handleClickCart = (event) => {
    event.preventDefault();
    history.push("/cart");

  }

    const handleSubmit = () => {
      axios({
        method: 'GET',
        url: `/api/menus/dish_name`,
        params: {dishName: values.dishName}
      })
        .then(result => {console.log("get result = ", result.data)
          history.push('/items-by-name',{params: result.data})})
        .catch(err => console.log(err.message))
    }
  
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const renderLogin = () => {
    console.log("ID= ", customerId)
    if(customerId) {
      return (
      <div className={classes.right}>
          <Badge badgeContent={0} color="secondary">
              <ShoppingCartIcon onClick={handleClickCart}/>
              
           </Badge>
            
          </div>
      )
    }
      else {
    return (
      <div className={classes.right}>
      <Link
        color="inherit"
        variant="h6"
        underline="none"
        className={classes.rightLink}
        href="/login-customer"
      >
        {'Sign In'}
      </Link>
      <Link
        variant="h6"
        underline="none"
        className={clsx(classes.rightLink, classes.linkSecondary)}
        href="/sign-up"
      >
        {'Sign Up'}
      </Link>
    </div>

    )

  }

  }

  return (
    <div className={classes.title}>
      <LandingBar position="fixed">
        <Toolbar className={classes.toolbar}>
          <div/>
          <Link
            variant="h6"
            underline="none"
            color="inherit"
            className={classes.title}
            href="/"
          >
            {'KITCH'}
          </Link>
          <div  className={classes.center}>
          
          
              <TextField 
                className={classes.searchField}
                size="small"
                placeholder="What are you craving?" 
                variant="outlined"
                color="primary"
                value={values.dishName} 
                name="dishName" 
                onChange={handleChange}
                InputProps={{
                endAdornment: (
                <InputAdornment>
                  <IconButton onClick={handleSubmit}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
                  )
                }}
              />
           
          </div>
         
          {renderLogin()}
        </Toolbar>
      </LandingBar>
      <div className={classes.placeholder} />
    </div>
  );
}

CustomerHeaderLayout.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomerHeaderLayout);