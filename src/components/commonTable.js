import React from 'react';
import {  Table } from 'react-bootstrap';

const CommonTable = (props) => {
  const {
    tHeadList,
    tBodyList
  } = props;
  return (
    <Table responsive id="myTable">
        <thead>
          <tr>
            {tHeadList.map((th, index) => {
              return (
                  <th key={index}>{th}</th>
                )
            })}
          </tr>
        </thead>
        <tbody>
          {tBodyList}      
        </tbody>
    </Table>
  );
}

export default CommonTable;
