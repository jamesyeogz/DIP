import React, { Component } from 'react';
import {Font_Footer, Team_Header, Team_P, Team_Content} from '../styles/Styling'
import styles from '../styles/Home.module.css'
import { Container } from 'semantic-ui-react';

class Footer extends Component {
    render() {
        return(
            <div className={styles.container}>
            <div style = {{
                height:'100%',
                width:'100%',
                backgroundImage: 'url(https://aymericdamour.files.wordpress.com/2021/03/156992.png)', 
                backgroundSize: 'cover', 
                backgroundPosition: 'center', 
            }}>
              
                <Font_Footer>
                    <Team_Header>
                        OUR TEAM
                    </Team_Header>
                    <Container className={styles.Team_Content}>
                    <Team_P>
                     Provide a secure, reliable and automated energy trading 
                    </Team_P>
                     <Team_P>
                     platform
                      </Team_P>
                    <Team_P>
                    Provide a decentralised, open marketplace will allow prosumers
                    </Team_P>
                     <Team_P>
                    to trade excess
                    </Team_P>
                    <Team_P>
                    Utilise blockchain technology to implement peer-to-peer energy
                    </Team_P>
                    <Team_P>
                    trading providing high level of security and ease of transactions
                    </Team_P>
                    </Container>
                </Font_Footer>
               
            </div>
            </div>
        )
    }
}

export default Footer;