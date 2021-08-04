import React from 'react';
import './App.css';
import {Route,Switch,Link, Redirect} from 'react-router-dom';
import Home from './components/Home';
import CollectClinicals from './components/CollectClinicals';
import AddPatient from './components/AddPatient';
import AnalyzeData from './components/AnalyzeData';
import ChartGenerator from './components/ChartGenerator';
import Admin from './components/Admin';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./components/login.component";
import Register from "./components/register.component";
import { Component } from 'react';
import AuthService from "./services/auth.service";
import Profile from "./components/profile.component";
import { Button, Container, Row, Col, Alert, Table, Navbar, Nav, NavDropdown, Carousel } from 'react-bootstrap';
import './css/Home.css'
import image from './assets/iamges/61808.jpg'
import slika from './assets/iamges/slika.jpg'
import twitter from './assets/iamges/twitter.png'
import First from './components/First'
import AnalyzeSingleUser from './components/AnalyzeSingleUser';
import forbidden from './components/forbidden';
import GenericNotFound from './components/GenericNotFound';
class App extends Component {

  

  constructor(props) {

    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showDoctorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
      showUserBoard : false,
      isReady: false,
      loggin: false,
    };
  }

  


  componentDidMount() {
    
    const user = AuthService.getCurrentUser();
    this.setState({
     isReady:true,
    });

    if (user) {
      this.setState({
        currentUser: user,
        showUserBoard: user.roles.includes("ROLE_USER"),
        showDoctorBoard: user.roles.includes("ROLE_DOCTOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
        loggin:true,
      });
     
    }
  }

  logOut() {
    AuthService.logout();
  }


  render() {
    const { currentUser, showUserBoard, showDoctorBoard, showAdminBoard, isReady, loggin} = this.state;

    if(isReady===false){
      return null;
    }
    
    return (
      
      <div className='Login'>
        <div class="sticky-top">
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" >
        <Navbar.Brand className="mx-5" href="/">Neno's Clinic</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
        

        {showUserBoard && (
            <Nav>
            <Nav.Link className="mx-1" href="/">Home</Nav.Link>
            <Nav.Link className="mx-1" href="/analyzesingleuser">AnalyzeSingleUser</Nav.Link>
            </Nav>
          )}

          {showAdminBoard &&  (
            <Nav>
            <Nav.Link className="mx-1" href="/">Home</Nav.Link>
            <Nav.Link className="mx-1" href="/admin">Admin</Nav.Link>
            <Nav.Link className="mx-1" href="/home">List Of Patients</Nav.Link>
            <Nav.Link className="mx-1" href="/addPatient">Add Patient</Nav.Link>
            </Nav>
          )}

          {showDoctorBoard && (
          <Nav className="mr-auto">
            <Nav.Link className="mx-1" href="/">Home</Nav.Link>
            <Nav.Link className="mx-1" href="/home">List Of Patients</Nav.Link>
            <Nav.Link className="mx-1" href="/addPatient">Add Patient</Nav.Link>
          </Nav>
          )}

          {currentUser ?(
            <Nav className="ml-auto">
            <Nav.Link className="mx-5" href="/login" onClick={this.logOut}>LogOut</Nav.Link>
            </Nav>
          ) : (
            <>
              <Nav className="ml-auto">
              <Nav.Link className="mx-1" href="/register">Sign Up</Nav.Link>
              <Nav.Link className="mx-5" href="/login">Login</Nav.Link>
              </Nav>
            </>
          )}
        </Navbar.Collapse>
        </Navbar>
        </div>
        <div className="app">
        <Switch>
        <Route exact path="/home" render={() => (loggin ? (<Home/>): (<Redirect to="login"/>))}/>
        <Route exact path="/patientDetails" render={() => (loggin ? (<CollectClinicals/>): (<Redirect to="login"/>))}/>
        <Route exact path="/addPatient" render={() => (loggin ? (<AddPatient/>): (<Redirect to="login"/>))}/>
        <Route exact path="/analyze" render={() => (loggin ? (<AnalyzeData/>): (<Redirect to="login"/>))}/>
        <Route exact path="/chart/:componentName" render={() => (loggin ? (<ChartGenerator/>): (<Redirect to="login"/>))}/>
        <Route exact path="/analyzesingleuser" render={() => (loggin ? (<AnalyzeSingleUser/>): (<Redirect to="login"/>))}/>
        <Route exact path="/admin" component={Admin}/>
        <Route exact path="/" component={First}/>
        <Route exact path ="/forbidden" component={forbidden}/>
        <Route exact path="/login" render={() => (loggin ? (<Redirect to="/"/>): (<Login/>))}/>
        <Route exact path="/register" render={() => (loggin ? (<Redirect to="/"/>): (<Register/>))}/>
        <Route component={GenericNotFound}/>
          </Switch>
        </div>
    </div>
    );
  }

}
export default App;
