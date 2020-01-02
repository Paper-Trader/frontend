import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchStock } from '../actions';

function Stock(props) {
  useEffect(() => {
    props.fetchStock()
  }, []);

  return (
    <div>
      {props.stock.ticker}
      {props.stock.price}
    </div>
  );
}

const mapStateToProps = state => ({
  stock: state.stock
})

export default connect(mapStateToProps, {fetchStock})(Stock);