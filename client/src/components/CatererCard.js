import React from 'react';
import { useHistory } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';



const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },

  chips: {
    backgroundColor:theme.palette.secondary.main
  }
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
        <div>

          <Typography gutterBottom variant="h6" component="h2">
         {props.title}
        </Typography>
            <Chip className={classes.chips} label={props.rate} />
          </div>
 
      </CardContent>
    </CardActionArea>
    
  </Card>


  );
}

export default CatererCard
