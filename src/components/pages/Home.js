import React from 'react';
import api from '../../assets/api-icon.svg';
import safety from '../../assets/safety-icon.svg';
import analytic from '../../assets/analytics-icon.svg';
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

function Home(props) {
  let token = localStorage.getItem("token");
  if(token){
    props.history.push("/dashboard")
  }
  const homeData = [
    {
      icon: safety,
      id: 1,
      test: 'Test your trading strategies before you trade'
    },
    {
      icon: analytic,
      id: 2,
      test: 'Personal portfolio dashboard view'
    },
    {
      icon: api,
      id: 3,
      test: 'Real-time data imported with live API data'
    },
  ]

  return (
    <div className="home">
      <h4 className="welcome-home">Welcome To Our Paper Trading Platform</h4>
      <div className="home-data">
        {homeData.map(x => 
          <div className="home-data-container" key={x.id}>
            <img src={x.icon} alt="api icon"/>
            <h2>{x.test}</h2>
          </div>
        )}
      </div>
      <Link to="/signin">
        <Button size="small" className="try-it-button">
          <h2>
            TRY IT FREE NOW
          </h2>
        </Button>
      </Link>
    </div>
  );
}

export default Home;

