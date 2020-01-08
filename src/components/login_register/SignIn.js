import React, { useState } from 'react';
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment
} from "semantic-ui-react";
import paper from "../../assets/paper-icon.svg";
import { axiosWithAuth } from '../utils/axiosAuth';


function SignIn(props) {
  const initialState = {
    credentials: {
      username: '',
      password: '',
    }
  }

  const [loginData, setLoginData] = useState(initialState)

  const handleChange = e => {
    setLoginData({
      credentials: {
        ...loginData.credentials,
        [e.target.name]: e.target.value
      }
    });
    console.log(loginData)
  };

  const login = e => {
    e.preventDefault();
    axiosWithAuth()
      .post('/auth/login', loginData.credentials)
      .then(res => {
        console.log(res)
        localStorage.setItem('token', res.data.payload);
        props.history.push('/dashboard')
      })
      .catch(err => console.log(err));
  };

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          <Image src={paper} /> Log-in to your account
        </Header>
        <Form size="large" onSubmit={login}>
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
              name="username"
              iconPosition="left"
              value={loginData.credentials.username}
              onChange={handleChange}
              placeholder="Username"
              type="text"
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              name="password"
              value={loginData.credentials.password}
              onChange={handleChange}
              placeholder="Password"
              type="password"
            />

            <Button color="teal" fluid size="large">
              Login
            </Button>
          </Segment>
        </Form>
        <Message>
          New to us? <a href="/signup">Sign Up</a>
        </Message>
      </Grid.Column>
    </Grid>
  );
}

export default SignIn;
