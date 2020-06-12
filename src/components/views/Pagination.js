import React from 'react';
import { connect } from 'react-redux';
import { changePage } from '../../actions/index';
import { Pagination } from 'semantic-ui-react';

const PaginationPage = (props) => {
  const handlePaginationChange = (e, currPage) => {
    e.preventDefault();
    props.changePage(currPage.activePage)
  }

  return (
    <div className="pagination-div">
      <Pagination 
        totalPages={241} 
        activePage={props.currPage}
        onPageChange={handlePaginationChange}
      />
    </div>
  )
}

const mapStateToProps = state => ({
  currPage: state.currPage,
})

export default connect(mapStateToProps, { changePage })(PaginationPage);