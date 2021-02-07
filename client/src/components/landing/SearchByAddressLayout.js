import React from 'react';
import {useHistory} from 'react-router-dom';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import Button from '../Button';
import Typography from '../Typography';
import SearchByAddress from '../../components/SearchByAddress';
import Form from '../Form';
import backroundImg from '../../assets/Background.png'



const styles = (theme) => ({
  background: {
    backgroundImage: `url(${backroundImg})`,
    backgroundColor: '#58BC82', // Average color of the background image.
    backgroundPosition: 'center',
  },
  button: {
    minWidth: 200,
  },

});


function SearchByAddressLayout(props) {
  const { classes } = props;

  const history = useHistory();
  

  const handleClick = e => {
  
    e.preventDefault();
    history.push('/caterers-list')
    
  }

  
  return (
    <SearchByAddress backgroundClassName={classes.background}>

      <Typography color="inherit" align="center" variant="h2" marked="center">
        Our Kitchen, Your Doorstep.
      </Typography>

      <Grid container justify='center' alignItems='center'>

        <Grid item>
          
        </Grid>

        <Grid item>
          <Button
            color="secondary"
            variant="contained"
            size="medium"
            component="a"
            onClick={handleClick}
          >
            <ArrowForwardIcon />
          </Button>
        </Grid>

      </Grid>
     
    </SearchByAddress>
  );
}

SearchByAddressLayout.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchByAddressLayout);
