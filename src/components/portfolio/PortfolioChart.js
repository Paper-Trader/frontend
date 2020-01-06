import React from 'react';
import { connect } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

const data = [
  {name: '9:00AM', value: 2500},
  {name: '9:30AM', value: 2530},
  {name: '10:00AM', value: 2550},
  {name: '10:30AM', value: 2480},
  {name: '11:00AM', value: 2450},
  {name: '11:30AM', value: 2470},
  {name: '12:00PM', value: 2450},
  {name: '12:30PM', value: 2530},
  {name: '1:00PM', value: 2600},
  {name: '1:30PM', value: 2600},
  {name: '2:00PM', value: 2620},
  {name: '2:30PM', value: 2550},
  {name: '3:00PM', value: 2600},
  {name: '3:30PM', value: 2640},
  {name: '4:00PM', value: 2600}
];

function PortfolioChart(props) {
  return (
    <div>
      {/* chart for dashboard page, x and y axis are hidden*/}
      <LineChart width={400} height={400} data={data}>
        <Line type="monotone" dataKey="value" stroke="#00D1C5" strokeWidth={3}/>
        <YAxis hide={true} domain={['dataMin - 100', 'dataMax + 100']} />
        <XAxis dataKey="name" hide={true} stroke="#8884d8" />
        <Tooltip />
      </LineChart>
    </div>
  );
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, {})(PortfolioChart);