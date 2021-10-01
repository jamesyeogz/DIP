import React, { Component } from "react";
import factory from "../ethereum/factory";
import "semantic-ui-css/semantic.min.css";
import {
  Button,
  Form,
  Input,
  Message,
  Container,
  Table,
  Grid,
} from "semantic-ui-react";
import EnergySale from "../ethereum/energySale";
import web3 from "../ethereum/web3";
import { Router } from "next/router";
import { Bidding_Header, Font } from "../styles/Styling";
import styles from "../styles/Home.module.css";

class EnergySaleIndex extends Component {
  static async getInitialProps() {
    const energySales = await factory.methods
      .getDeployedEnergySalesAddresses()
      .call();

    return { energySales };
  }

  state = {
    address: "",
    value: "",
    minimumBid: "",
    energy: "",
    errorMessage: "",
    loading: false,
  };

  onCreate = async (event) => {
    event.preventDefault();

    this.setState({ loading: true, errorMessage: "" });

    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods
        .createEnergySale(this.state.minimumBid, this.state.energy)
        .send({
          from: accounts[0],
        });

    Router.pushRoute("/trades");
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false });
  };

  onSubmit = async (event) => {
    const address = this.state.address;

    event.preventDefault();

    const energySale = EnergySale(address);

    try {
      const accounts = await web3.eth.getAccounts();
      await energySale.methods.bid().send({
        from: accounts[0],
        value: this.state.value,
      });
    } catch (err) {}
  };

  renderEnergySales() {
    const items = this.props.energySales.map((address) => {
      return (
        <Table.Row>
          <Table.Cell>{address}</Table.Cell>
          <Table.Cell>
            <Form
              onSubmit={() => {
                this.setState({ address: address });
                this.onSubmit;
                console.log(this.state.address);
                console.log(this.state.value);
              }}
            >
              <Grid>
                <Grid.Column width={8}>
                  <Form.Field>
                    <input
                      placeholder="wei"
                      onChange={(event) =>
                        this.setState({ value: event.target.value })
                      }
                    />
                  </Form.Field>
                </Grid.Column>
                <Grid.Column width={2}>
                    
                  <Button > <Font>Bid </Font></Button>
                </Grid.Column>
              </Grid>
            </Form>
          </Table.Cell>
        </Table.Row>
      );
    });
    return <>{items}</>;
  }

  render() {
    return (
      <div>
        <div className={styles.container} style={{ marginTop: "-20px" }}>
          <div
            style={{
              backgroundImage:
                "url(https://www.wallpapertip.com/wmimgs/206-2066455_ghosts-blackhawk-tactical-pac-man-simple-black-background.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "bottom",
              width: "100%",
              height: "100%",
            }}
          >
            <Bidding_Header style={{ paddingTop: 40 }}>
              CREATE NEW SALE
            </Bidding_Header>

            <Container className={styles.container_special}>
              <div styles={styles.testing}>
                <Form
                  onSubmit={this.onCreate}
                  error={!!this.state.errorMessage}
                >
                  <Form.Field width="8">
                    <label>Minimum Bid</label>
                    <Input
                      label="wei"
                      labelPosition="right"
                      value={this.state.minimumBid}
                      onChange={(event) =>
                        this.setState({ minimumBid: event.target.value })
                      }
                    />
                  </Form.Field>
                  <Form.Field width="8">
                    <label>Amount of energy to be sold</label>
                    <Input
                      label="watts"
                      labelPosition="right"
                      value={this.state.energy}
                      onChange={(event) =>
                        this.setState({ energy: event.target.value })
                      }
                    />
                  </Form.Field>

                  <Message
                    error
                    header="Oops!"
                    content={this.state.errorMessage}
                  />
                  <Button
                    size="big"
                    loading={this.state.loading}
                    basic
                    inverted
                    style={{ marginTop: "20px" }}
                  >
                    <Font family="Press Start 2P">
                      <p>SUBMIT</p>
                    </Font>
                  </Button>
                </Form>
              </div>
            </Container>
          </div>
        </div>
        <div
          styles={{
            height: "auto",          
          }}
        >
          <Container className={styles.container_special}>
            <Font>
              <p>OPEN BIDS</p>
            </Font>
            <Table celled selectable fixed>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Address</Table.HeaderCell>
                  <Table.HeaderCell>Bid?</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>{this.renderEnergySales()}</Table.Body>
            </Table>
          </Container>
        </div>
      </div>
    );
  }
}

export default EnergySaleIndex;
