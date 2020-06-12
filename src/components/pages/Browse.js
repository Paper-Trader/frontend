import React, { useState } from "react";
import { connect } from 'react-redux';
import SideNav from '../nav/SideNav';
import { data } from '../../assets/company_data';
import { Table } from 'semantic-ui-react';
import Pagination from '../views/Pagination';

function Browse(props) {
  const [stockSearch, setStockSearch] = useState('');
  const filterOnChange = (e) => {
    setStockSearch(e.target.value);
  }

  let filteredStock = data
    .filter(stockName => stockName.Symbol.indexOf(stockSearch.toUpperCase()) !== -1)
    .slice((props.currPage * 15 ) - 15, props.currPage * 15)

  return (
    <div className="browse-container">
      <SideNav />
      <div className="browse-content">
        <input 
          className="search_name"
          type="text"
          placeholder="Search Stock Symbol"
          value={stockSearch}
          onChange={filterOnChange}
        />
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Symbol</Table.HeaderCell>
              <Table.HeaderCell>Company Name</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {filteredStock.map(stock => {
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
        <Pagination />
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  currPage: state.currPage,
})

export default connect(mapStateToProps, null)(Browse);
