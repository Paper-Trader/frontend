import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchStock } from '../actions';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

function Stock(props) {

  const mockData = [
    {
      ticker: new Date(Date.now()).toTimeString().split(' ')[0],
      price: 5
    },
    {
      ticker: new Date(Date.now() + 1000*60*5).toTimeString().split(' ')[0],
      price: 10
    },
    {
      ticker: new Date(Date.now() + 1000*60*10).toTimeString().split(' ')[0],
      price: 15
    },
    {
      ticker: new Date(Date.now() + 1000*60*15).toTimeString().split(' ')[0],
      price: null
    },
    {
      ticker: new Date(Date.now() + 1000*60*20).toTimeString().split(' ')[0],
      price: 20
    },
  ]

  useEffect(() => {
    // runs every 30 minutes
    setInterval(() => {
      props.fetchStock()
    }, 1000*60*30)
  }, []);

  return (
    <>
    <div>
      {props.stock.ticker}
      {props.stock.price}
    </div>
  <LineChart
    width={500}
    height={200}
    data={mockData}
    margin={{
      top: 10, right: 30, left: 0, bottom: 0,
    }}
  >
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="ticker" />
    <YAxis />
    <Tooltip />
    <Line connectNulls type="monotone" dataKey="price" stroke="#8884d8" fill="#8884d8" />
  </LineChart>
  </>
  );
}

const mapStateToProps = state => ({
  stock: state.stock
})

export default connect(mapStateToProps, {fetchStock})(Stock);