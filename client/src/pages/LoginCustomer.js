import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from 'axios';
import withRoot from '../modules/withRoot';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

import { Card, Form, Input, Button, Error } from "../components/AuthForms";
import { useAuth } from "../context/auth";
import Header from '../components/Header';

function LoginCustomer() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthTokens } = useAuth();

  function postLogin() {
    axios.post(`/api/customers/login`, {
      email,
      password
    }).then(result => {
      if (result.status === 200) {
        setAuthTokens(result.data);
        setLoggedIn(true);
      } else {
        setIsError(true);
      }
    }).catch(e => {
      setIsError(true);
    });
  }

  if (isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <Container component="main" maxWidth="xs" >
    <CssBaseline />
    <Header />
    <Card>
      <Form>
        <Input
          type="username"
          value={email}
          onChange={e => {
            setEmail(e.target.value);
          }}
          placeholder="email"
        />
        <Input
          type="password"
          value={password}
          onChange={e => {
            setPassword(e.target.value);
          }}
          placeholder="password"
        />
        <Button onClick={postLogin}>Sign In</Button>
      </Form>
      <Link to="/signup-customer">Don't have an account?</Link>
        { isError &&<Error>The username or password provided were incorrect!</Error> }
    </Card>
    </Container>
  );
}

export default withRoot(LoginCustomer);
