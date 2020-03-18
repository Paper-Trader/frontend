import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { addToWatchList } from "../../actions";
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
import BuyStock from './Buy';
import SellStock from './Sell';
import SideNav from '../nav/SideNav';

function Stock(props) {
  const [companyInfo, setCompanyInfo] = useState({});
  const [graphInfo, setGraphInfo] = useState([]);
  const [lowHighCashPerc, setLowHighCashPerc] = useState([]);
  const [loading, setLoading] = useState(true);
  const company = props.match.params.id;

  // function formatDate(date) {
  //   var d = new Date(date),
  //     month = "" + (d.getMonth() + 1),
  //     day = "" + d.getDate(),
  //     year = d.getFullYear();
  //   if (month.length < 2) month = "0" + month;
  //   if (day.length < 2) day = "0" + day;
  //   return [year, month, day].join("-");
  // }

  const green = { color: "green" },
    red = { color: "red" };

  useEffect(() => {
    if (lowHighCashPerc.length > 0) {
      setLoading(false);
    } else {
      axios
        .get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${company}&interval=60min&apikey=${process.env.ALPHA_KEY}`)
        .then(data => {
          let newArr = [];
          let time = Object.keys(data.data["Time Series (60min)"])[0] // creates a var for most recent date, ex; '2020-01-08'
          for (const key in data.data["Time Series (60min)"]) {
            if (key.includes(time.slice(0, (time.length/2)+1))) { // checks if the key contains the variable above
              newArr.push({
                ...data.data["Time Series (60min)"][key],
                timestamp: key.split(" ")[1],
                price: data.data["Time Series (60min)"][key]["1. open"]
              });
            }
          }
          let high = newArr[0]["2. high"];
          let low = newArr[0]["3. low"];
          newArr.forEach(obj => {
            if (obj["3. low"] < low) {
              low = obj["3. low"];
            }
            if (obj["2. high"] > high) {
              high = obj["2. high"];
            }
          });
          setGraphInfo(newArr.reverse());
          let cash = newArr[newArr.length - 1]["4. close"] - newArr[0].price;
          let perc = (cash / Math.abs(newArr[0].price)) * 100;
          setLowHighCashPerc([low, high, cash.toFixed(2), perc.toFixed(2)]);
        });
      axios
        .get(
          `https://financialmodelingprep.com/api/v3/company/profile/${company}`
        )
        .then(data => {
          setCompanyInfo(data.data.profile);
        });
    }
  }, [lowHighCashPerc, company]);

  return loading ? (
    <Loader type="BallTriangle" color="#00BFFF" height={100} width={100} />
  ) : (
    <div className="homeuser">
      <SideNav />
      <div className="stock-container">
        <div className="topbar">
          <div className="description">
            <h1>
              {company} <span>{companyInfo.companyName}</span>
            </h1>
            <h3>{`$${parseFloat(graphInfo[graphInfo.length - 1]["4. close"])}`}</h3>
            <h4>
              {lowHighCashPerc[2] < 0 ? (
                <span style={red}>{`-$${lowHighCashPerc[2]
                  .toString()
                  .substring(1)}`}</span>
              ) : (
                <span style={green}>{`$${lowHighCashPerc[2]}`}</span>
              )}
              {lowHighCashPerc[3].toString().includes("-") ? (
                <span
                  style={red}
                >{`  (${lowHighCashPerc[3].toString()}%)  Today`}</span>
              ) : (
                <span style={green}>{`  (${lowHighCashPerc[3]}%)  Today`}</span>
              )}
            </h4>
          </div>
          <button 
            style={
              lowHighCashPerc[3].toString().includes("-") ?
              { backgroundColor: "red" } :
              { backgroundColor: "green" }
            }
            onClick={() => props.addToWatchList(company)}>
            WATCH
          </button>
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
              domain={[Number(lowHighCashPerc[0]), Number(lowHighCashPerc[1])]}
            />
            <Tooltip />
            {lowHighCashPerc[2] < 0 ? (
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
        <div>
          <BuyStock currPrice={graphInfo} company={company}/>
          <SellStock currPrice={graphInfo} company={company}/>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  stock: state.stock
});

export default connect(mapStateToProps, { addToWatchList })(Stock);