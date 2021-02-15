import React from 'react';
import { Route } from 'react-router-dom';
import Home from './components/pages/Home';
import HomeUser from './components/pages/HomeUser';
import Nav from './components/nav/Nav';
import About from './components/views/About';
import Team from './components/views/Team';
import SignUp from './components/login_register/SignUp';
import SignIn from './components/login_register/SignIn';
import WatchList from './components/pages/WatchList';
import Stock from './components/views/Stock';
import Messages from './components/Messages';
import PrivateRoute from './components/utils/PrivateRoute';
import Browse from './components/pages/Browse';

function App() {
    //Removing token when user unloads the page via refresh
    window.onbeforeunload = function () {
      localStorage.clear();
    };
  return (
    <div className="App">
      <Route path="/" component={Nav} />
      <Route exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
      <Route exact path="/team" component={Team} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/signin" component={SignIn} />
      <PrivateRoute exact path="/dashboard" component={HomeUser} />
      <PrivateRoute exact path="/browse" component={Browse} />
      <PrivateRoute exact path="/watchlist" component={WatchList} />
      <PrivateRoute exact path="/stock/:id" component={Stock} />
      <Messages />
    </div>
  );
}

export default App;
