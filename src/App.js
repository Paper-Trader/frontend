import React from 'react';
import { Route } from 'react-router-dom';
import Home from './components/pages/Home';
import HomeUser from './components/pages/HomeUser';
// import Dashboard from './components/Dashboard';
import Nav from './components/nav/Nav';
import About from './components/views/About';
import Team from './components/views/Team';
import SignUp from './components/login_register/SignUp';
import SignIn from './components/login_register/SignIn';
import WatchList from './components/watchlist/WatchList';
import Stock from './components/views/Stock';
import BuyStock from './components/views/Buy';
import Messages from './components/Messages';

function App() {
  return (
    <div className="App">
      <Route path="/" render={props => <Nav {...props} />} />
      <Route exact path="/" component={Home} />
      <Route exact path='/buy' component={BuyStock} />
      <Route exact path="/about" component={About} />
      <Route exact path="/team" component={Team} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/signin" component={SignIn} />
      {/* <PrivateRoute path='/' component={sideNav} /> */}
      <Route exact path="/dashboard" component={HomeUser} />
      <Route exact path="/watchlist" component={WatchList} />
      <Route exact path="/stock/" component={Stock} />
      <Messages />
    </div>
  );
}

export default App;
