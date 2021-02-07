import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import { useAuth } from "../context/auth";
import axios from 'axios';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import RateReviewIcon from '@material-ui/icons/RateReview';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

import food from '../assets/Food.jpeg';
import useApplicationData from '../hooks/useApplicationData'

import { SET_ITEM_REVIEWS } from '../reducers/dataReducer';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: 'fit-content',
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120,
  },


}));

const MenuItem = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [review, setReview] = useState('');
  const [rate, setRate] = React.useState(0);
  const { authTokens, setAuthTokens } = useAuth();
  const { state, dispatch } = useApplicationData();

  const customerId = authTokens ? authTokens.id : 0
  

  console.log("props menuItem = ", props)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  

  const handleChange = (event) => {
    setReview(event.target.value );
    
  };

  const handleRateChange = (event) => {
    setRate(event.target.value);
  };

  const handleClick =() => {
    history.push("/dish-details", {params: props });
  }

    
  const createData = () => {

    if(customerId) {
      axios.post(`/api/reviews`, {
        customerId,
        menuItemId:props.id,
        rating: rate,
        reviewText: review,
  
      }).then(res => {
   
          dispatch({ type: SET_ITEM_REVIEWS, itemReviews: res.data });
          
      })
    } else {
      alert("you have to Login!")
    }

    handleClose();
  }
  
  

  return (
    <Card className={classes.root} >
      <CardHeader

        title={props.title}
        subheader={props.shop_name} 
      />
      <CardMedia
        className={classes.media}
        image={food}
        title={props.title}
        onClick = {handleClick}
      />
      <CardContent>
      <Typography variant="body2" color="textSecondary" component="p">
         Quantity: {props.quantity} Price: ${props.price}
        </Typography>
        <Typography variant="body2" color="textPrimary" component="p">
        {props.description}
        </Typography>

      </CardContent>
      <CardActions disableSpacing>

        <IconButton
          onClick={handleClickOpen}
        >
          <RateReviewIcon />
          </IconButton>
          <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Rate the plate</DialogTitle>
        <DialogContent>
        <InputLabel htmlFor="rate-native-simple">Rate</InputLabel>
        <Select
          native
          value={rate}
          onChange={handleRateChange}
          inputProps={{
            name: 'rate',
            id: 'rate-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </Select>

          <TextField
            autoFocus
            multiline
            margin="dense"
            id="review"
            label="Review"
            name="review"
            value={review}
            fullWidth
            onChange={handleChange}
          />
         
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={createData} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
        
      </CardActions>
    </Card>
   
  );
}

export default  MenuItem
