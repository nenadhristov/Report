import React from 'react';
import axios from 'axios';
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {Link} from 'react-router-dom';
import { Button, Container, Row, Col, Alert, Table, Navbar, Nav, NavDropdown, Carousel } from 'react-bootstrap';
import '../css/AddPatient.css'
import authHeader from '../services/auth-header';
import { withRouter } from "react-router-dom";
import AuthService from "../services/auth.service";
toast.configure();

class AddPatient extends React.Component{

    state = {
        showAdminBoard: false,
        showDoctorBoard: false,
        currentUser: undefined,
        isReady: false,
        };

        componentDidMount(){

            this.checkauth();
    
        }

        logOut() {
            AuthService.logout();
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
        const data={
            firstName:this.firstName,
            lastName:this.lastName,
            age:this.age
        }

        axios.post('http://localhost:9090/clinicalservices/api/patients',data, { headers: authHeader() }).then(res=>{
            toast("Patient added sucessfully!",{autoClose:2000,position:toast.POSITION.BOTTOM_CENTER})
        }).catch(error => {
            if(error.response.status===400){
             toast("The request was invalid.",{autoClose:4000,position:toast.POSITION.BOTTOM_CENTER});
            } else if(error.response.status === 401){
                this.logOut();
                this.props.history.push("/login");
            }
             else if(error.response.status === 500){
             toast("That patient exist.",{autoClose:4000,position:toast.POSITION.BOTTOM_CENTER});
            }
            else if(error.response.status === 403){
                this.props.history.push("forbidden")
            }
         })


    }
    render(){
        const { currentUser, showAdminBoard, isReady,showDoctorBoard} = this.state;
        if(isReady===false){
            return null;
        }
        console.log(isReady)
        if(showDoctorBoard===false && showAdminBoard === false)
        {
            this.props.history.push("/forbidden")
        }

        return (
            <div className='AddPatient-component'>
                    <Container fluid>
                        <Row className="justify-content-center mt-5">  
                            <Col md="auto" xs="auto" sm="auto" lg="auto" xl="auto" xxl="auto"><h2 class="mt-5">Create Patient:</h2></Col>
                        </Row>
                    

            <form>
                <div class="justify-content-center form-group row mt-5">
                    <label for="inputEmail3" class="col-sm-1 col-form-label">First Name</label>
                    <div class="col-sm-2">
                    <input type="text" class="form-control" id="inputName" placeholder="First Name" name="firstName" onChange={(event=>this.firstName=event.target.value)}></input>
                    </div>
                    
                </div>
                <div class="justify-content-center form-group row mt-1">
                    <label for="inputEmail3" class="col-sm-1 col-form-label">Last Name</label>
                    <div class="col-sm-2">
                    <input type="text" class="form-control" id="inputLast" placeholder="Last Name" name="lastName" onChange={(event=>this.lastName=event.target.value)}></input>
                    </div>
                </div>
                <div class="justify-content-center form-group row mt-1">
                    <label for="inputEmail3" class="col-sm-1 col-form-label">Age</label>
                    <div class="col-sm-2">
                    <input type="text" class="form-control" id="inputAge" placeholder="Age" name="age" onChange={(event=>this.age=event.target.value)}></input>
                    </div>
                </div>
                <div class="justify-content-center form-group row mt-5">
                <button type="submit" class="btn btn-dark" onClick={this.handleSubmit.bind(this)}>Confirm</button>
                </div>
            </form>
            </Container>
        </div>
        
        )
    }
}

export default withRouter(AddPatient);