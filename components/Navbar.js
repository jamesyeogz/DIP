/* eslint no-use-before-define: 0 */
import React, { Component, useEffect,useState } from "react";
import { Container, Menu } from "semantic-ui-react";
import '../styles/Home.module.css'
import Link from "next/link";
import { Font, LogoFont } from "../styles/Styling";
import Microgrid from "./Modal";
import Energy from './Energy'
import web3 from "../ethereum/web3";


function Navbar() {
  const [blockchain, setBlockchain] = useState("");
  const [amount, setAmount] = useState(0);
  const [status, setStatus] = useState("Not Connected");
  const data ={}
  // useEffect(async () => {
  //   const accounts = await web3.eth.getAccounts();
  //   setBlockchain(accounts);
  //   const res = await fetch("http://127.0.0.1:5000/check");
  //   const data = await res.json();
  //   if (data != "No Connection Available") {
  //     try {
  //       const data1 = data.filter(
  //         (a) => a.blockchain == blockchain && a.status == "Verified"
  //       );
        //  console.log(data1[0].blockchain);
  //       if (data1[0].blockchain == blockchain) {
  //         setAmount(data1[0].Energy);
  //         setStatus(data1[0].status)
            
  //       }
  //     } catch (error) {}
  //   }
  // }, [data]);
 
    return (
      
      <div className="ui inverted segment">
        <Menu inverted pointing secondary>
          <Link href="/">
            <Menu.Item name="home">
               <Font style = {{marginLeft: '20%'}}>HOME</Font>
            </Menu.Item>
          </Link>
          <Link href="/trades" >
            <Menu.Item>
              <Font style = {{marginLeft: '20%'}}>TRADES</Font>
            </Menu.Item>
          </Link>
 
          <Link href="/team">
            <Menu.Item>
              <Font style = {{marginLeft: '25%'}}>TEAM</Font>
            </Menu.Item>
          </Link>

          <Menu.Menu position="right" >
            <Menu.Item style = {{marginLeft: '-10%'}}><Energy amount={amount} /></Menu.Item>
            <Menu.Item style = {{marginLeft: '5%'}}><Microgrid data={data} status={status} setStatus={setStatus}/></Menu.Item>
          </Menu.Menu>
        </Menu>
      </div>
    );
  }


export default Navbar;
