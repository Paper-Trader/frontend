import React, { Component} from 'react';
import { PieChart, Pie, Sector, ResponsiveContainer } from 'recharts';
import { connect } from "react-redux";
import { fetchAll } from "../../actions";

const shapeData = (array) => {
  const output  = []
  for (let i = 0; i<array.length; i++) {
    const item = array[i]
    let formattedObject = {}
    formattedObject.name = item.symbol
    formattedObject.value = parseFloat((item.amount * item.price).toFixed(2))
    output.push(formattedObject)
  }
  return output
}

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, percent, value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{payload.name}</text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`$${value}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`${(percent * 100).toFixed(2)}% `}
      </text>
    </g>
  );
};


class PieChartComponent extends Component {
  constructor({stocks}){
    super()
    this.state  = {activeIndex: 0,data:shapeData(stocks)};
  }

  onPieEnter = (data, index) => {
    this.setState({
      activeIndex: index,
    });
  };

  render() {
    return (
      <ResponsiveContainer height={300} width={400}>
        <PieChart>
          <Pie
            activeIndex={this.state.activeIndex}
            activeShape={renderActiveShape}
            data={this.state.data}
            cx="50%"
            cy="30%"
            innerRadius={60}
            outerRadius={80}
            fill="#110034"
            dataKey="value"
            onMouseEnter={this.onPieEnter}
          />
        </PieChart>
      </ResponsiveContainer>
    );
  }
}
const mapStateToProps = state => ({
  stocks: state.portfolio.stocks,
  stockList: state.stockList,
  isFetching: state.isFetching,
});

export default connect(mapStateToProps,{fetchAll})(PieChartComponent);