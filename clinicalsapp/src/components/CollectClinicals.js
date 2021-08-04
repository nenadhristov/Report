import axios from 'axios';
import React from 'react';
import { toast } from 'react-toastify';
import { Button, Container, Row, Col, Alert, Table, Navbar, Nav, NavDropdown, Carousel } from 'react-bootstrap';
import '../css/CollectClinical.css'
import authHeader from '../services/auth-header';
import { withRouter } from "react-router-dom";
import AuthService from "../services/auth.service";
class CollectClinicals extends React.Component{
    state={
        showAdminBoard: false,
        showDoctorBoard: false,
        currentUser: undefined,
        isReady: false,
    }
    

    componentDidMount(){

        this.checkauth();
        var id =this.props.location.state.id
        axios.get("http://localhost:9090/clinicalservices/api/patients/"+id, { headers: authHeader() })
        .then(res=>{

            this.setState(res.data)
        })
        .catch(error => {
            if(error.response.status===400){
             toast("The request was invalid.",{autoClose:4000,position:toast.POSITION.BOTTOM_CENTER});
            } else if(error.response.status === 401){
                this.logOut();
                this.props.history.push("/login");
            } else if(error.response.status === 500){
             toast("The Patient does not exist",{autoClose:4000,position:toast.POSITION.BOTTOM_CENTER});
            }
            else if(error.response.status === 403){
                this.props.history.push("forbidden")
            }
         })
    }

    checkauth = () =>{
        const user = AuthService.getCurrentUser();
        this.setState({
            isReady:true,
        });
        if (user) {
        this.setState({
            currentUser: user,
            showAdminBoard: user.roles.includes("ROLE_ADMIN"),
            showDoctorBoard: user.roles.includes("ROLE_DOCTOR"),
        });

        }   
    
      }

    handleSubmit(event){
        event.preventDefault();
        var date = new Date();
        var dateStr =
        date.getFullYear() + "-" +
        ("00" + (date.getMonth() + 1)).slice(-2) + "-" +
        ("00" + date.getDate()).slice(-2) + " "+
        ("00" + date.getHours()).slice(-2) + ":" +
        ("00" + date.getMinutes()).slice(-2) + ":" +
        ("00" + date.getSeconds()).slice(-2);
        const data={
            patientId:this.props.location.state.id,
            componentName:this.componentName,
            componentValue:this.componentValue,
            measuredDateTime: dateStr
        }

        axios.post("http://localhost:9090/clinicalservices/api/clinicals/",data, { headers: authHeader() }).then(
            res=>{
                toast("Patient Data Saved Sucessfully",{autoClose:3000,position:toast.POSITION.BOTTOM_CENTER});
            }
        )


    }
    render(){
        const { currentUser, showAdminBoard, isReady,showDoctorBoard} = this.state;
        if(isReady===false){
            return null;
        }

        if(showDoctorBoard===false && showAdminBoard === false)
        {
            this.props.history.push("/forbidden")
        }
        
        return (<div className='CollectClinical-component'>
            <Container fluid>
                <Row className="justify-content-center mt-4">  
                <Col md="auto" xs="auto" sm="auto" lg="auto" xl="auto" xxl="auto"><h2 class="mt-5">Patient Details:</h2></Col>
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
                <Col md="auto" xs="auto" sm="auto" lg="auto" xl="auto" xxl="auto"><h2 class="mt-3">Patient Clinical Data:</h2></Col>
                </Row>
            </Container>
            <div class="container mt-4 justify-content-center"> 
            <form>
            <div class="row justify-content-center">
                        Clinical Entry Type &nbsp;&nbsp;&nbsp;
                        <select class="form-select" aria-label="Default select example" onChange={(event)=>{this.componentName=event.target.value}}>
                            <option selected>Choose one</option>
                            <option value="bp">Blood Pressure(Sys/Dys)</option>
                            <option value="hw">Height/Weight</option>
                            <option value="heartrate">Heart Rate</option>
                        </select>
                        
                </div> 
                <hr id="customhr"/>
                <div class="row justify-content-center mt-3">
                Value:
                </div>
                <div class="row justify-content-center mt-2">
                <input type="text" class="form-control" name="componentValue" id="customfield" onChange={(event)=>{this.componentValue=event.target.value}}></input>
                </div>
                <hr id="customhr"/>
                <div class="row justify-content-center mt-4">
                <button type="button" class="btn btn-primary" onClick={this.handleSubmit.bind(this)}>Confirm</button>
                </div>
            </form>
            </div>
        </div>)
    }
}

export default withRouter(CollectClinicals);