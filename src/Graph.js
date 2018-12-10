import React, { Component } from "react";
import Plot from "react-plotly.js";

class Graph extends Component {
  render() {
    let data = [
        {
          x: this.props.xData,
          y: this.props.yData,
          marker: { color: "red" }
        }
      ],
      config = { displayModeBar: false };

    return <Plot data={data} config={config} />;
  }
}

export default Graph;
