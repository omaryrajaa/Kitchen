import React , { useEffect, useState }from 'react';
import { useHistory, Link } from "react-router-dom";

import axios from 'axios'

import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import HomeIcon from '@material-ui/icons/Home';


import dish from '../assets/Dish.jpeg'
import FooterLayout from '../views/FooterLayout';
import ItemMenuEditable from './ItemMenuEditable';
import useApplicationData from '../hooks/useApplicationData'
import { SET_CATEGORIES, SET_CATERER_ITEMS, SET_CATERER_ITEMS_CREATE, SET_CATERER_ITEMS_UPDATE } from '../reducers/dataReducer';


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


const FullMenu = props => {
  const catererId = 2;

  let history = useHistory();
  const { state, dispatch } = useApplicationData();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    price: 0,
    description: '',
    name: '',
    category: '',
    photourl: '',
    quantity:0
    
  
  });

  function handleClick() {
    history.push("/today-menu");
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setNewItem({ ...newItem, [event.target.name]: event.target.value });
    console.log(newItem)
  };



  useEffect(() => {
    getData();
  }, [])

  const getData = async () => {
    const response = await axios.get(`/api/caterers/${catererId}/menus`)
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

      const price = parseInt(values.price)
      
      
      axios.put(`/api/caterers/${catererId}/menus/${id}`, {
        
        dishName: values.title,
        foodDescription: values.description,
        foodPrice: price,
        status: values.status,
        quantity: values.quantity
        
      }).then(res => {
        console.log('data update= ', res.data)
  
        dispatch({ type: SET_CATERER_ITEMS_UPDATE, catererItemsUpdate: res.data });
          
      })
    }
  
    const createData = () => {

      axios.post(`/api/caterers/${catererId}/menus`, {
        
        catererId,
        foodTypeName: newItem.category,
        dishName: newItem.name,
        foodDescription: newItem.description,
        foodPhoto: newItem.photourl,
        foodPrice: Number(newItem.price),
        status: false,
        quantity: Number(newItem.quantity)
        
      }).then(res => {
        

          dispatch({ type: SET_CATERER_ITEMS_CREATE, catererItemsCreate: res.data });
          
      })
      handleClose();
    }
    
    

  const renderBody = () => {
    const items = state.catererItems;
    console.log('mystate = ', state)
    return items && items.map((card) => {
        return (
          
            <Grid item  xs={12} sm={6} md={4} key={card.id}>
              <ItemMenuEditable 
              
              id={card.id}
              photo={card.image}
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
          <Link to="/dashboard">      
          <HomeIcon className={classes.button} fontSize="large" /> 
          </Link>
          </div>
          <div>         
             <Typography variant="h6" className={classes.title} noWrap>My Dishes</Typography>
          </div>
          <div className={classes.right}>
          <div>
      <Button variant="text" className={classes.button} onClick={handleClickOpen}>
        Create new Dish
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create new Dish</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="name"
            name="name"
            fullWidth
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="name"
            label="Description"
            type="description"
            name="description"
            fullWidth
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="name"
            label="Category"
            type="category"
            name="category"
            fullWidth
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="name"
            label="Photo URL"
            type="photourl"
            name="photourl"
            fullWidth
            onChange={handleChange}
          />
           <TextField
            margin="dense"
            id="name"
            label="Quantity"
            type="quantity"
            name="quantity"
            fullWidth
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="name"
            label="Price"
            type="price"
            name="price"
            fullWidth
            onChange={handleChange}
          />


        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={createData} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
      <Button variant="text" className={classes.button} onClick={handleClick}>
        Show Today's menu
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

export default FullMenu