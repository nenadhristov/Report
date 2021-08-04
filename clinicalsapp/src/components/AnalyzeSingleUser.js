import React from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css'
import {Link} from 'react-router-dom';
import { Button, Container, Row, Col, Alert, Table, Navbar, Nav, NavDropdown, Carousel } from 'react-bootstrap';
import '../css/AddPatient.css'
import authHeader from '../services/auth-header';
import { withRouter } from 'react-router-dom';
import AnalyzeData from './AnalyzeData';
import { findAllByDisplayValue } from '@testing-library/react';
import { toast } from 'react-toastify';
import AuthService from "../services/auth.service";

class AnalyzeSingleUser extends React.Component{

    state={
        patientData:[],
        message:"",
      }

    
      
    
      
    handleSubmit(event){

        event.preventDefault();

        const data={
            lastname:this.lastname,
            firstname:this.firstname,
            age:parseInt(this.age)
        }

    
        axios.post('http://localhost:9090/clinicalservices/api/patients/analyze/singleUser',data, { headers: authHeader() }).then(res=>{
                this.setState({patientData: res.data })
                this.getid()
        
        }).catch(error => {
            if (error.response) {
                if(error.response.status == 401){
                    this.logOut();
                    this.props.history.push("/login");
                }
                
               
              } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
              } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
              }
              console.log(error.config);
        })


    }

    getid(){
        var id = this.state.patientData.id
        console.log(id)
        if(id === undefined){
            toast("The Patient does not exist",{autoClose:4000,position:toast.POSITION.BOTTOM_CENTER});
        }
        else{
        this.props.history.push({
            pathname: '/analyze',
              state:id// your data array of objects
          })
        }
    }

    logOut() {
        AuthService.logout();
      }


      
    render(){
        
        return (

            <div className='AddPatient-component'>
                    <Container fluid>
                        <Row className="justify-content-center mt-5">  
                            <Col md="auto" xs="auto" sm="auto" lg="auto" xl="auto" xxl="auto"><h2 class="mt-5">Find Patient:</h2></Col>
                        </Row>
                    

            <form>
                <div class="justify-content-center form-group row mt-5">
                    <label for="inputEmail3" class="col-sm-1 col-form-label">Last Name</label>
                    <div class="col-sm-2">
                    <input type="text" class="form-control" id="inputName" placeholder="Last Name" name="lastname" onChange={(event=>this.lastname=event.target.value)}></input>
                    </div>
                    
                </div>
                <div class="justify-content-center form-group row mt-1">
                    <label for="inputEmail3" class="col-sm-1 col-form-label">First Name</label>
                    <div class="col-sm-2">
                    <input type="text" class="form-control" id="inputLast" placeholder="First Name" name="firstname" onChange={(event=>this.firstname=event.target.value)}></input>
                    </div>
                </div>
                <div class="justify-content-center form-group row mt-1">
                    <label for="inputEmail3" class="col-sm-1 col-form-label">Age</label>
                    <div class="col-sm-2">
                    <input type="text" class="form-control" id="inputAge" placeholder="Age" name="age" onChange={(event=>this.age=event.target.value)}></input>
                    </div>
                </div>
                <div class="justify-content-center form-group row mt-5">
                <button type="submit" class="btn btn-dark" onClick={this.handleSubmit.bind(this)}>Find</button>
                </div>
            </form>
            </Container>
        </div>
        
        )
        
    }
}

export default withRouter(AnalyzeSingleUser);