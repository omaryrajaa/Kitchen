import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Container from "@material-ui/core/Container";
import Typography from "../components/Typography";

function Copyright() {
  return (
    <React.Fragment>
      {"© "}
      <Link color="inherit" href="/">
        KITCH
      </Link>{" "}
      {new Date().getFullYear()}
    </React.Fragment>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    backgroundColor: theme.palette.secondary.light,
  },
  container: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    display: "flex",
  },

  list: {
    margin: 0,
    listStyle: "none",
    padding: 0,
  },
  listItem: {
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    color: "white",
  },
}));

export default function FooterLayout() {
  const classes = useStyles();

  return (
    <Typography component="footer" className={classes.root}>
      <Container className={classes.container}>
        <Grid container spacing={5}>
          <Grid item xs={6} sm={4} md={3}>
            <Grid
              container
              direction="column"
              justify="flex-end"
              className={classes.iconsWrapper}
              spacing={2}
            >
              <Grid item>
                <Copyright />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <Typography variant="h6" marked="left" gutterBottom>
              About Kitch
            </Typography>
            <ul className={classes.list}>
              <li className={classes.listItem}>
                <Link href="">About Us</Link>
              </li>
              <li className={classes.listItem}>
                <Link href="">FAQ</Link>
              </li>
              <li className={classes.listItem}>
                <Link href="">Blog</Link>
              </li>
              <li className={classes.listItem}>
                <Link href="">Gift Cards</Link>
              </li>
              <li className={classes.listItem}>
                <Link href="">Business Account</Link>
              </li>
            </ul>
          </Grid>
          <Grid item xs={6} sm={8} md={4}>
            <Typography variant="h6" marked="left" gutterBottom>
              Get Help
            </Typography>
            <ul className={classes.list}>
              <li className={classes.listItem}>
                <Link href="">Account Details</Link>
              </li>
              <li className={classes.listItem}>
                <Link href="">Order History</Link>
              </li>
              <li className={classes.listItem}>
                <Link href="">Contact Us</Link>
              </li>
              <li className={classes.listItem}>
                <Link href="">Accessibility</Link>
              </li>
              <li className={classes.listItem}>
                <Link href="">English</Link>
              </li>
            </ul>
          </Grid>
        </Grid>
      </Container>
    </Typography>
  );
}
