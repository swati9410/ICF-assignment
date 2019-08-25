import React from 'react';
import { Table } from 'react-bootstrap';

const FlightTable = (props) => {
    const {
        tHeadList,
        tBodyList
    } = props;
    return (
        <Table responsive hover size="sm" className="flight-table">
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

export default FlightTable;
