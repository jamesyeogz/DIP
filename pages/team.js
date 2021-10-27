import React, { Component } from "react";
import {
  Font_Footer,
  Team_Header,
  Team_P,
  Team_Content,
} from "../styles/Styling";
import styles from "../styles/Home.module.css";
import {Font} from '../styles/Styling'
import { Container, Button, Card, Image } from "semantic-ui-react";

export default class team extends Component {
    render() {
        return (
            <div >
                <Container style = {{marginBottom: '5%', marginTop: '5%'}}>
                    <Card.Group itemsPerRow = {3}>
                        <Card>
                            <Image src = 'https://ethereum.org/static/ddb9a22d53fdaaae70c0a0d94577f2aa/31987/eth.png' wrapped ui = {false} />
                            <Card.Content>
                                <Card.Header><Font> OUR TEAM </Font></Card.Header>
                                <Card.Description>
                                    <h4>We are a group of Crypto developers providing a secure , reliable and automated energy trading platform for you. </h4>
                                </Card.Description>
                            </Card.Content>
                        </Card>

                        <Card>
                            <Image src = 'https://ethereum.org/static/17d9060291d90c60006b558c4267a5fa/acce7/wallet-cropped.png' wrapped ui = {false} />
                            <Card.Content>
                                <Card.Header><Font> JOIN US </Font></Card.Header>
                                <Card.Description>
                                    <h4> Connect with us on our social media sites to keep up to date with our latest news! </h4>
                                </Card.Description>
                            </Card.Content>
                        </Card>

                        <Card>
                            <Image src = 'https://d33wubrfki0l68.cloudfront.net/33556a68ac5a84d9fcb0c3b8e1c8fbd414ef429d/68d98/static/e7a074a56d991c4f9e65857bafa0f053/ee604/what-is-ethereum.png' wrapped ui = {false} />
                            <Card.Content>
                                <Card.Header><Font> CONTRIBUTE </Font></Card.Header>
                                <Card.Description>
                                    <h4> Connect with us and let us know how we can improve our services to better cater to everyone.  </h4>
                                </Card.Description>
                            </Card.Content>
                        </Card>
                    </Card.Group>
                </Container>
                {/* <Font style = {{color: 'white', fontSize: 60}}>OUR TEAM</Font>
                    <Container>  
                    <Team_P>
                        Provide a secure, reliable and automated energy trading
                    </Team_P>
                    <Team_P>platform</Team_P>
                    <Team_P>
                        Provide a decentralised, open marketplace will allow prosumers
                    </Team_P>
                    <Team_P>to trade excess</Team_P>
                    <Team_P>
                        Utilise blockchain technology to implement peer-to-peer energy
                    </Team_P>
                    <Team_P>
                        trading providing high level of security and ease of
                        transactions
                    </Team_P>
                    </Container> */}
                </div>
        )
    }
}
