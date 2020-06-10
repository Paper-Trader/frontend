import React from 'react';
import { connect } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  {name: '9:00AM', value: 14000.12},
  {name: '10:00AM', value: 14300.24},
  {name: '11:00AM', value: 14100.78},
  {name: '12:00PM', value: 14500.45},
  {name: '1:00PM', value: 14600.57},
  {name: '2:00PM', value: 14700.78},
  {name: '3:00PM', value: 14900.57},
  {name: '4:00PM', value: 15009.36}
];

function PortfolioChart() {
  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="#00D1C5"
            strokeWidth={3}
            dot={false}
          />
          <YAxis hide={true} domain={['dataMin - 1500', 'dataMax + 1500']} />
          <XAxis dataKey="name" hide={true} stroke="#8884d8" />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

const mapStateToProps = state => ({
})

export default connect(mapStateToProps, {})(PortfolioChart);