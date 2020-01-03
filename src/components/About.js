import React from 'react';
import graphic from '../assets/about-graphic.svg';
import { Header } from 'semantic-ui-react'

function About() {
  return (
    <div className="about-container">
      <div>
        <Header as='h2'>ABOUT</Header>
        <img src={graphic} alt="graph illustration" />
      </div>
      <div className="right-content">
        <h3>Test your trading strategies before you trade</h3>
        <p>PaprTradr is a paper stock trading app. Get updates on constantly updates your portfolio based on market fluctuations via API calls.</p>
        <p>Our simulated trading account allows you to test your strategies in real-time – without risking your capital.</p>
      </div>
    </div>
  )
}
export default About;