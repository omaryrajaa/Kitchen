import React, { useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Title from '../components/caterer/Title';
import Divider from '@material-ui/core/Divider';

import useApplicationData from '../hooks/useApplicationData'
import { SET_ITEM_REVIEWS } from '../reducers/dataReducer';


const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

const ItemReviews = (props) => {
  const classes = useStyles();
  const { state, dispatch } = useApplicationData();


  

  const menuItemId = props.id;

    
  useEffect(() => {
    getData();
  }, [dispatch]);

const getData = () => {
  axios({
    method: 'GET',
    url: `/api/reviews/menuItem`,
    params: {menuItemId}
  })
    .then(result =>  dispatch({ type: SET_ITEM_REVIEWS, itemReviews: result.data }))
    .catch(err => console.log(err.message))
}

  return (
    <React.Fragment>
      <Title>Reviews ({state.itemReviews.length})</Title>
      <Divider />
      <Table size="small">
      
        <TableBody>
          {state.itemReviews.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
              <List className={classes.root}>
                <ListItem alignItems="flex-start">
        
                  <ListItemText
                    primary={
                    <React.Fragment>
                      <Typography
                      component="span"
                      variant="h6"
                      className={classes.inline}
                      color="textPrimary"
                      >
                    {row.name} {" "} {row.rating}
                      </Typography>
                     
                      
                      
                    </React.Fragment>}
                    secondary={
                    <React.Fragment>
                      <Typography
                      component="span"
                      variant="body1"
                      className={classes.inline}
                      color="textPrimary"
                      >
                     {row.text}
                      </Typography>
                      
                      
                    </React.Fragment>
                    }
                  />
                </ListItem>
              </List>
              </TableCell>
              <TableCell align="right">{row.date}</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
     
    </React.Fragment>
  );
}

export default ItemReviews;