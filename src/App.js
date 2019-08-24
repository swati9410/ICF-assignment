import React,{Component} from 'react';
import {  Button } from 'react-bootstrap';
import Data from './data.json';
import CommonTable from './components/commonTable';
import './App.scss';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allFlightData: [],
      flightDetail: [],
      sortDirection: "asc",
      departureTimeArray: [],
      deptMinTime: "",
      deptMaxTime: ""    
    };
  }
  componentDidMount(){
    var flightPath = Data.indiGoAvailability.trips[0].flightDates[0].flights;
    if(flightPath){
      this.setState({
        allFlightData: flightPath,
        flightDetail: flightPath,
      })
    }
  }
  onSort(event, sortKey, direction) {
    const { flightDetail, sortDirection } = this.state
    let flightDetailCopy;
    direction = sortDirection === 'asc' ? 'desc' : 'asc'
    if(sortDirection === "asc"){
      flightDetailCopy = flightDetail.sort((a,b) => a[sortKey].localeCompare(b[sortKey]))
    }
    else{
      flightDetailCopy = flightDetail.sort((a,b) => b[sortKey].localeCompare(a[sortKey]))
    }
    this.setState({
      flightDetail: flightDetailCopy,
      sortDirection: direction
    })
  } 
  filterItems(minTime,maxTime){
    let departureArr = [];
    this.state.allFlightData.map((value,key) => {
      let deptDate = new Date(value.standardTimeOfDeparture);
      let deptDateValue = deptDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
      if(this.isBigEnough(deptDateValue, minTime, maxTime)){
        departureArr.push(this.state.allFlightData[key]);
      }
      return ({})
    })
    this.setState({
      flightDetail: departureArr
    })
  }

  isBigEnough(value, minTime, maxTime) {
    return value >= minTime && value < maxTime;
  }
  
  render(){
  const { flightDetail, sortDirection, allFlightData} = this.state;
  console.log('Flight Detail', allFlightData);
  const THEAD_LIST=['Flight No.','Departure Time','Arrival Time','Duration'];
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
            allFlightData.length !== 0 ?
            (allFlightData[0].origin):
            ("No Data Found")
          }
        </span>
        <i className="fa fa-arrow-right" aria-hidden="true"></i>
        <span>
          {
            allFlightData.length !== 0 ?
            (allFlightData[0].destination):
            ("No Data Found")
          }
        </span>
      </div>
      <div className="">
        <Button variant="primary" onClick={() => this.filterItems("00:00", "06:00")}>00-06</Button>
        <Button variant="primary" onClick={() => this.filterItems("06:00", "12:00")}>06-12</Button>
        <Button variant="primary" onClick={() => this.filterItems("12:00", "18:00")}>12-18</Button>
        <Button variant="primary" onClick={() => this.filterItems("18:00", "24:00")}>18-00</Button>
      </div>
        
      <Button variant="primary" onClick={e => this.onSort(e, 'travelTime', sortDirection)}>Sort by Duration</Button>
        <CommonTable 
          tHeadList={THEAD_LIST}
          tBodyList={getCompleteFlightDetail}
          sortTable={this.sortTable}
        />
      </div>
    );
  }
}

