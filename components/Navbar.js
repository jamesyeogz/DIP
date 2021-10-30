/* eslint no-use-before-define: 0 */
import React, { Component, useEffect,useState } from "react";
import { Container, Menu } from "semantic-ui-react";
import '../styles/Home.module.css'
import Link from "next/link";
import { Font, LogoFont } from "../styles/Styling";
import Microgrid from "./Modal";
import Energy from './Energy'
import web3 from "../ethereum/web3";
import api from './axios'



function Navbar() {
  const [blockchain, setBlockchain] = useState("");
  const [amount, setAmount] = useState(0);
  const [status, setStatus] = useState("Not Connected");
  useEffect(async() =>{
    const accounts = await web3.eth.getAccounts();
    setBlockchain(accounts[0])
    const response = await api.post('/Mname', { Address: accounts[0] })
    console.log(response.data)
    const data = response.data
    if ( data == "No Connections"){
      console.log(data)
    }
    else if (data == "Fail At Connecting to Server"){
      setStatus(data)
    }
    else{
      setAmount(data)
      setStatus("Verified")
    }
    
    
    
  },[amount])
 
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
            <Menu.Item style = {{marginLeft: '5%'}}><Microgrid blockchain={blockchain} status={status}/></Menu.Item>
          </Menu.Menu>
        </Menu>
      </div>
    );
  }


export default Navbar;
