import React, { Component } from "react";
import Plot from "react-plotly.js";
import propTypes from "prop-types";
import isEqual from "lodash.isequal";

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
    // console.log("componentDidMount", this);
  }

  componentDidUpdate() {
    console.log("Graph component updated");
    // console.log("componentDidUpdate", this);
  }

  render() {
    let data = [
        {
          x: this.props.xData,
          y: this.props.yData,
          marker: { color: "red" }
        }
      ],
      config = { displayModeBar: false };

    return (
      <React.Fragment>
        <h3>Forecast</h3>
        <Plot
          data={data}
          config={config}
          onClick={this.props.onPlotClick}
          // onPlotHover={this.props.onPlotHover}
        />
      </React.Fragment>
    );
  }
}

Graph.propTypes = {
  xData: propTypes.array.isRequired,
  yData: propTypes.array.isRequired,
  onPlotClick: propTypes.func.isRequired
};

export default Graph;
