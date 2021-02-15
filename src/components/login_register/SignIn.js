import React, { useState } from 'react';
import Loader from 'react-loader-spinner';
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
import "./login.css"

function SignIn(props) {
  const initialState = {
    credentials: {
      username: '',
      password: ''
    }

  }

  const [loginData, setLoginData] = useState(initialState)
  const [isLoading,setLoading] = useState(false)
  const handleChange = e => {
    setLoginData({
      credentials: {
        ...loginData.credentials,
        [e.target.name]: e.target.value
      }
    });
  };

  const login = e => {
    e.preventDefault();
    setLoading(true)
    axiosWithAuth()
      .post('/auth/login', loginData.credentials)
      .then(res => {
        localStorage.setItem('token', res.data.authToken);
        props.history.push('/dashboard')
        setLoading(false)
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
              {isLoading ? <div className="loadingButtonStyle"><p>Loading</p><Loader type="ThreeDots" color="#FFF" height={10} width={100} /></div> : <p>Login</p>}
            </Button>
          </Segment>
        </Form>
        <Message>
          First Time User? <a href="/signup">Sign Up</a>
        </Message>
      </Grid.Column>
    </Grid>
  );
}

export default SignIn;
