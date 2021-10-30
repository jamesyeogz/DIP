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
  Loader,
  Grid,
} from "semantic-ui-react";
import EnergySale from "../ethereum/energySale";
import web3 from "../ethereum/web3";
import { Bidding_Header, Font } from "../styles/Styling";
import styles from "../styles/Home.module.css";
import BidForm from "../components/BidForm";
import EnergySaleDetails from "../components/TradeDetails";
import Complete from "../components/Complete";
import MinBid from "../components/MinBid";
import EnergySold from "../components/EnergySold";
import api from '../components/axios'

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
    items: [],
    isLoaded: true
  };

  onCreate = async (event) => {
    event.preventDefault();

    this.setState({ loading: true, errorMessage: "" });

    try {
      const accounts = await web3.eth.getAccounts();
       const hi =  await factory.methods
        .createEnergySale(this.state.minimumBid, this.state.energy)
        .send({
          from: accounts[0],
        });
      const NewSale = await factory.methods
        .getDeployedEnergySalesAddresses()
        .call();
      const lastElement = NewSale[NewSale.length - 1];
      
      const response = await api.post('/list/', {
        Contract_Address: lastElement,
        Buyer_Address: "None",
        Seller_Address: accounts[0],
        Amount: this.state.energy,
        Completed: false
    })
    console.log(response)
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

  componentDidMount() { 
    const isValid = async (address) => { 
      const status =  await EnergySale(address).methods.complete().call() 
      return !status; 
    } 
    
    const shouldFilter =  Promise.all(this.props.energySales.map(isValid)).then((results) =>  { 
      this.setState({ isLoaded:false }) 
      this.setState({ items: Object.entries(this.props.energySales.filter((value, index) => results[index]))})  
    }) 
  }


  render() {
    return (
      <div>
        <div className={styles.container} style={{ marginTop: "-20px" }}>
          <div
            style={{
              backgroundImage:
                "url(https://strangecomforts.com/wp-content/uploads/2021/02/ethereum-art.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "top",
              width: "100%",
              height: "120%",
            }}
          >
            <Container>
            <Bidding_Header style={{ paddingTop: 110 }}>
              CREATE NEW SALE
            </Bidding_Header>
            </Container>

            <Bidding_Header style = {{marginTop: '3%'}}>
                <Form    
                  size = 'mini'
                  onSubmit={this.onCreate}
                  error={!!this.state.errorMessage}
                >
                  <Form.Field width="5" style = {{textAlign: 'left', marginLeft: '34.5%'}}>
                    <label style = {{ color: 'white', fontSize: 12 }}><Font> MINIMUM BID </Font></label>
                    <Input
                      label="wei"
                      labelPosition="right"
                      value={this.state.minimumBid}
                      onChange={(event) =>
                        this.setState({ minimumBid: event.target.value })
                      }
                    />
                  </Form.Field>
                  <Form.Field width="5" style = {{textAlign: 'left', marginLeft: '34.5%'}}>
                    <label style = {{color: 'white', fontSize: 12}}><Font> ENERGY FOR SALE </Font></label>
                    <Input
                      label="watts"
                      labelPosition="right"
                      value={this.state.energy}
                      onChange={(event) =>
                        this.setState({ energy: event.target.value })
                      }
                    />
                  </Form.Field>
                  <Container>
                  <Message
                    size='medium'
                    error
                    content={this.state.errorMessage}
                  />
                  </Container>
                  <Button
                    size="big"
                    loading={this.state.loading}
                    basic
                    color = 'yellow'
                    inverted
                    style={{ marginTop: "30px"}}
                  >
                    <Font family="Press Start 2P">
                      <p>SUBMIT</p>
                    </Font>
                  </Button>
                </Form>
              
            </Bidding_Header>
          </div>
        </div>
        <div
          styles={{
            height: "auto",          
          }}
        >
          <Container className={styles.container_special}>
            <Font style = {{fontSize: 20, marginLeft: '45%', marginTop: '15%', marginBottom: '5%'}}>
              <p>BIDS</p>
            </Font>
            <Table celled selectable fixed textAlign = 'center' verticalAlign = 'center'>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell width = {2}>ENERGY FOR SALE (WATTS)</Table.HeaderCell>
                  <Table.HeaderCell width = {3}>CURRENT HIGHEST BID (WEI)</Table.HeaderCell>
                  <Table.HeaderCell width = {2}>MINIMUM BID (WEI)</Table.HeaderCell>
                  <Table.HeaderCell width = {6}>BID AMOUNT</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              {this.state.isLoaded ? (<Loader />) : (
              <Table.Body> {this.state.items.map((address) => { 
                console.log(address) 
                return ( 
                <> 
                  <Table.Row key={address[1]}>
                    <Table.Cell>
                      <EnergySold address = {address[1]} />
                    </Table.Cell>
                    <Table.Cell> 
                      <EnergySaleDetails address = {address[1]}/>
                    </Table.Cell>
                    <Table.Cell>
                      <MinBid address = {address[1]}/>
                    </Table.Cell>
                    <Table.Cell style = {{paddingTop: '2%'}} >
                      <BidForm address = {address[1]}/>
                    </Table.Cell>
                  </Table.Row>
                </>)} 
              )}             
              </Table.Body>
              )}
            </Table>
          </Container>
        </div>
      </div>
    );
  }
}

export default EnergySaleIndex;
