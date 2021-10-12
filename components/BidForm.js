import React, { Component } from 'react';
import { Form, Input, Message, Button, Grid } from 'semantic-ui-react'
import EnergySale from '../ethereum/energySale';
import web3 from '../ethereum/web3';

class BidForm extends Component {
    state = {
        value: '',
        loading: false,
        errorMessage: ''
    };

    onSubmit = async event => {
        event.preventDefault();

        const energySale = EnergySale(this.props.address);

        this.setState({ loading: true, errorMessage: '' });

        try {
            const accounts = await web3.eth.getAccounts();
            await energySale.methods.bid().send({
               from: accounts[0],
               value:  this.state.value
            });

            window.location.reload(false);

        } catch (err) {
            this.setState({ errorMessage: err.message });
        }

        this.setState({ loading: false, value: '' });
    };

    render() {
        return (
            <Form onSubmit = {this.onSubmit} error = {!!this.state.errorMessage}>
                <Grid>
                    <Grid.Column width = {12}>
                        <Form.Field>
                            <label> <h4>Amount to Bid</h4> </label>
                            <Input
                                value = {this.state.value}
                                onChange = { event => this.setState({ value: event.target.value })}
                                label = "wei"
                                labelPosition = "right" 
                            />
                        </Form.Field>
                        <Message error header = "Oops!" content = {this.state.errorMessage} />
                    </Grid.Column>
                    <Grid.Column width = {2}>
                        <Button basic color = 'teal' loading = { this.state.loading } >
                            Bid
                        </Button>
                    </Grid.Column>
                </Grid>
            </Form>
        );
    }
};

export default BidForm;