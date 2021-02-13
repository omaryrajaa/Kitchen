import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";

import LandingBar from "../components/LandingBar";
import Toolbar, { styles as toolbarStyles } from "../components/ToolBar";

const styles = (theme) => ({
  title: {
    fontSize: 24,
    color: "white",
  },
  placeholder: toolbarStyles(theme).root,
  toolbar: {
    justifyContent: "flex-start",
  },
  left: {
    flex: 1,
  },
  leftLinkActive: {
    color: theme.palette.common.black,
  },
  right: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",
  },
  rightLink: {
    fontSize: 16,
    color: theme.palette.common.black,
    marginLeft: theme.spacing(3),
  },
  linkSecondary: {
    color: theme.palette.secondary.main,
  },
});

function Header(props) {
  const { classes } = props;

  return (
    <div>
      <LandingBar position="fixed">
        <Toolbar className={classes.toolbar}>
          <div />
          <Link
            variant="h6"
            underline="none"
            color="inherit"
            className={classes.title}
            href="/"
          >
            {"KITCH"}
          </Link>
        </Toolbar>
      </LandingBar>
      <div className={classes.placeholder} />
    </div>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
