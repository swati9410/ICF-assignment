import React,{Component} from 'react';
// import {  Button } from 'react-bootstrap';
import './App.scss';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentData: [],
      filterData: [],
      showDetail: false,
      studentName: ""
    };
  }
  componentDidMount(){
    fetch("https://student-management-api-1u3cd4j7s.now.sh/students")
      .then(res => res.json())
      .then(
        (result) => {
          let sortedvalues = result.sort((a,b) => a["class"] - b["class"]);
            this.setState({
              studentData: sortedvalues
            })
            console.log("after sorting",this.state.studentData)
            const {studentData, filterData} = this.state;
            studentData.map(function(item) {
              var itemClass = item["class"];  
              if (itemClass in filterData) {
                console.log("itemClass",itemClass);
                // console.log("section",filterData[itemSection].section)
                filterData[itemClass].duplicate = true;
                item.duplicate = true;

              }
              else {
                filterData[itemClass] = item;
              }
              return ({})
            });
            this.setState({
              filterData: filterData
            })
            console.log("after filtering",filterData);            
        },
        (error) => {
          console.log("error",error);
        }
      )
  }

  getDetails(studentName){
    console.log(studentName);
    this.setState({
      showDetail: !this.state.showDetail,
      studentName: studentName
    })
    
  }
  
  render(){
  const { filterData, studentName, studentData} = this.state;
  var result = studentData.filter(obj => {
    return obj.rollNumber === studentName
  })
  console.log(result)

  return (
      <div className="App">
        <ul>
          {
            filterData.map((value,key) => {
              return(
                <li key={key}>
                  Class {value.class}
                  <ul>
                    <li>
                      {value.section}
                      <button onClick={() => this.getDetails(value.rollNumber)}>
                        {value.name}
                      </button>
                    </li>
                  </ul>
                </li>
              )
            })
          }
        </ul>
        {
          result.map((data,key) => {
            return(
                <aside key={key}>
                  <p>
                    Name
                    <span>{data.name}</span>
                  </p>
                  <p>
                    Age
                    <span>{data.age}</span>
                  </p>
                  <p>
                    Gender
                    <span>{data.gender}</span>
                  </p>
                  <p>
                    Sports
                    <span>
                      {data.sports + ","}
                    </span>
                  </p>
                </aside>
          )
            })
          }
      </div>
    );
  }
}

