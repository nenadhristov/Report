import React from 'react';
import { Button, Container, Row, Col, Alert, Table, Navbar, Nav, NavDropdown, Carousel } from 'react-bootstrap';
class forbidden extends React.Component{


    render(){
        
        return (<div>
             <style type="text/css">
            {`.navbar {display: none}`}
            </style>
            <Row className="justify-content-center mt-5">  
            <h2>403-</h2>
            <h2>Not this time, access forbidden!</h2>
            </Row>
        </div>)
    }

}

export default forbidden;