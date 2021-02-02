import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

// Generate Order Data
function createData(id, name, message, time) {
  return { id, name, message, time };
}

const rows = [
  createData(0, 'Elvis Presley', 'message1', '9:00 AM'),
  createData(1, 'Paul McCartney', 'message2', '9:01 AM'),
  createData(2, 'Tom Scholz', 'message3', '9:02 AM'),
  createData(3, 'Michael Jackson', 'message4', '9:03 AM'),
  createData(4, 'Bruce Springsteen', 'message5', '9:03 AM'),
];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Messages() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Messages</Title>
      <Table size="small">

        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
              <List className={classes.root}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="" />
        </ListItemAvatar>
        <ListItemText
          primary={row.name}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                {row.message}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
      </List>
              </TableCell>

              <TableCell align="right">{row.time}<ArrowForwardIosIcon /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          View All
        </Link>
      </div>
    </React.Fragment>
  );
}