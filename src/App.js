import React,{Component} from 'react';
import {  Button } from 'react-bootstrap';
import Data from './data.json';
import CommonTable from './components/commonTable';

import './App.scss';
const THEAD_LIST=['Flight No.','Departure Time','Arrival Time','Duration'];





export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flightDetail: [],
      sortDirection: "asc"
    };
  }
  componentDidMount(){
    var flightPath = Data.indiGoAvailability.trips[0].flightDates[0].flights;
    if(flightPath){
      this.setState({
        flightDetail: flightPath
      })
    }
  }
  onSort(event, sortKey) {
    const flightDetail = this.state.flightDetail;
    const sortDirection = this.state.sortDirection
    if(sortDirection == "asc"){
      flightDetail.sort((a,b) => a[sortKey].localeCompare(b[sortKey]))
      this.setState({
        flightDetail,
        sortDirection: "desc"
      })
    }
    else{
      flightDetail.sort((a,b) => b[sortKey].localeCompare(a[sortKey]))
      this.setState({
        flightDetail,
        sortDirection: "asc"
      })
    }
  } 

 
  render(){
  const { flightDetail, column, direction } = this.state;
  console.log('Flight Detail', flightDetail);
  let getCompleteFlightDetail = [];
  if(flightDetail.length !== 0) {
    getCompleteFlightDetail = 
      flightDetail.map((value,key) => {
      let deptDate = new Date(value.standardTimeOfDeparture);
      let deptDateValue = deptDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
      let arvlDate = new Date(value.standardTimeOfArrival);
      let arvlDateValue = arvlDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
      let travelTime = new Date("Jan 01, 1983 "+value.travelTime);
      let travelTimeValue = travelTime.getHours()+"h "+travelTime.getMinutes()+"m";
      return(
        <tr key={key}>
          <td>{value.flightNumber}</td>
          <td>{deptDateValue}</td>
          <td>{arvlDateValue}</td>
          <td>{travelTimeValue}</td>
        </tr>
      )})
    
  }
  return (
    <div className="App">
      <div className="travelPlace">
        <span>
          {
            flightDetail.length !== 0 ?
            (flightDetail[0].origin):
            ("No Data Found")
          }
        </span>
        <i className="fa fa-arrow-right" aria-hidden="true"></i>
        <span>
          {
            flightDetail.length !== 0 ?
            (flightDetail[0].destination):
            ("No Data Found")
          }
        </span>
      </div>
      <Button variant="primary">Filter</Button>
      <Button variant="primary" onClick={e => this.onSort(e, 'travelTime')}>Sort by Duration</Button>
        <CommonTable 
          flightdetail = {flightDetail} 
          tHeadList={THEAD_LIST}
          tBodyList={getCompleteFlightDetail}
          column={column} 
          direction={direction}
          sortTable={this.sortTable}
        />
      </div>
    );
  }
}

