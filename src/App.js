import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    //initializing the state after loading the page
    this.state = {
      location: "",
      data: {},
      date: [],
      temps: []
    };
    this.changeLocation = this.changeLocation.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }

  fetchData(e) {
    e.preventDefault();

    console.log(process.env.REACT_APP_API_ID);

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
          temps
        });
      });
  }

  changeLocation(e) {
    // console.log("data", this);
    this.setState({ location: e.target.value });
  }

  render() {
    console.log("render", this);
    let currentTemp = "Specify a location";
    if (this.state.data.list) {
      currentTemp = this.state.data.list[0].main.temp;
    }
    return (
      <div>
        <h1>Weather Report</h1>
        <h3>Our app provides city based forecast for next 7days</h3>
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
        <p>{currentTemp}</p>
      </div>
    );
  }
}

export default App;
