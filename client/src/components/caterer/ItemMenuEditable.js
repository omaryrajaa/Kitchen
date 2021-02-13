import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import TextField from "@material-ui/core/TextField";
import InputBase from "@material-ui/core/InputBase";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import dish from "../../assets/Dish.jpeg";

const useStyles = makeStyles((theme) => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  margin: {
    margin: theme.spacing(1),
    textAlignLast: "center",
  },
}));

const ItemMenuEditable = (props) => {
  const classes = useStyles();

  const [values, setValues] = useState({
    price: props.price,
    description: props.description,
    tags: props.tags,
    title: props.title,
    category: props.category,
    status: props.status,
    quantity: props.quantity,
  });

  const toggleChecked = (event) => {
    setValues({ ...values, [event.target.name]: event.target.checked });
  };

  useEffect(() => {
    handleEdit();
  }, [values.status]);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleEdit = () => {
    props.onUpdate(props.id, values);
  };

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.cardMedia}
        image={dish}
        title={values.title}
      />
      <CardContent className={classes.cardContent}>
        <InputBase
          className={classes.margin}
          value={values.title}
          onChange={handleChange}
          inputProps={{ "aria-label": "naked" }}
        />

        <TextField
          id="standard-multiline-flexible"
          label="Description"
          name="description"
          multiline
          value={values.description}
          onChange={handleChange}
        />
      </CardContent>
      <CardContent>
        <TextField
          id={`standard-basic-tags-${props.id}`}
          label="Tags"
          name="tags"
          value={values.tags}
          variant="standard"
          onChange={handleChange}
        />
      </CardContent>
      <CardContent>
        <TextField
          id={`standard-basic-quantity-${props.id}`}
          label="Quantity"
          name="quantity"
          value={values.quantity}
          variant="standard"
          onChange={handleChange}
        />
      </CardContent>

      <CardContent>
        <TextField
          id={`standard-basic-${props.id}`}
          label="Category"
          value={values.category}
          name="category"
          onChange={handleChange}
        />

        <FormControl fullWidth>
          <InputLabel htmlFor={`standard-adornment-amount-${props.id}`}>
            Price
          </InputLabel>
          <Input
            id={`standard-adornment-amount-${props.id}`}
            name="price"
            value={values.price}
            onChange={handleChange}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
        </FormControl>
      </CardContent>
      <CardActions>
        <IconButton aria-label="delete" onClick={props.onDelete}>
          <DeleteIcon />
        </IconButton>

        <IconButton aria-label="edit" onClick={handleEdit}>
          <EditIcon />
        </IconButton>

        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                size="small"
                name="status"
                checked={values.status}
                onChange={toggleChecked}
              />
            }
            label="Today's Menu"
          />
        </FormGroup>
      </CardActions>
    </Card>
  );
};

export default ItemMenuEditable;
