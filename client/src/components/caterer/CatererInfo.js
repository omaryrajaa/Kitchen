import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  CardMedia,
  Button,
  FormControl,
  InputLabel,
  Input,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Link,
} from "@material-ui/core";

import Image1 from "../../assets/Caterer.jpg";

const useStyles = makeStyles((theme) => ({
  card: {
    display: "block",
    margin: 5,
    [theme.breakpoints.up("sm")]: {
      display: "flex",
    },
    borderRadius: 0,
    flexDirection: "row-reverse",
  },

  caption: {
    textTransform: "uppercase",
  },

  title: {
    textTransform: "uppercase",
    color: theme.palette.primary.main,
    fontWeight: "bold",
    textAlign: "-webkit-center",
  },

  media: {
    width: "auto",
    height: 300,
    [theme.breakpoints.up("sm")]: {
      width: 1500,
    },
    flexBasis: "30%",
  },

  content: {
    display: "flex",
    flexDirection: "column",
    flexBasis: "70%",
    backgroundColor: "#ffffff",
  },

  cardText: {
    flex: "1 0 auto",
    marginBottom: 15,
    [theme.breakpoints.up("sm")]: {
      marginBottom: 0,
    },
  },

  linkAction: {
    textDecoration: "none",
    textTransform: "uppercase",
    color: theme.palette.secondary.main,
    fontWeight: "bold",
    justifyContent: "center",
  },
}));

const CatererInfo = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const history = useHistory();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleShopLink = (event) => {
    event.preventDefault();

    history.push(`/caterer-dishes/${props.shop_name}`, {
      params: { id: props.catererId },
    });
  };

  return (
    <React.Fragment>
      <div>
        <Card className={classes.card}>
          <CardMedia image={Image1} title="Shop" className={classes.media} />
          <CardContent className={classes.content}>
            <div className={classes.cardText}>
              <Typography variant="h4" className={classes.title} gutterBottom>
                <Link onClick={(event) => handleShopLink(event)}>
                  {props.shop_name}
                </Link>
              </Typography>
              <Typography variant="h6">About the Shop</Typography>
              <Typography variant="body1">{props.shop_description}</Typography>
              <br></br>
              <Typography variant="body1">Phone Number: {props.phone}</Typography>
            </div>
            <CardActions className={classes.linkAction}>
              <Button onClick={handleClickOpen}>Message Shop</Button>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
              >
                <DialogTitle id="form-dialog-title">Contact Us</DialogTitle>
                <DialogContent>
                  <FormControl margin="normal" fullWidth>
                    <InputLabel margin="normal" fullWidth htmlFor="name">
                      Name
                    </InputLabel>
                    <Input id="name" type="text" />
                  </FormControl>

                  <FormControl margin="normal" fullWidth>
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <Input id="email" type="email" />
                  </FormControl>

                  <FormControl margin="normal" fullWidth>
                    <InputLabel htmlFor="email">Message</InputLabel>
                    <Input id="email" multiline rows={10} />
                  </FormControl>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    Cancel
                  </Button>
                  <Button
                    onClick={(e) => console.log("Send Message")}
                    color="primary"
                  >
                    Send
                  </Button>
                </DialogActions>
              </Dialog>
            </CardActions>
          </CardContent>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default CatererInfo;
