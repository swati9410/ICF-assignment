import React from 'react';
import {  Table } from 'react-bootstrap';

const CommonTable = (props) => {
  const {
    flightdetail
  } = props;
  return (
    <Table responsive>
        <thead>
            <tr>
              {/* <th onClick={e => this.onSort(e, 'flightNumber')}>Flight No.</th> */}
              <th onClick={props.onSort('flightNumber')}>Flight No.</th>
              <th onClick={props.onSort('standardTimeOfDeparture')}>Departure Time</th>
              <th onClick={props.onSort('standardTimeOfArrival')}>Arrival Time</th>
              <th onClick={props.onSort('travelTime')}>Duration</th>
            </tr>
        </thead>
        <tbody>
          {
            flightdetail.length !== 0 ?
              (flightdetail.map((value,key) => {
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
              )})) :
              (<tr>
                <td>No data found</td>
              </tr>)
          }
      
            
        </tbody>
    </Table>
  );
}

export default CommonTable;
