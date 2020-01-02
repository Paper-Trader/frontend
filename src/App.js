import React from 'react';
import { Route } from 'react-router-dom';
// import Home from './components/Home';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Nav from './components/Nav';
import About from './components/About';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className="App">
      <Route path ='/' component={Nav} />
      <Route exact path='/' component={Dashboard} />
      <Route exact path='/about' component={About} />
      <Route exact path='/signup' component={SignUp} />
      <Route exact path='/signin' component={SignIn} />
    </div>
  );
}

export default App;
