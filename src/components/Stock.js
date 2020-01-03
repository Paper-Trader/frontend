import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchStock } from "../actions";
import Loader from "react-loader-spinner";
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
  const [loading, setLoading] = useState(true);

  const company = "GE";

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
    if (lowHigh.length > 0) {
      setLoading(false);
    } else {
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
                timestamp: key.split(" ")[1],
                price: data.data["Time Series (60min)"][key]["1. open"]
              });
            }
          }
          high = newArr[0]["2. high"];
          low = newArr[0]["3. low"];

          newArr.forEach(obj => {
            if (obj["3. low"] < low) {
              low = obj["3. low"];
            }
            if (obj["2. high"] > high) {
              high = obj["2. high"];
            }
          });
          setGraphInfo(newArr.reverse());
          setLowHigh([low, high]);
        });
      axios
        .get(
          `https://financialmodelingprep.com/api/v3/company/profile/${company}`
        )
        .then(data => {
          setCompanyInfo(data.data.profile);
        });
    }
  }, [lowHigh]);

  const green = {
    color: "green"
  };

  const red = {
    color: "red"
  };

  return loading ? (
    <Loader type="BallTriangle" color="#00BFFF" height={100} width={100} />
  ) : (
    <div className="stock-container">
      <div className="topbar">
        <div className="description">
          <h1>
            {company} <span>{companyInfo.companyName}</span>
          </h1>
          <h3>{`$${companyInfo.price}`}</h3>
          <h4>
            {companyInfo.changes < 0 ? (
              <span style={red}>{`-$${companyInfo.changes
                .toString()
                .substring(1)}`}</span>
            ) : (
              <span style={green}>{`$${companyInfo.changes}`}</span>
            )}
            {companyInfo.changesPercentage.includes("-") ? (
              <span
                style={red}
              >{`  ${companyInfo.changesPercentage.toString()}  Today`}</span>
            ) : (
              <span
                style={green}
              >{`  ${companyInfo.changesPercentage}  Today`}</span>
            )}
          </h4>
        </div>
        {/* <img src="/plus-solid.svg" style={{ width: "30px" }} /> */}
        <button>WATCH</button>
      </div>
      <ResponsiveContainer height={300} width="100%">
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
          <YAxis
            hide={true}
            domain={[Number(lowHigh[0]), Number(lowHigh[1])]}
          />
          <Tooltip />
          {companyInfo.changes < 0 ? (
            <Line
              connectNulls
              type="monotone"
              dataKey="price"
              strokeWidth="3"
              stroke="red"
              dot={false}
            />
          ) : (
            <Line
              connectNulls
              type="monotone"
              dataKey="price"
              strokeWidth="3"
              stroke="green"
              dot={false}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
// }

const mapStateToProps = state => ({
  stock: state.stock
});

export default connect(mapStateToProps, { fetchStock })(Stock);
