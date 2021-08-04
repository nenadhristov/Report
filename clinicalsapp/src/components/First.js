import axios from 'axios';
import React from 'react';
import { Button, Container, Row, Col, Alert, Table, Navbar, Nav, NavDropdown, Carousel, Card, } from 'react-bootstrap';
import clinicimg from '../assets/iamges/clinic.jpg'
import '../css/First.css'
import twitter from '../assets/iamges/twitter.png'
import facebook from '../assets/iamges/facebook-logo-2019.png'
import instagram from '../assets/iamges/instagram.png'
import slika from '../assets/iamges/403501.jpg'
import { Link } from "react-router-dom";
class First extends React.Component{

    
    render(){
        function handleScroll() {
            window.scroll({
              top: document.body.offsetHeight,
              left: 0, 
              behavior: 'smooth',
            });
          }
        return(
            <div class="za-pocetna">
            <Container fluid>
                <Row className="justify-content-md-center mt-5">
                
                <div id="krug"></div>
                <div id="za-text3">
                Neno's
                </div>   
                <div id="krug1"></div> 
                </Row>
                <Row className="justify-content-md-center">
                <div id="za-text4">
                    Clinic
                </div>
                </Row>
                <Row className="justify-content-md-center">
                <Link to="#">
                <Button variant="outline-light" size="lg" id="btn" onClick={handleScroll}>
                    About Us
                </Button>
                </Link>
                </Row>   
            </Container>
                
                <div class="First-page-bottom-section">
                    <div class="section">
                        <Row className="justify-content-md-center">
                        <h1 class="naslov">Are you a doctor and would like to discuss? Contact us here:</h1>
                        <h5 class="naslov1">nenos.clinic@gmail.com</h5>
                        </Row>
                        <hr class="linija"></hr>
                        <Row>
                        <h3 id="first-row">Neno's Clinic</h3>
                        <h3 id="services">Services</h3>
                        <h3 id="socials">Socials</h3>
                        </Row>

                        <Row>
                        <h5 id="first-row-2">Copyright © 2021 Neno's Clinic</h5>
                        <h5 id="second-row-1">Add Patients</h5>
                        <a href="https://www.twitter.com/" target="_blank" id="link-twitter-logo">
                        <img src={twitter} id="twitterlogo"></img>
                        </a>
                        </Row>

                        <Row>
                        <h5 id="second-row-2">Analyze Data</h5>
                        <a href="https://www.facebook.com/" target="_blank" id="link-facebook-logo">
                        <img src={facebook} id="facebooklogo"></img>
                        </a>
                        </Row>

                        <Row>
                        <h5 id="second-row-3">Add Data</h5>
                        <a href="https://www.instagram.com/" target="_blank" id="link-instagram-logo">
                        <img src={instagram} id="instagramlogo"></img>
                        </a>
                        </Row>

                        <Row>
                        <h5 id="second-row-4">Delete Patient</h5>
                        </Row>

                    </div>
                </div>
               
            </div>
        )
        
    }
}

export default First;