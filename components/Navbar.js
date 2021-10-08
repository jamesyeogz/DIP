/* eslint no-use-before-define: 0 */
import React, { Component, useEffect,useState } from "react";
import { Container, Menu } from "semantic-ui-react";
import '../styles/Home.module.css'
import Link from "next/link";
import { Font } from "../styles/Styling";
import Microgrid from "./Modal";
import Energy from './Energy'
import web3 from "../ethereum/web3";

//try 


function Navbar() {
  const [blockchain, setBlockchain] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("Not Connected");
  const data ={}
  useEffect(async () => {
    const accounts = await web3.eth.getAccounts();
    setBlockchain(accounts);
    const res = await fetch("http://127.0.0.1:5000/check");
    const data = await res.json();
    if (data != "No Connection Available") {
      try {
        const data1 = data.filter(
          (a) => a.blockchain == blockchain && a.status == "Verified"
        );
        //  console.log(data1[0].blockchain);
        if (data1[0].blockchain == blockchain) {
          setAmount(data1[0].Energy);
          setStatus(data1[0].status)
            
        }
      } catch (error) {}
    }
  }, [data]);
 
    return (
      
      <div className="ui inverted segment">
        <Menu inverted pointing secondary>
          <Link href="/">
            <Menu.Item name="home">
               <Font>HOME</Font>
            </Menu.Item>
          </Link>
          <Link href="/trades" >
            <Menu.Item>
              <Font>TRADES</Font>
            </Menu.Item>
          </Link>

          <Link href="/team">
            <Menu.Item>
              <Font>OUR TEAM</Font>
            </Menu.Item>
          </Link>

          <Menu.Menu position="right">
            <Menu.Item><Energy amount={amount} /></Menu.Item>
            <Menu.Item><Microgrid data={data} status={status} setStatus={setStatus}/></Menu.Item>
            <Menu.Item>ENERGYSWAP</Menu.Item>
          </Menu.Menu>
        </Menu>
      </div>
    );
  }


export default Navbar;
