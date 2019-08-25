import React,{Component} from 'react';
import {  Button, Container, Row, Col } from 'react-bootstrap';
import FlightTable from './components/common/flightTable';
import Data from './data.json';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allFlightData: [],
            flightDetail: [],
            flightOrigin: "",
            flightDestination: "",
            sortDirection: "",
            departureTimeArray: [],
            filterRangeArr: []
        };
    }
    componentDidMount(){
        var flightPath = Data.indiGoAvailability.trips[0].flightDates[0].flights;
        if(flightPath){
            this.setState({
                allFlightData: flightPath,
                flightDetail: flightPath,
                flightOrigin: flightPath[0].origin,
                flightDestination: flightPath[0].destination
            })
        }
    }
    /* Sorting(asc/desc) by flight duration */
    onSort(event, sortKey, direction) {
        const { flightDetail, sortDirection } = this.state;
        let flightDetailCopy;
        this.setState({
            sortDirection: 'asc'
        })
        direction = sortDirection === 'asc' ? 'desc' : 'asc'
        if(sortDirection === "asc"){
            flightDetailCopy = flightDetail.sort((a,b) => b[sortKey].localeCompare(a[sortKey]))
        }
        else{
            flightDetailCopy = flightDetail.sort((a,b) => a[sortKey].localeCompare(b[sortKey]))
        }
        this.setState({
            flightDetail: flightDetailCopy,
            sortDirection: direction
        })
    } 

    /* Provide filtered flights by departure */
    getFilterData(){
        const {allFlightData} = this.state;
        let departureArr = [];
        allFlightData.map((value,key) => {
            let deptDate = new Date(value.standardTimeOfDeparture);
            let deptDateValue = deptDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
            if(this.isBigEnough(deptDateValue)){
                departureArr.push(allFlightData[key]);
            }
            return ({})
        })
        this.setState({
            flightDetail: departureArr,
        })
    }

    /* Filter by flight departure */
    filterItems(e,minTime,maxTime){
        const {filterRangeArr, allFlightData} = this.state;
        let classVal = e.currentTarget.classList;
        if(classVal.contains("filter-active")){
            var index = filterRangeArr.indexOf(minTime+"-"+ maxTime);
            if (index > -1) {
                filterRangeArr.splice(index, 1);
            }
            classVal.remove('filter-active');
            if(!filterRangeArr.length){
                this.setState({
                    flightDetail: allFlightData,
                })
            }
            else{
                this.getFilterData();
            }
        }
        else{
            filterRangeArr.push(minTime+"-"+ maxTime);
            classVal.add('filter-active');
            this.getFilterData();
        }
    }

    /* Check flight departure according to range */
    isBigEnough(deptTime) {
        var isExist = false;
        this.state.filterRangeArr.map((value,key) => {
            var minMaxArr = value.split("-");
            if(deptTime >= minMaxArr[0] && deptTime < minMaxArr[1]){
                isExist =  true;
            }
            return ({})
        })
        return isExist;
    }

    /* get formatted time */
    getFormatTime(dateTime){
        let dateTimeVal = new Date(dateTime);
        return dateTimeVal.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    }
  
    render(){
        const { flightDetail, sortDirection, flightOrigin, flightDestination} = this.state;
        const THEAD_LIST=['Flight No.','Departure Time','Arrival Time','Duration'];
        let getCompleteFlightDetail = [];
        if(flightDetail.length !== 0) {
            getCompleteFlightDetail = 
            flightDetail.map((value,key) => {
                let deptDateValue = this.getFormatTime(value.standardTimeOfDeparture);
                let arvlDateValue = this.getFormatTime(value.standardTimeOfArrival);
                let travelTime = new Date("Jan 01, 1983 "+value.travelTime);
                let travelTimeValue = travelTime.getHours()+"h "+travelTime.getMinutes()+"m";
                return(
                    <tr key={key}>
                        <td className="flightNumber">  
                            <i className="fa fa-plane" aria-hidden="true"></i>
                            {value.flightNumber}
                        </td>
                        <td>{deptDateValue}</td>
                        <td>{arvlDateValue}</td>
                        <td>{travelTimeValue}</td>
                    </tr>
                )
            })
        }
        return (
            <Container className="section-padding">
                <Row className="placeWithFilter">
                    <Col xs={3} className="travelPlace">
                        <span className="travelFrom">
                            {flightOrigin}
                        </span>
                        <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
                        <span className="travelTo">
                            {flightDestination}
                        </span>
                    </Col>
                    <Col xs={9} className="filterWithSort">
                        <div className="time-filter">
                            <span className="departureBy">
                                Departure By
                            </span>
                            <Button onClick={(e) => this.filterItems(e,"00:00", "06:00")}>
                                <img src="images/moon.png" alt="moon"/>
                                00-06
                            </Button>
                            <Button onClick={(e) => this.filterItems(e,"06:00", "12:00")}>
                                <img src="images/sunrise.svg" alt="sunrise"/>
                                06-12
                            </Button>
                            <Button onClick={(e) => this.filterItems(e,"12:00", "18:00")}>
                                <img src="images/sun.png" alt="sun"/>
                                12-18
                            </Button>
                            <Button onClick={(e) => this.filterItems(e,"18:00", "24:00")}>
                                <img src="images/sunset.png" alt="sunset"/>
                                18-24
                            </Button>
                        </div>
                        <Button className="sortDuration" onClick={e => this.onSort(e, 'travelTime', sortDirection)}>
                            Sort by Duration
                            { 
                                (sortDirection === "asc" && 
                                <i className="fa fa-sort-asc" aria-hidden="true"></i>)
                                || 
                                (sortDirection === "desc" && 
                                <i className="fa fa-sort-desc" aria-hidden="true"></i>)
                            }
                        </Button>
                    </Col>
                </Row>
                <FlightTable 
                    tHeadList={THEAD_LIST}
                    tBodyList={getCompleteFlightDetail}
                />
            </Container>
        );
    }
}

