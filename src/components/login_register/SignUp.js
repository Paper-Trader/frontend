import React, { useState } from "react";
import { 
  Button, 
  Form, 
  Grid, 
  Header, 
  Image, 
  Segment,
  Input
} from "semantic-ui-react";
import paper from "../../assets/paper-icon.svg";
import { axiosWithAuth } from '../utils/axiosAuth';

function SignUp(props) {
  const initialState = {
    credentials: {
      email: '',
      firstName: '',
      lastName: '',
      username: '',
      password: ''
    }
  }

  const [registerData, setRegisterData] = useState(initialState)

  const handleChange = e => {
    console.log(e.target.name, e.target.value)
    setRegisterData({
      credentials: {
        ...registerData.credentials,
        [e.target.name]: e.target.value
      }
    });
  };

  const register = e => {
    e.preventDefault();
    axiosWithAuth()
      .post('/auth/register', registerData.credentials)
      .then(res => {
        console.log(res)
        localStorage.setItem('token', res.data.authToken);
        props.history.push('/dashboard')
      })
      .catch(err => console.log(err));
  };

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          <Image src={paper} /> Sign up for an account
        </Header>
        <Form size="large" onSubmit={register}>
          <Segment stacked>
            <Form.Input
              fluid
              icon="mail"
              iconPosition="left"
              placeholder="E-mail address"
              value={registerData.credentials.email}
              onChange={handleChange}
              name="email"
              control={Input}
              id='form-input-control-error-email'
              error={{
                content: 'Please enter a valid email address',
                pointing: 'below',
              }}
            />
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="Username"
              value={registerData.credentials.username}
              onChange={handleChange}
              name="username"
            />
            <Form.Input
              fluid
              icon="user circle"
              iconPosition="left"
              placeholder="First Name"
              value={registerData.credentials.firstName}
              onChange={handleChange}
              name="firstName"
            />
            <Form.Input
              fluid
              icon="user circle"
              iconPosition="left"
              placeholder="Last Name"
              value={registerData.credentials.lastName}
              onChange={handleChange}
              name="lastName"
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              value={registerData.credentials.password}
              onChange={handleChange}
              name="password"
            />
            <Button color="teal" fluid size="large">
              Sign Up
            </Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  );
}

export default SignUp;
