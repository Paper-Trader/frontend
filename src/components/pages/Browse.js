import React from "react";
import SideNav from '../nav/SideNav';
import { data } from '../../assets/company_data';
import { Table } from 'semantic-ui-react'

function Browse(props) {
  return (
    <div className="browse-container">
      <SideNav />
      <div className="browse-content">
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Symbol</Table.HeaderCell>
              <Table.HeaderCell>Company Name</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data.map(stock => {
                return <Table.Row 
                  key={stock.Symbol} 
                  className="stock_cell"
                  onClick={() => props.history.push(`/stock/${stock.Symbol}`)}>
                  <Table.Cell>{stock.Symbol}</Table.Cell>
                  <Table.Cell>{stock.Name}</Table.Cell>
                </Table.Row>})
            }
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}

export default Browse;
