import React,{useEffect} from 'react';
import {AxiosError} from 'axios';
import {Link, Redirect, withRouter} from 'react-router-dom';
import {toast} from 'react-toastify';
import { Button, Container, Row, Col, Alert, Table, Navbar, Nav, NavDropdown, Carousel } from 'react-bootstrap';
import '../css/Home.css'
import image from '../assets/iamges/61808.jpg'
import slika from '../assets/iamges/slika.jpg'
import slika1 from '../assets/iamges/cveke.jpg'
import authHeader from '../services/auth-header';
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";
import axios from 'axios';
class Home extends React.Component{

  state={
    patientData:[],
    showAdminBoard: false,
    showDoctorBoard: false,
    currentUser: undefined,
    isReady: false,
  }
    
 

      componentDidMount(){
        UserService.getDoctorContent().then(res=>{
          const patientData = res.data;
          this.setState({patientData})

        }).catch(error => {
          if(error.response.status===400){
           toast("The request was invalid.",{autoClose:4000,position:toast.POSITION.BOTTOM_CENTER});
          } else if(error.response.status === 401){
              this.logOut()
              this.props.history.push("/login");
          } else if(error.response.status === 500){
           toast("The Patient does not exist",{autoClose:4000,position:toast.POSITION.BOTTOM_CENTER});
          }
          else if(error.response.status === 403){
              this.props.history.push("forbidden")
          }
       })
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
            showDoctorBoard: user.roles.includes("ROLE_DOCTOR"),
        });

        }   
    
      }

      logOut() {
        AuthService.logout();
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
       
        var variant="";
        return (
        <div className='Login-component'>
        <Container fluid>
        <Row className="justify-content-center mt-4">  
        <Col md="auto" xs="auto" sm="auto" lg="auto" xl="auto" xxl="auto"><h2 class="mt-5">List of Patients:</h2></Col>
        </Row>
        </Container>
        <div class="table-responsive-sm text-nowrap ">
        <Container>
        <Row className="justify-content-center mt-5">
          <Col md="auto" xs="auto" sm="auto" lg="auto" xl="auto" xxl="auto">
        <Table striped bordered hover variant="dark">
         
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Age</th>
              <th class="custom_centered" colSpan="3" >Change Data</th>
            </tr>
          </thead> 
          <tbody>
            {this.state.patientData.map(patient=><RowCreator item={patient} patientId={patient.id} key={patient.id} />)}
          </tbody>
          
        </Table>
        </Col>
        </Row>
                </Container >
                
                </div>
                <div class="container d-flex justify-content-center responsive" id="custom-carousel">
                  <Carousel className="mt-5 d-block container-fluid">
                  <Carousel.Item>
                  <div class="container-fluid d-flex justify-content-center">
                    <img
                      class="img-responsive"
                      src={slika}
                      alt="First slide"
                      fluid
                      width="800"
                      height="420"
                    />
                    <Carousel.Caption>
                      <div class="container-fluid justify-content-center" id="customtext">
                      <h3 style={{color: "#0C355F"}}>An organized medical service offering diagnostic, therapeutic, or preventive outpatient services.</h3>
                      <p style={{color: "black"}}>Often, the term covers an entire medical teaching centre, including the hospital and the outpatient facilities. The medical care offered by a clinic may or may not be connected with a hospital.</p>
                      </div>
                    </Carousel.Caption>
                    </div>
                  </Carousel.Item>
                  <Carousel.Item>
                  <div class="container-fluid d-flex justify-content-center">
                    <img
                      class="img-responsive"
                      src={slika1}
                      alt="First slide"
                      fluid
                      width="800"
                      height="420"
                    />
                    

                    <Carousel.Caption>
                      <div class="container-fluid justify-content-center" id="customtext">
                      <h3 style={{color: "#0F3616"}}>An organized medical service offering diagnostic, therapeutic, or preventive outpatient services.</h3>
                      <p style={{color: "black"}}>Often, the term covers an entire medical teaching centre, including the hospital and the outpatient facilities. The medical care offered by a clinic may or may not be connected with a hospital.</p>
                      </div>
                    </Carousel.Caption>
                    </div>
                  </Carousel.Item>
                  {/*
                  <Carousel.Item>
                  <div class="d-flex justify-content-center">
                    <img
                      className="d-block w-100"
                      src="holder.js/800x400?text=Third slide&bg=20232a"
                      alt="Third slide"
                    />
                    </div>

                    <Carousel.Caption>
                      <h3>Third slide label</h3>
                      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                  </Carousel.Item>*/}
                </Carousel>     
                </div>
        </div>
        )
      }
    }

    class RowCreator extends React.Component {
      
      render() {

      
      function povikaj(id){
        axios.get('http://localhost:9090/clinicalservices/api/patients/delete/'+id, {headers: authHeader() }).then(res=>{
          toast("Patient Deleted Sucessfully, pls wait 3 seconds",{autoClose:3000,position:toast.POSITION.BOTTOM_CENTER})
          
          setTimeout(function() {
            window.location.reload();
            }.bind(this), 3000);
        })
        
             
      }

       

    var patient = this.props.item;
    var patientId = this.props.patientId
    var patientid = parseInt(this.props.patientId)
    

    return (
      <tr>
        <td>{patient.firstName}</td>
        <td>{patient.lastName}</td>
        <td>{patient.age}</td>
        <td>
        
          <Link to={{pathname:"/patientDetails",state:{id:patientId}}}><Button variant="info">Add Data</Button></Link>
        
        </td>
        <td>
          <Link to={{pathname:"/analyze", state:patientId}}><Button variant="info">Analyze</Button></Link>
        </td>
        <td>
        <Button variant="info" onClick={()=>povikaj(patientid)}>Delete</Button>
        </td>
      </tr>
    );
  }
}

export default withRouter(Home);