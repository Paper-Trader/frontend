import React from "react";
import graphic from "../assets/about-graphic.svg";
import {
  Header,
  Image,
  Segment,
  Grid,
  GridColumn,
  List
} from "semantic-ui-react";

function Team() {
  return (
    <Segment vertical className="about-container">
      <Grid container stackable verticalAlign="middle" divided="vertically">
        <Grid.Row width={16}>
          <Header as="h2">MEET THE TEAM</Header>
        </Grid.Row>

        <Grid.Row columns={4}>
          <Grid.Column width={4}>
            <Image src="" alt="" />
            <Header as="h4">Kristin Barr</Header>
            <Header as="h6" color="grey">
              Software Developer
            </Header>
            <List.Item as="a" href="https://github.com/kristinbarr">
              <List.Icon name="github" size="big" />
            </List.Item>
            <List.Item as="a" href="https://www.linkedin.com/in/kristinbarr/">
              <List.Icon name="linkedin" size="big" />
            </List.Item>
          </Grid.Column>

          <Grid.Column width={4}>
            <Image src="" alt="" />
            <Header as="h4">Arthur Pisakhov</Header>
            <Header as="h6" color="grey">
              Software Developer
            </Header>
            <List.Item as="a" href="https://github.com/">
              <List.Icon name="github" size="big" />
            </List.Item>
            <List.Item as="a" href="https://www.linkedin.com/in/">
              <List.Icon name="linkedin" size="big" />
            </List.Item>
          </Grid.Column>

          <Grid.Column width={4}>
            <Image src="" alt="" />
            <Header as="h4">Adetunji Shennaike</Header>
            <Header as="h6" color="grey">
              Software Developer
            </Header>
            <List.Item as="a" href="https://github.com/">
              <List.Icon name="github" size="big" />
            </List.Item>
            <List.Item as="a" href="https://www.linkedin.com/in/">
              <List.Icon name="linkedin" size="big" />
            </List.Item>
          </Grid.Column>

          <Grid.Column width={4}>
            <Image src="" alt="" />
            <Header as="h4">Ronny Alvarado</Header>
            <Header as="h6" color="grey">
              Software Developer
            </Header>
            <List.Item as="a" href="https://github.com/">
              <List.Icon name="github" size="big" />
            </List.Item>
            <List.Item as="a" href="https://www.linkedin.com/in/">
              <List.Icon name="linkedin" size="big" />
            </List.Item>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
}
export default Team;
