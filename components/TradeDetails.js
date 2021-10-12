import React, { Component } from 'react';
import { Grid, Card } from 'semantic-ui-react';
import EnergySale from '../ethereum/energySale';

class EnergySaleDetails extends Component {
    constructor(props) {
        super(props);
        this.address = this.props.address
    }

    static async getInitialProps(props) {
        const energySale = EnergySale(this.address);

        const highestBid = await energySale.methods.highestBid().call();
        console.log(highestBid)
        return { highestBid };
    }

    render() {
        return (
            <div> {this.props.highestBid} </div>
        );
    }
}

export default EnergySaleDetails;