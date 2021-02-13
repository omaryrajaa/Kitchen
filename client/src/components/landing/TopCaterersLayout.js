import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "../Typography";
import TopCaterersList from "./TopCaterersList";

const styles = (theme) => ({
  root: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(4),
  },
});

function TopCaterersLayout(props) {
  const { classes } = props;

  return (
    <Container className={classes.root} component="section">
      <Typography variant="h4" marked="center" align="center" component="h2">
        Top Caterers
      </Typography>
      <div className={classes.images}>
        <TopCaterersList />
      </div>
    </Container>
  );
}

TopCaterersLayout.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TopCaterersLayout);
