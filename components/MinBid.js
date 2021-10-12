import React, { Component, useEffect, useState } from 'react';
import EnergySale from '../ethereum/energySale';

export default function MinBid({address}) {
    const [minbid, setMinbid] = useState(0)

    useEffect(async () => {
        const energySale = EnergySale(address);

        const minBid = await energySale.methods.minimumContribution().call();

        setMinbid(minBid)
    }, [minbid]);

    return (
        <div>{minbid}</div>
    )
}