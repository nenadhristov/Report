import React from 'react';
import axios from 'axios';
import {generatePath, Link} from 'react-router-dom';
import { Button, Container, Row, Col, Alert, Table, Navbar, Nav, NavDropdown, Carousel } from 'react-bootstrap';
import '../css/AnalyzeData.css'
import authHeader from '../services/auth-header';
import { withRouter } from "react-router-dom";
class AnalyzeData extends React.Component{
    state={
        clinicalData:[]
    }
    componentDidMount(){

        var id = parseInt(this.props.location.state)
        
        axios.get("http://localhost:9090/clinicalservices/api/patients/analyze/"+id, { headers: authHeader() }).then(res=>{
            
            this.setState(res.data);
        })

    }
    render(){
        
        return (<div class="AnalyzeData-component">
            <Container fluid>
                <Row className="justify-content-center mt-4">  
                <Col md="auto" xs="auto" sm="auto" lg="auto" xl="auto" xxl="auto"><h2 class="mt-3">Patient Details:</h2></Col>
                </Row>
            </Container>

            <div class="container mt-5">
                <div class="row justify-content-center">
                    <div class="col-4">
                        <ul class="list-group list-group-flush bg-transparent">
                        <li class="list-group-item bg-transparent">First Name:</li>
                        <li class="list-group-item bg-transparent">Last Name:</li>
                        <li class="list-group-item bg-transparent">Age:</li>
                        <hr/>
                        </ul>
                    </div>
                    <div class="col-4">
                        <ul class="list-group list-group-flush bg-transparent">
                            <li class="list-group-item bg-transparent ">{this.state.firstName}</li>
                            <li class="list-group-item bg-transparent ">{this.state.lastName}</li>
                            <li class="list-group-item bg-transparent ">{this.state.age}</li>
                            <hr/>
                            </ul>
                    </div>

                
                </div>
            </div>

            <Container fluid>
                <Row className="justify-content-center mt-4">  
                <Col md="auto" xs="auto" sm="auto" lg="auto" xl="auto" xxl="auto"><h2 class="mt-3">Clinical Report:</h2></Col>
                </Row>
            </Container>
            {this.state.clinicalData.map(eachEntry=><TableCreator item={eachEntry} patientId={this.state.id} key={eachEntry.id} />)}


        </div>)
    }
}

class TableCreator extends React.Component{
    render(){
        var eachEntry = this.props.item;
        var patientId = this.props.patientId;
        var ime="";
        if(eachEntry.componentName==="bp"){
            ime="Blood Pressure"
        }else if(eachEntry.componentName==="heartrate"){
            ime="HeartRate"
        }else if(eachEntry.componentName==="hw"){
            ime="Height  /  Weight"
        }
        else{
            ime="Body Mass Index"
        }
        return <div>
                <div class="container mt-5">
                <div class="row justify-content-center">
                    <div class="col-4">
                        <ul class="list-group list-group-flush bg-transparent">
                        <li class="list-group-item bg-transparent " id="customlistitem">{ime+":"}</li>
                        <hr/>
                        </ul>
                    </div>
                    <div class="col-4">
                        <ul class="list-group list-group-flush bg-transparent">
                            <li class="list-group-item bg-transparent" id="customlistitem">{eachEntry.componentValue}&nbsp;&nbsp;{eachEntry.measuredDateTime}&nbsp;<Link to ={{pathname:"/chart/"+eachEntry.componentName, state:{id:patientId}}}><img src={process.env.PUBLIC_URL + '/Picture.png'} width="20" height="15"/></Link></li>
                            <hr/>
                            </ul>
                    </div>

                
                </div>
            </div>
        </div>
    }
}

export default withRouter(AnalyzeData);