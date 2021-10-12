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
import { Bidding_Header, Font } from "../styles/Styling";
import styles from "../styles/Home.module.css";
import BidForm from "../components/BidForm";
import EnergySaleDetails from "../components/TradeDetails";

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

      window.location.reload(false);

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

    // The code for Energy Should be here but How to know if the contract has been filled

    
  };


  renderEnergySales() {
    const items = this.props.energySales.map((address) => {
      
      return (
        <Table.Row key={address}>
          <Table.Cell> 
            <EnergySaleDetails address = {address}/>
          </Table.Cell>
          <Table.Cell>
            <BidForm address = {address}/>
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
            <Bidding_Header style={{ paddingTop: 50 }}>
              CREATE NEW SALE
            </Bidding_Header>

            <Container className={styles.container_special}>
              <div styles={styles.testing}>
                <Form
                  onSubmit={this.onCreate}
                  error={!!this.state.errorMessage}
                >
                  <Form.Field width="7">
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
                  <Form.Field width="7">
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
            <Font style = {{fontSize: 20, marginLeft: '41%', marginTop: '-3%', marginBottom: '5%'}}>
              <p>OPEN BIDS</p>
            </Font>
            <Table celled selectable fixed>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>ADDRESS</Table.HeaderCell>
                  <Table.HeaderCell>BID</Table.HeaderCell>
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
