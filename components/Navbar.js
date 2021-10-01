import React, { Component } from "react";
import { Container, Menu } from "semantic-ui-react";
import '../styles/Home.module.css'
import Link from "next/link";
import { Font } from "../styles/Styling";

class Navbar extends Component {
  render() {

    return (
      <div class="ui inverted segment">
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
            <Menu.Item>ENERGYSWAP</Menu.Item>
          </Menu.Menu>
        </Menu>
      </div>
    );
  }
}

export default Navbar;
