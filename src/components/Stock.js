import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchStock } from "../actions";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import axios from "axios";

function Stock(props) {
  const [companyInfo, setCompanyInfo] = useState({});
  const [graphInfo, setGraphInfo] = useState([]);
  const [lowHigh, setLowHigh] = useState([]);

  const company = "AAPL";

  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    return [year, month, day].join("-");
  }

  let high, low;

  useEffect(() => {
    // runs every 30 minutes
    // company variable will need to be changed depending on what prop is being passed in
    axios
      .get(
        `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${company}&interval=60min&apikey=GLZW25M1M9C0O9XZ`
      )
      .then(data => {
        let newArr = [];
        for (const key in data.data["Time Series (60min)"]) {
          if (key.includes(formatDate(Date.now()))) {
            newArr.push({
              ...data.data["Time Series (60min)"][key],
              timestamp: key.split(" ")[1]
            });
          }
        }
        setGraphInfo(newArr.reverse());
        high = newArr[0]["1. open"];
        low = newArr[0]["1. open"];

        newArr.forEach(obj => {
          if (obj["3. low"] < low) {
            low = obj["3. low"];
          }
          if (obj["2. high"] > high) {
            high = obj["2. high"];
          }
        });
        console.log("after forEach: ", low, high);
        setLowHigh([low, high]);
      });
    axios
      .get(
        `https://financialmodelingprep.com/api/v3/company/profile/${company}`
      )
      .then(data => {
        console.log("Company info: ", data.data.profile);
        setCompanyInfo(data.data.profile);
      });
  }, []);

  console.log("Graph Info: ", graphInfo);

  return (
    <>
      {console.log("Low high value in return:", lowHigh)}
      <h1>
        {companyInfo.companyName}({company}) <span>{companyInfo.price}</span>
      </h1>
      <LineChart
        width={500}
        height={200}
        data={graphInfo}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="timestamp" />
        <YAxis domain={[lowHigh[0], lowHigh[1]]} />
        <Tooltip />
        <Line
          connectNulls
          type="monotone"
          dataKey="1. open"
          stroke="#8884d8"
          fill="#8884d8"
        />
      </LineChart>
    </>
  );
}

const mapStateToProps = state => ({
  stock: state.stock
});

export default connect(mapStateToProps, { fetchStock })(Stock);
