import React from 'react';
import { connect } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  {name: '9:00AM', value: 10000.12},
  {name: '10:00AM', value: 10300.24},
  {name: '11:00AM', value: 10300.78},
  {name: '12:00PM', value: 10500.45},
  {name: '1:00PM', value: 10300.57},
  {name: '2:00PM', value: 10100.78},
  {name: '3:00PM', value: 9990.57},
  {name: '4:00PM', value: 9800.36}
];

function PortfolioChart() {
  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="#DC4A7F"
            strokeWidth={3}
            dot={false}
          />
          <YAxis hide={true} domain={['dataMin - 1500', 'dataMax + 1500']} />
          <XAxis dataKey="name" hide={true} stroke="#DC4A7F" />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

const mapStateToProps = state => ({
})

export default connect(mapStateToProps, {})(PortfolioChart);