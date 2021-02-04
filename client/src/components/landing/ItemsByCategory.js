import React from 'react'
import { useLocation } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';



import FooterLayout from '../FooterLayout';
import CustomerHeaderLayout from '../CustomerHeaderLayout';
import MenuItem from '../MenuItem';

import Image1 from '../../assets/Image1.jpeg';





const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 1000,
    height: 'auto',
  },
  cardGrid: {
    flex: 1,
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },

}));


 
const ItemsByCategory = () => {
  const classes = useStyles();
  const location = useLocation();
  const myparam = location.state.params;
  console.log("myparam = ", myparam)

  
  return (

    <React.Fragment>
      <CssBaseline />
      <CustomerHeaderLayout />
      <main>

        <Container className={classes.cardGrid} maxWidth="md">
          
          <Grid container spacing={4}>
          <GridList cellHeight={'auto'} cols={4} padding={20} className={classes.gridList}>

{myparam.map((tile) => (
  <GridListTile key={tile.id}>
              <MenuItem
  key={tile.id}
  id={tile.id}
  title={tile.name}
  image={Image1}
  description={tile.description}
  price={tile.price}
  ></MenuItem>
      
  
  </GridListTile>
))}
</GridList>
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <FooterLayout />
      {/* End footer */}
    </React.Fragment>
  );
  }

  
export default ItemsByCategory
