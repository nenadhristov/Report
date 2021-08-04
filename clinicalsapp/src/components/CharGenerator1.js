import React from 'react';
import axios from 'axios';
import CanvasJSReact from '../assets/canvasjs.react';
import authHeader from '../services/auth-header';
import { withRouter } from 'react-router-dom';
//var CanvasJSReact = require('./canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
class ChartGenerator extends React.Component{

    state={
        clinicalData:[]
    }
    

    

    

    componentDidMount(){
        axios.get("http://localhost:9090/clinicalservices/api/clinicals/"+this.props.match.params.patientId+"/"+this.props.match.params.componentName, { headers: authHeader() }).then(res=>{

            this.setState({ clinicalData: res.data });
        })

    }


    render(){
        var dps2 = [{x: 1, y: 10}, {x: 2, y: 13}, {x: 3, y: 18}, {x: 4, y: 20}, {x: 5, y: 17},{x: 6, y: 10}, {x: 7, y: 13}, {x: 8, y: 18}, {x: 9, y: 20}, {x: 10, y: 17}];
        var dps1=[];
        var dps = []; 
        var newOjbect= [];
        var newOjbect1 =[];
        var Vreme = new Array();
        var myArray = new Array();
        this.state.clinicalData.map((item,index)=>{
            myArray.push(item.componentValue);
            Vreme.push(item.measuredDateTime)

        })
        console.log(Vreme);
        var VisokPritisok = new Array();
        var NizokPritisok = new Array();
        console.log(myArray)
        var visok=myArray.join().toString();
        console.log(visok)
        myArray.forEach(element => 
            VisokPritisok.push(element.split('/')[0])
            );

        myArray.forEach(element => 
            NizokPritisok.push(element.split('/')[1])
                 );

        console.log("Visok pritisok "+VisokPritisok);
        console.log("Nizok pritisok "+NizokPritisok);
        VisokPritisok.forEach(element =>
            dps.push({y:element})
        )
        NizokPritisok.forEach(element=>
            dps1.push({y:element}))
            console.log(dps1);

         newOjbect = dps.map((item, i) => Object.assign({}, item, {label:Vreme[i]}));
         newOjbect1 = dps1.map((item, i) => Object.assign({}, item, {label:Vreme[i]}));

        Object.keys(newOjbect1).forEach(function(el){
            newOjbect1[el].y = parseInt(newOjbect1[el].y)
          })

        Object.keys(newOjbect).forEach(function(el){
            newOjbect[el].y = parseInt(newOjbect[el].y)
          })
          
        console.log(newOjbect1)
        const options = {
			title :{
				text: "Dynamic Line Chart"
			},
			data: [{
                type:"line",
                dataPoints:newOjbect

            },
            {
				type: "line",
				dataPoints : newOjbect1
			}]
		}	

        return (<div>         
             <CanvasJSChart options = {options}
				 onRef={ref => this.chart = ref}
			/>

            

        </div>);
    }
}



export default withRouter(ChartGenerator);