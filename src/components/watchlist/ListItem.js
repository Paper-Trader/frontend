// Import all dependencies 
import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import {
  LineChart, Line, XAxis, YAxis, Tooltip,
} from 'recharts';

export default function ListItem(props){
  const [companyInfo, setCompanyInfo] = useState({})
  const [graphInfo, setGraphInfo] = useState({})

  useEffect(() => {
    // runs every 30 minutes
    // company variable will need to be changed depending on what prop is being passed in
    axios
      .get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${company}&interval=60min&apikey=GLZW25M1M9C0O9XZ`)
      .then(data => {
        console.log("Graph info: ", data.data)
        setGraphInfo(data.data[]);
      })
    axios
      .get(`https://financialmodelingprep.com/api/v3/company/profile/${company}`)
      .then(data => {
        console.log("Company info: ", data.data.profile)
        setCompanyInfo(data.data.profile);
      })
    setInterval(() => {
      props.fetchStock()
    }, 1000*60*30)
  }, []);

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