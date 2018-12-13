import React, { Component } from "react";

import Graph from "./Graph";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    //initializing the state after loading the page
    this.state = {
      location: "",
      data: {},
      dates: [],
      temps: [],
      selected: {
        date: null,
        temp: null
      }
    };
    this.changeLocation = this.changeLocation.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.onPlotClick = this.onPlotClick.bind(this);
    // this.onPlotHover = this.onPlotHover.bind(this);
  }

  componentDidMount() {
    console.log("App component mounted");
  }

  componentDidUpdate() {
    console.log("App component updated");
  }

  fetchData(e) {
    e.preventDefault();
    if (!process.env.REACT_APP_API_ID) {
      console.log("Please enter api key provided from openweathermap.org");
      return;
    }

    let location = encodeURIComponent(this.state.location);
    let url = `http://api.openweathermap.org/data/2.5/forecast?q=${location}&APPID=${
      process.env.REACT_APP_API_ID
    }&units=metric`;

    const dates = [];
    const temps = [];
    const selected = {
      date: null,
      temp: null
    };

    fetch(url)
      .then(response => response.json())
      .then(data => {
        const list = data.list;
        for (let i = 0; i < list.length; i++) {
          dates.push(list[i].dt_txt);
          temps.push(list[i].main.temp);
        }

        this.setState({
          data,
          dates,
          temps,
          selected
        });
      })

      .catch(error => console.log("error has occurred"));
  }

  changeLocation(e) {
    // console.log("data", this);
    this.setState({ location: e.target.value });
  }

  onPlotClick(data) {
    if (data.points) {
      const date = data.points[0].x;
      const temp = data.points[0].y;
      console.log(this);
      this.setState({
        selected: {
          date: date,
          temp: temp
        }
      });
    }
  }

  render() {
    console.log("render", this);
    let currentTemp = "Specify a location";
    if (this.state.data.list) {
      currentTemp = this.state.data.list[0].main.temp;
    }
    return (
      <div className="wrapper">
        <h1>Weather Report</h1>
        <p className="description">
          Our app provides city based forecast for next 5days
        </p>
        <form onSubmit={this.fetchData}>
          <label>
            Please enter the city name
            <input
              type="text"
              placeholder="City, Country"
              value={this.state.location}
              onChange={this.changeLocation}
            />
          </label>
        </form>
        <div className="temp-data">
          {currentTemp !== undefined ? (
            <span>
              <span>Current temperature of the day: &nbsp;</span>
              <span className="color-adjust">{currentTemp}</span>
              <span> &deg;C</span>
            </span>
          ) : null}
          {this.state.selected.temp !== null ? (
            <p className="selected-temp">
              {`Selected Temperature: ${this.state.selected.temp}`}
              <span> &deg;C</span>
            </p>
          ) : null}
          {this.state.selected.temp !== null ? (
            <p className="selected-date">{`${this.state.selected.date}`}</p>
          ) : null}
        </div>
        {this.state.data.list ? (
          <div className="graph-wrapper">
            <Graph
              xData={this.state.dates}
              yData={this.state.temps}
              isResponsive={true}
              onPlotClick={this.onPlotClick}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

export default App;
