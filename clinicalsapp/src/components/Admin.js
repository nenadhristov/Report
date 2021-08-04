import React from 'react';
import axios from 'axios';
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {Link, Redirect} from 'react-router-dom';
import { Button, Container, Row, Col, Alert, Table, Navbar, Nav, NavDropdown, Carousel } from 'react-bootstrap';
import '../css/AddPatient.css'
import authHeader from '../services/auth-header';
import AuthService from "../services/auth.service";
import { withRouter } from "react-router-dom";
class Admin extends React.Component{  

        state = {
        showAdminBoard: false,
        currentUser: undefined,
        isReady: false,
        };
      



      componentDidMount(){

        this.checkauth();

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
        });

    }
    
      }

      logOut() {
        AuthService.logout();
      }
    handleSubmit(event){
        event.preventDefault();
        const data={
            username:this.username,
            role:[this.role],
        }

        axios.post('http://localhost:9090/clinicalservices/api/admin/changeRole',data, { headers: authHeader() }).then(res=>{
            toast("Role changed sucessfully!",{autoClose:2000,position:toast.POSITION.BOTTOM_CENTER})
        }).catch(error => {
            if(error.response.status===400){
             toast("The request was invalid.",{autoClose:4000,position:toast.POSITION.BOTTOM_CENTER});
            } else if(error.response.status === 401){
                this.logOut();
                this.props.history.push("/login");
            }
             else if(error.response.status === 500){
             toast("Username does not exist",{autoClose:4000,position:toast.POSITION.BOTTOM_CENTER});
            }
            else if(error.response.status === 403){
                this.props.history.push("forbidden")
            }
         })


    }
    render(){
        const { currentUser, showAdminBoard, isReady} = this.state;
        if(isReady===false){
            return null;
        }
        return(
             
            <div className='AddPatient-component'>
                 {!showAdminBoard && (
                    <Redirect to="/forbidden"></Redirect>
                          )
                        }
                    <Container fluid>
                        <Row className="justify-content-center mt-5">  
                            <Col md="auto" xs="auto" sm="auto" lg="auto" xl="auto" xxl="auto"><h2 class="mt-5">Change Role:</h2></Col>
                        </Row>
            <form>
                <div class="justify-content-center form-group row mt-5">
                    <label for="inputEmail3" class="col-sm-1 col-form-label">Username</label>
                    <div class="col-sm-2">
                    <input type="text" class="form-control" id="inputName" placeholder="Username" name="username" onChange={(event=>this.username=event.target.value)}></input>
                    </div>
                    
                </div>
                <div class="justify-content-center form-group row mt-1">
                    <label for="inputEmail3" class="col-sm-1 col-form-label">Role</label>
                    <div class="col-sm-2">
                    <input type="text" class="form-control" id="inputLast" placeholder="Role" name="role" onChange={(event=>this.role=event.target.value)}></input>
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

export default withRouter(Admin);