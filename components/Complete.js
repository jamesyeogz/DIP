import React, { Component, useEffect, useState } from 'react';
import EnergySale from '../ethereum/energySale';

export default function Complete({address}) {
    const [status, setStatus] = useState('false')

    useEffect(async () => {
        const energySale = EnergySale(address);

        const Status = await energySale.methods.complete().call();
        
        setStatus(`${Status}`)
    }, [status]);

    return (
        <div>{status}</div>
    )
}