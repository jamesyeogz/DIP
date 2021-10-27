import React, { Component, useEffect, useState } from 'react';
import EnergySale from '../ethereum/energySale';
import api from './axios'
export default function EnergySold({address}) {
    const [energysold, setEnergysold] = useState(0)

    useEffect(async () => {
        const energySale = EnergySale(address);
        const energySold = await energySale.methods.energySold().call();
        setEnergysold(energySold)
    }, [energysold]);

    return (
        <div>{energysold}</div>
    )
}