import React, { Component } from "react";
import { Form, Input, Message, Button, Grid } from "semantic-ui-react";
import EnergySale from "../ethereum/energySale";
import web3 from "../ethereum/web3";
import api from './axios'

class SellForm extends Component {
  state = {
    loading: false,
    errorMessage: "",
    seller_blockchain: "",
    sender_blockchain: "",
  };

  onClick = async (event) => {
    event.preventDefault();
    try {
    const energySale = EnergySale(this.props.address);
    const seller = await energySale.methods.seller().call();
    const energySold = await energySale.methods.energySold().call();
    const highestBidderAddress = await energySale.methods
      .highestBidderAddress()
      .call();
    this.setState({
      Amount: energySold,
      loading: true,
      errorMessage: "",
      sender_blockchain: highestBidderAddress,
      seller_blockchain: seller
    });
    const accounts = await web3.eth.getAccounts();
    await energySale.methods.sell().send({
       from: accounts[0],
    });

      
      const response = await api.post('fulfill', {Contract_Address: this.props.address})
      console.log(response)
      window.location.reload(false);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false });
  };

  render() {
    return (
      <div>
        <Button
          basic
          color="red"
          loading={this.state.loading}
          onClick={this.onClick}
        >
          Sell
        </Button>
      </div>
    );
  }
}

export default SellForm;
