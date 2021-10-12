import React, { Component, useEffect, useState } from 'react';
import EnergySale from '../ethereum/energySale';

export default function EnergySaleDetails({address}) {
    const [highestbid, setHighestbid] = useState(0)

    useEffect(async () => {
        const energySale = EnergySale(address);

        const highestBid = await energySale.methods.highestBid().call();

        setHighestbid(highestBid)
    }, [highestbid]);

    return (
        <div>{highestbid}</div>
    )
}

