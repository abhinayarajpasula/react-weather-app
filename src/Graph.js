import React, { Component } from "react";
import propTypes from "prop-types";
import isEqual from "lodash.isequal";
import Plot from "react-plotly.js";

class Graph extends Component {
  shouldComponentUpdate(nextProps) {
    console.log(
      "Comparing current and next props",
      isEqual(this.props, nextProps)
    );
    return !isEqual(this.props, nextProps);
  }

  componentDidMount() {
    console.log("Graph component mounted");
  }

  componentDidUpdate() {
    console.log("Graph component updated");
  }

  render() {
    let data = [
        {
          x: this.props.xData,
          y: this.props.yData,
          type: "scatter",
          marker: { color: "#D83F87" }
        }
      ],
      config = { displayModeBar: false };
    return (
      <Plot
        data={data}
        config={config}
        useResizeHandler={this.props.isResponsive}
        onClick={this.props.onPlotClick}
        style={{ width: "100%", height: "100%" }}
        layout={{
          autosize: true,
          plot_bgcolor: "#4B0082",
          paper_bgcolor: "#4B0082",
          margin: {
            t: 0,
            r: 50,
            l: 50
          },
          font: {
            color: "#FFF"
          }
        }}
      />
    );
  }
}

Graph.propTypes = {
  xData: propTypes.array.isRequired,
  yData: propTypes.array.isRequired,
  isResponsive: propTypes.bool,
  onPlotClick: propTypes.func.isRequired
};

export default Graph;
