import React from 'react';
import { useHistory, Link } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    marginLeft: 'auto',
   
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const CatererCard = (props) => {
  console.log("***************props top caterer = ", props)
  const classes = useStyles();
  const history = useHistory();


  const handleClick = e => {
  
    e.preventDefault();
    history.push('/caterer-dishes',{params: props})
    
  }
 
  return (


    <Card className={classes.root} onClick={handleClick}>
    <CardActionArea>
      <CardMedia
        className={classes.media}
        image={props.logo}
        title="Caterer"
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="h2">
         {props.title}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.description}
        </Typography>
      </CardContent>
    </CardActionArea>
    
  </Card>


  );
}

export default CatererCard
