import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


function CityWeatherWidget(props) {
  return (
    <div>
      <h1> City: {props.cityName} </h1>
      <h2> Description: {props.description} </h2>
    </div>
  )
}



class App extends Component {

  constructor() {
    super();

    this.state = {
      cityName: "n/a",
      description: "n/a"
    }
  }



  fetchWeatherData() {

    const self = this;

    const API_KEY = "8c0144ddd2a30874b2ccb3a0f4a4bc41";

    const city = this.inputField.value


    const endpoint = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

    fetch(endpoint)
      .then(function (response) {
        return response.json();
      })
      .then(function (cityWeatherData) {

        if (cityWeatherData.cod == 200) {
          self.setState({
            cityName: cityWeatherData.name,
            description: cityWeatherData.weather[0].description
          })
        }
        else {
          alert(`cant find weather data for city: ${city}  (Status Code: ${cityWeatherData.cod})`)
        }



      });




  }


  render() {
    return (
      <div className="App">

        <CityWeatherWidget
          cityName={this.state.cityName}
          description={this.state.description} />


        <input type="text" ref={(el) => { this.inputField = el }} />

        <button onClick={() => { this.fetchWeatherData() }} >
          Fetch Weather Data
        </button>

      </div >
    );
  }
}

export default App;
