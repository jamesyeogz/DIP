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
            <div>
                <Container style = {{marginBottom: '5%', marginTop: '5%'}}>
                    <Card.Group itemsPerRow = {3}>
                        <Card>
                            <Image src = 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/0e738c17-7f3c-422e-8225-f8c782b08626/d8544m9-7c6aa0c6-8aed-4f72-8950-bf60ae1a7786.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzBlNzM4YzE3LTdmM2MtNDIyZS04MjI1LWY4Yzc4MmIwODYyNlwvZDg1NDRtOS03YzZhYTBjNi04YWVkLTRmNzItODk1MC1iZjYwYWUxYTc3ODYucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.g6LFfBBHyzrclKRvX-UFHnjVhaa1ZQW_Vp5VD6i62k0' wrapped ui = {false} />
                            <Card.Content textAlign = 'center'>
                                <Card.Header><Font> OUR TEAM </Font></Card.Header>
                                <Card.Description>
                                    <h4>We are a group of Crypto developers providing a secure , reliable and automated energy trading platform for you. You can now trade energy with ease and rely on the blockchain technology to increase security of transactions. </h4>
                                </Card.Description>
                            </Card.Content>
                        </Card>

                        <Card>
                            <Image src = 'https://image.freepik.com/vetores-gratis/pacote-de-pixelated-redes-sociais-icones_23-2147572515.jpg' wrapped ui = {false} />
                            <Card.Content textAlign = 'center'>
                                <Card.Header><Font> JOIN US TODAY </Font></Card.Header>
                                <Card.Description>
                                    <h4> Connect with us on our social media sites to keep up to date with our latest news! </h4>
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
