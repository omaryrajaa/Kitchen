import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, Link } from "react-router-dom";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import food from '../assets/Food.jpeg'


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  left: {
    marginLeft: 'auto',

  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const MenuItem = (props) => {
  const classes = useStyles();
  let history = useHistory();
  console.log("props = ", props)

  const handleClick =() => {
    history.push("/dish-details", {params: props });
  }

  return (
    <Card className={classes.root} onClick = {handleClick}>

      <CardHeader
        title={props.title}
      />
        
      <CardMedia
        className={classes.media}
        image={food}
      />
      <CardContent>
        
        <Typography variant="body1" color="textSecondary" component="p">
          {props.description}
        </Typography>
      </CardContent>
      <CardContent>
      <FormControl fullWidth className={classes.margin}>
          <InputLabel htmlFor={`standard-adornment-amount-${props.id}`}>Price</InputLabel>
          <Input
            id={`standard-read-only-input-${props.id}`}
            label="Read Only"
            disableUnderline={true}
            readOnly={true}
          
            defaultValue={props.price}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
        </FormControl>

      </CardContent>
     
    </Card>
  );
}

export default  MenuItem
