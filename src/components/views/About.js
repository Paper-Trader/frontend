import React from "react";
import graphic from "../../assets/about-graphic.svg";
import { Header, Image, Segment, Grid } from "semantic-ui-react";

function About() {
  return (
    <Segment vertical className="about-container">
      <Grid container stackable verticalAlign="middle" divided="vertically">
        <Grid.Row width={16}>
          <Header as="h2">ABOUT</Header>
        </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column width={8}>
            <Image src={graphic} alt="graph illustration" />
          </Grid.Column>
          <Grid.Column width={8} className="right-content">
            <Header as="h2">
              Test your trading strategies before you trade
            </Header>
            <p>
              PaprTradr is a paper stock trading app. Get updates on constantly
              updates your portfolio based on market fluctuations via API calls.
            </p>
            <p>
              Our simulated trading account allows you to test your strategies
              in real-time – without risking your capital.
            </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
}
export default About;
