import React,{Component} from 'react';
import {  Button } from 'react-bootstrap';
import Data from './data.json';
import CommonTable from './components/commonTable';

import './App.scss';





export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flightDetail: [],
      sort: {
        column: null,
        direction: 'desc',
       }
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

  onSort = (column) => {

    return e => {
        const direction = this.state.sort.column ? (this.state.sort.direction === 'asc' ? 'desc' : 'asc') : 'desc'
        const sortedUsers = this.state.flightDetail.sort((a, b) => {
            if (column === 'Flight No.') {
                const nameA = a.flightNumber.toUpperCase() // ignore upper and lowercase
                const nameB = b.flightNumber.toUpperCase() // ignore upper and lowercase
    
                if (nameA < nameB)
                    return -1
                if (nameA > nameB)
                    return 1
                else return 0
            }
            else {
                return a.flightNumber - b.flightNumber
            }
        })
    
        if (direction === 'desc') {
            sortedUsers.reverse()
        }
    
        this.setState({
          flightNumber: sortedUsers,
            sort: {
                column,
                direction,
            },
        })
    }
    }

  render(){
  const { flightDetail, column, direction } = this.state;
  console.log('Flight Detail', flightDetail);
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
 
       <button onClick={this.sortAscending}>asc</button>
         <button onClick={this.sortDescending}>desc</button>
        <CommonTable 
          flightdetail = {flightDetail} 
          column={column} 
          direction={direction}
          onSort={this.onSort}
        />
      </div>
    );
  }
}

