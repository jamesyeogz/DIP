import React, { Component } from "react";
import { Container, Button } from "semantic-ui-react";

class Footer extends Component {
  render() {
    return (
      <Container>
        <div>
          <Button circular color='facebook' icon='facebook' />
          <Button circular color='twitter' icon='twitter' />
          <Button circular color='linkedin' icon='linkedin' />
          <Button circular color='google plus' icon='google plus' />
        </div>
        <h1></h1>
      </Container>
    );
  }
}

export default Footer;
