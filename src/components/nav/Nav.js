import React from "react";
import { Link } from "react-router-dom";
import { Button, Image } from "semantic-ui-react";
import logo from "../../assets/logo.svg";

function Nav() {

  const isAuthenticated = localStorage.getItem('token');

  const onLogout = () => {
    localStorage.removeItem('token')
  }

  return (
    <div className="navbar">
      <div className="nav-left">
        <Link to="/" className="logo">
          <Image src={logo} alt="logo" />
        </Link>
        <Link to="/about" className="nav-left-link">
          ABOUT
        </Link>
        <Link to="/team" className="nav-left-link">
          TEAM
        </Link>
      </div>
      <div className="nav-right">
        {
          isAuthenticated 
            ? <Link to="/">
                <Button size="small" className="signin-button" onClick={onLogout}>
                  SIGN OUT
                </Button>
              </Link>
            : <div>
                <Link to="/signin">  
                  <Button size="small" className="signin-button">
                    SIGN IN
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="small" className="signup-button">
                    SIGN UP
                  </Button>
                </Link>
              </div>
        }
      </div>
    </div>
  );
}

export default Nav;
