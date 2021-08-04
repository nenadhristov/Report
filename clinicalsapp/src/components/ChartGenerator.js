import React from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import '../css/ChartGenerator.css';
import authHeader from '../services/auth-header';
import { Button, Container, Row, Col, Alert, Table, Navbar, Nav, NavDropdown, Carousel } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import {toast} from 'react-toastify';
class ChartGenerator extends React.Component{

    state={
        clinicalData:[]
        
    }
    
 
    
    
    

    componentDidMount(){
        
        axios.get("http://localhost:9090/clinicalservices/api/clinicals/"+this.props.location.state.id+"/"+this.props.match.params.componentName, { headers: authHeader() }).then(res=>{

            this.setState({ clinicalData: res.data });

        }).catch(error => {
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

    render(){
        var ime ="";
        var ime1="";
        var ime2="";

        if(this.props.match.params.componentName==="bp"){
             ime="Blood Pressure";
             ime1="Systolic";
             ime2="Dystolic";
        }else if(this.props.match.params.componentName==="hw"){
            ime="Height/Weight";
            ime1="Height";
            ime2="Weight"
        }else if(this.props.match.params.componentName==="heartrate"){
            ime="HeartRate";
            ime1="Beats Per Minute";
        }else{
            ime="Body Mass Index";
            ime1="kg/m2";
        }

        var Vreme = new Array();
        var myArray = new Array();
        this.state.clinicalData.map((item,index)=>{
            if(item.componentName===this.props.match.params.componentName){
            myArray.push(item.componentValue);
            Vreme.push(item.measuredDateTime)
            }
        })
        
        var VisokPritisok = new Array();
        var NizokPritisok = new Array();
        myArray.forEach(element => 
            VisokPritisok.push(element.split('/')[0])
            );

        myArray.forEach(element => 
            NizokPritisok.push(element.split('/')[1])
                 );


        function LineChart(){
            const type={

                type: 'line'
            }
            const data = {
                labels:Vreme,
                datasets:[
                    {
                        label:ime1,
                        data:VisokPritisok,
                        borderColor: ['rgba(255,206,86 ,0.2)'],     
                        backgroundColor:['rgba(240,128,128 ,0.5)'],                
                        pointBackgroundColor:'rgba(255,206,86 ,0.2)',
                        pointBorderColor:'rgba(255,206,86 ,0.2))'
                    },
                    {
                        label:ime2,
                        data:NizokPritisok,
                        borderColor: ['rgba(54,162,235 ,0.2)'],
                        backgroundColor:['rgba(54,162,235 ,1)'], 
                        pointBackgroundColor:'rgba(54,162,235 ,0.2)',
                        pointBorderColor:'rgba(54,162,235 ,0.2)'
                    }
                ]
               
            }
            const options ={
                title:{
                    display: true,
                    color:('dark','#090908'),
                    text:ime,
                    fontSize:"40",
                    bold:true

                }

                

            }
            return(
                <Line type={type} data={data} options={options}/>
            )
        }
       
        return (<div class="ChartGenerator-component">
                    <Container fluid text-nowrap id="custom-container">
                    <Row className="justify-content-center mt-5">  
                    <LineChart></LineChart>
                    </Row>
                    </Container>
        </div>);
    }
}



export default withRouter(ChartGenerator);