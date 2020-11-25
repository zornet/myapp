import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {  LineChart,  Line,  XAxis, YAxis, CartesianGrid, Tooltip,  Legend,} from "recharts";


class Statistics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      statistics: [],
    };
  }

  componentDidMount() {
    this.getStatistics();
  }

  getStatistics() {
    let url = "http://127.0.0.1:5000/api/tickets/statistics";
    fetch(url)
      .then((response) => response.json())
      .then((statistics) => this.setState({ statistics: statistics }));
  }

  render() {
    return (
      <div>
        <LineChart
          width={900}
          height={540}
          data={this.state.statistics}
          margin={{
            top: 70,
            right: 30,
            left: 10,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="days" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="tickets"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </div>
    );
  }
}

export default Statistics;
