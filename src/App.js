import React,{Component} from 'react';
import { Table, Button } from 'react-bootstrap';
import Data from './data.json';
import './App.scss';





export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flightDetail: [],
    };
  }
  componentWillMount(){
    var flightPath = Data.indiGoAvailability.trips[0].flightDates[0].flights;
    if(flightPath){
      this.setState({
        flightDetail: flightPath
      })
    }
    else{
      this.setState({
        flightDetail: []
      })
    }
  }
   addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }
  render(){
  const {flightDetail} = this.state;
  console.log('Flight Detail', flightDetail);
  return (
    <div className="App">
      <div className="travelPlace">
        <span>
          {
            Object.keys(flightDetail).length !== 0 ?
            (flightDetail[0].origin):
            ("No Data Found")
          }
        </span>
        <i className="fa fa-arrow-right" aria-hidden="true"></i>
        <span>
          {
            Object.keys(flightDetail).length !== 0 ?
            (flightDetail[0].destination):
            ("No Data Found")
          }
        </span>
      </div>
      <Button variant="primary">Filter</Button>
      <Button variant="primary">Sort</Button>
      <Table responsive>
        <thead>
            <tr>
              <th>Flight No.</th>
              <th>Departure Time</th>
              <th>Arrival Time</th>
              <th>Duration</th>
            </tr>
        </thead>
        <tbody>
          {
            Object.keys(flightDetail).length !== 0 ?
              (flightDetail.map((value,key) => {
              let deptDate = new Date(value.standardTimeOfDeparture);
              let arvlDate = new Date(value.standardTimeOfArrival);
              let travelTime = new Date("Jan 01, 1983 "+value.travelTime);
              return(
                <tr key={key}>
                  <td>{value.flightNumber}</td>
                  <td>{this.addZero(deptDate.getHours())}:{this.addZero(deptDate.getMinutes())}</td>
                  <td>{this.addZero(arvlDate.getHours())}:{this.addZero(arvlDate.getMinutes())}</td>
                  <td>{this.addZero(travelTime.getHours())+"h "+this.addZero(travelTime.getMinutes())+"m"}</td>
                </tr>
              )})) :
              (<tr>
                <td>No Data Found</td>
                <td>No Data Found</td>
                <td>No Data Found</td>
                <td>No Data Found</td>
              </tr>)
          }
      
            
        </tbody>
      </Table>
    </div>
    );
  }
}

