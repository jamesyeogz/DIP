import React, { Component, useEffect, useState } from 'react';
import EnergySale from '../ethereum/energySale';

export default function SellerAddress({address}) {
    const [selleraddress, setSelleraddress] = useState(0)

    useEffect(async () => {
        const energySale = EnergySale(address);

        const sellerAddress = await energySale.methods.seller().call();

        setSelleraddress(sellerAddress)
    }, [selleraddress]);

    return (
        <div>{selleraddress}</div>
    )
}