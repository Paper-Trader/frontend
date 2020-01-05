import React, { useState, useEffect } from "react";
import Loader from "react-loader-spinner";
import { connect } from "react-redux";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip,
  ResponsiveContainer
} from "recharts";
import axios from "axios";
import { fetchStock } from "../../actions";

function Stock() {

  const [companyInfo, setCompanyInfo] = useState({});
  const [graphInfo, setGraphInfo] = useState([]);
  const [lowHighCashPerc, setLowHighCashPerc] = useState([]);
  const [loading, setLoading] = useState(true);

  // KB: change to state
  const company = "TWTR";

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
  let cash, perc;
  const green = { color: "green" },
    red = { color: "red" };

  useEffect(() => {

    if (lowHighCashPerc.length > 0) {
      setLoading(false);
    } else {
      //KB: should we move this to redux?
      axios
        .get(
          `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${company}&interval=60min&apikey=${process.env.ALPHA_KEY}`
        )
        .then(data => {
          let newArr = [];
          for (const key in data.data["Time Series (60min)"]) {
            if (key.includes(formatDate(Date.now()))) {
              for (const key in data.data["Time Series (60min)"]) {
                newArr.push({
                  ...data.data["Time Series (60min)"][key],
                  timestamp: key.split(" ")[1],
                  price: data.data["Time Series (60min)"][key]["1. open"]
                });
              }
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
          cash = newArr[newArr.length - 1]["4. close"] - newArr[0].price;
          perc = (cash / Math.abs(newArr[0].price)) * 100;
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
  }, [lowHighCashPerc]);

  return loading ? (
    <Loader type="BallTriangle" color="#00BFFF" height={100} width={100} />
  ) : (
    <div className="stock-container">
      <div className="topbar">
        <div className="description">
          <h1>
            {company} <span>{companyInfo.companyName}</span>
          </h1>
          <h3>{`$${graphInfo[graphInfo.length - 1]["4. close"]}`}</h3>
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
    </div>
  );
}

const mapStateToProps = state => ({
  stock: state.stock
});

export default connect(mapStateToProps, { fetchStock })(Stock);