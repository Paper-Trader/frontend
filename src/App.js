import React from 'react';
import { Route } from 'react-router-dom';
import Home from './components/Home';
import HomeUser from './components/HomeUser';
// import Dashboard from './components/Dashboard';
import Nav from './components/Nav';
import About from './components/About';
import Team from './components/Team';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import WatchList from './components/WatchList';
import Stock from './components/Stock';

function App() {
  return (
    <div className="App">
      <Route path="/" render={props => <Nav {...props} />} />
      <Route exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
      <Route exact path="/team" component={Team} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/signin" component={SignIn} />
      {/* <PrivateRoute path='/' component={sideNav} /> */}
      <Route exact path="/dashboard" component={HomeUser} />
      <Route exact path="/watchlist" component={WatchList} />
      <Route exact path="/stock/" component={Stock} />
    </div>
  );
}

export default App;
