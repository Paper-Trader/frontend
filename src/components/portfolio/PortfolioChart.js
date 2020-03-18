import React from 'react';
import { connect } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

const data = [
  {name: '9:00AM', value: 12000.12},
  {name: '10:00AM', value: 11002.24},
  {name: '11:00AM', value: 10751.78},
  {name: '12:00PM', value: 9725.45},
  {name: '1:00PM', value: 10515.57},
  {name: '2:00PM', value: 9686.78},
  {name: '3:00PM', value: 9651.57},
  {name: '4:00PM', value: 9701.36}
];

function PortfolioChart({ dailyChange }) {
  return (
    <div>
      {/* chart for dashboard page, x and y axis are hidden*/}
      <LineChart width={400} height={400} data={data}>
        <Line 
          type="monotone" 
          dataKey="value" 
          stroke={dailyChange.toString().includes("-") ? "red" : "green"}
          strokeWidth={3}
          dot={false}
        />
        <YAxis hide={true} domain={['dataMin - 500', 'dataMax + 500']} />
        <XAxis dataKey="name" hide={true} stroke="#8884d8" />
        <Tooltip />
      </LineChart>
    </div>
  );
}

const mapStateToProps = state => ({
  dailyChange: state.dailyChange
})

export default connect(mapStateToProps, {})(PortfolioChart);