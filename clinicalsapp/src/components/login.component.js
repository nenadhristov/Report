import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { Button, Container, Row, Col, Alert, Table, Navbar, Nav, NavDropdown, Carousel, Image } from 'react-bootstrap';
import AuthService from "../services/auth.service";
import Figure from 'react-bootstrap/Figure'
import slikazalogin from '../assets/iamges/Logo.png'
import '../css/logoimage.css'
import { withRouter } from "react-router-dom";
const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

 class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      password: "",
      loading: false,
      message: ""
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.login(this.state.username, this.state.password).then(
        () => {
          this.props.history.push("/");
          window.location.reload();
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            loading: false,
            message: resMessage
          });
        }
      );
    } else {
      this.setState({
        loading: false
      });
    }
  }

  render() {
    return (
      <div className='za-login-page'>
          <Form
            onSubmit={this.handleLogin}
            ref={c => {
              this.form = c;
            }}
          >

           
            <Container fluid>
            <Row className="justify-content-center mt-5">
            
            <div id="circle"></div>
            <div id="za-text">
              Neno's
            </div>   
            <div id="circle1"></div> 
            </Row>
            <Row className="justify-content-center">
              <div id="za-text2">
                Clinic
              </div>
            </Row>    
            </Container>
            
            <Row className="justify-content-center">
            <div className="form-group col-2" id="username-login">
              <label htmlFor="username">Username</label>
              <Input
                type="text"
                className="form-control"
                name="username"
                value={this.state.username}
                onChange={this.onChangeUsername}
                validations={[required]}
              />
              
            </div>
            </Row>

            <Row className="justify-content-center">
            <div className="form-group col-2" id="password-login">
              <label htmlFor="password">Password</label>
              <Input
                type="password"
                className="form-control"
                name="password"
                value={this.state.password}
                onChange={this.onChangePassword}
                validations={[required]}
              />
            </div>
            </Row>
            <Row className="justify-content-center">
            <div className="form-group col-2" id="button-login">
              <button
                className="btn btn-primary btn-block"
                disabled={this.state.loading}
              >
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Login</span>
              </button>
            </div>
            </Row>

            <Row className="justify-content-center">
            {this.state.message && (
              <div className="form-group col-2" id="message-login">
                <div className="alert alert-success" role="alert">
                The user name or password is incorrect
                </div>
              </div>
            )}
            </Row>
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
            
            
          </Form>
          </div>
          
    );
  }
}

export default withRouter (Login);