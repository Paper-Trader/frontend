// Import all dependencies 
import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip,
} from 'recharts';


const data = [
  { time: '9:00 AM', price: 2.34 },
  { time: '10:00 AM', price: 5.09 },
  { time: '11:00 AM', price: 3.50 },
  { time: '12:00 AM' },
  { time: '1:00 AM', price: 3.75 },
  { time: '2:00 AM', price: 4.02 },
  { time: '3:00 AM', price: 3.20 },
  { time: '4:00 AM', price: 4.68 },
];

export default function WatchList(){

  return (
    <div>
      <LineChart
        width={500}
        height={200}
        data={data}
        margin={{
          top: 10, right: 30, left: 0, bottom: 0,
        }}
      >
        <XAxis dataKey="time" hide={true} domain={['priceMin', 'priceMax']}/>
        <YAxis />
        <Tooltip />
        <Line connectNulls type="monotone" dataKey="price" stroke="#8884d8" fill="#8884d8" />
      </LineChart>
    </div>
  );
}