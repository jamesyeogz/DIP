import React, { Component } from 'react';
import { Form, Input, Message, Button, Grid } from 'semantic-ui-react'
import EnergySale from '../ethereum/energySale';
import web3 from '../ethereum/web3';

class SellForm extends Component {
    state = {
        loading: false,
        errorMessage: ''
    };


    onClick = async event => {
        event.preventDefault();

        const energySale = EnergySale(this.props.address);

        this.setState({ loading: true, errorMessage: '' });

        try {
            const accounts = await web3.eth.getAccounts();
            await energySale.methods.sell().send({
               from: accounts[0],
            });

            window.location.reload(false);
            
        } catch (err) {
            this.setState({ errorMessage: err.message });
        }

        this.setState({ loading: false });
    };

    render() {
        return (
            <div>
                <Button basic color = 'red' loading = { this.state.loading } onClick = {this.onClick}>
                    Sell
                </Button>
            </div>
        );
    }
}

export default SellForm;