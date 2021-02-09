
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Container from '@material-ui/core/Container';
import Typography from '../Typography';
import Button from '../Button';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import delivery from '../../assets/Delivery.jpg'


const styles = (theme) => ({
  root: {
    marginTop: theme.spacing(10),
    marginBottom: 0,
    display: 'flex',
  },
  cardWrapper: {
    zIndex: 1,
  },
  card: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(8, 3),
  },
  cardContent: {
    maxWidth: 400,
  },
  button: {
    width: '100%',
    backgroundColor: 'transparent'
  },
  imagesWrapper: {
    position: 'relative',
  },
  imageDots: {
    position: 'absolute',
    top: -67,
    left: -67,
    right: 0,
    bottom: 0,
    width: '100%'
  },
  image: {
    position: 'absolute',
    top: -28,
    left: -28,
    right: 0,
    bottom: 0,
    width: '100%',
    maxWidth: 600,
  },
});


const BecomeDelivery = (props) => {
  const { classes } = props;
  

  const handleSubmit = (event) => {
    event.preventDefault();
    
  };
  

  return (
    <Container className={classes.root} component="section">
      <Grid container>
        
        <Grid item xs={12} md={6} className={classes.imagesWrapper}>
          <Hidden smDown>
            <div className={classes.imageDots} />
            <img
              src={delivery}
              alt="delivery"
              className={classes.image}
            />
          </Hidden>
        </Grid>
        <Grid item xs={12} md={6} className={classes.cardWrapper}>
          <div className={classes.card}>
            <form onSubmit={handleSubmit} className={classes.cardContent}>
              <Typography variant="h4" component="h4" gutterBottom>
                Become A Delivery Partener
              </Typography>
              <Typography variant="h6">
              Do you enjoy cooking for others? Are you the go-to person to cook for family events and holidays? You can turn that passion into profits by starting a home-based catering business.
              </Typography>
              
              <Button type="submit" color="primary" variant="contained" className={classes.button}>
                Get Started
                <ArrowForwardIcon />
              </Button>
            </form>
          </div>
        </Grid>
      </Grid>

    </Container>
  );
}

BecomeDelivery.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BecomeDelivery);
