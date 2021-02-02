import React from 'react';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import LayersIcon from '@material-ui/icons/Layers';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import AssessmentIcon from '@material-ui/icons/Assessment';
import MessageIcon from '@material-ui/icons/Message';
import PaymentIcon from '@material-ui/icons/Payment';
import SettingsIcon from '@material-ui/icons/Settings';
import HelpIcon from '@material-ui/icons/Help';


export const mainListItems = (
  <div>
    <Link to="/dashboard">
    <ListItem button key= "Home">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItem>
    </Link>
    <Link to="/orders-history">
    <ListItem button>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Orders" />
    </ListItem>
    </Link>
    <Link to="/today-menu">
    <ListItem button>
      <ListItemIcon>
        <RestaurantMenuIcon />
      </ListItemIcon>
      <ListItemText primary="Menu" />
    </ListItem>
    </Link>
    <ListItem button>
      <ListItemIcon>
        <AssessmentIcon />
      </ListItemIcon>
      <ListItemText primary="Analytics" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Marketing" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Community" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <MessageIcon />
      </ListItemIcon>
      <ListItemText primary="Messages" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PaymentIcon />
      </ListItemIcon>
      <ListItemText primary="Payments" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <SettingsIcon />
      </ListItemIcon>
      <ListItemText primary="Settings" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <HelpIcon />
      </ListItemIcon>
      <ListItemText primary="Help" />
    </ListItem>
  </div>
);

