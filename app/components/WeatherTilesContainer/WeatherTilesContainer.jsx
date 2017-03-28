import React from 'react';
import _ from 'lodash';
import ApiService from 'app/services/ApiService.js';
import WeatherTile from 'WeatherTile';
import WeatherTileDetailed from 'WeatherTileDetailed';

export default class WeatherTilesContainer extends React.Component {
    constructor() {
        super();
        this.state = {
            weatherData: [],
            weatherDataWeek: [],
            weatherDataToday: {
                summary: 'Default',
                time: 0,
                icon: 'Default',
                temperatureMin: 0,
                temperatureMinTime: 999,
                temperatureMax: 0,
                temperatureMaxTime: 999,
                hourly: []
            }

        };
    }

    componentWillMount() {
        this.weatherServiceCall();
    }

    weatherServiceCall() {
        let url = 'http://localhost:1337/api/darksky';
        ApiService(url, this.onWeatherDataSuccess);
    }

    onWeatherDataSuccess = (weatherData) => {
        const today = weatherData.daily.data[0];

        this.setState({
            weatherDataWeek: _.slice(weatherData.daily.data, 1, weatherData.daily.data.length),
            weatherDataToday: {
                summary: today.summary,
                time: today.time,
                icon: today.icon,
                temperatureMin: today.temperatureMin,
                temperatureMinTime: today.temperatureMinTime,
                temperatureMax: today.temperatureMax,
                temperatureMaxTime: today.temperatureMaxTime,
                hourly: weatherData.hourly
            }
        });
    }

    onWeatherDataFailure = (error) => {

    }

    render() {
        let today = this.state.weatherDataToday;
        let weatherWeek = _.map(this.state.weatherDataWeek, (weather) => {
           return (
               <li key={weather.time}>
                   <WeatherTile
                       summary={weather.summary}
                       time={weather.time}
                       icon={weather.icon}
                       temperatureMin={weather.temperatureMin}
                       temperatureMinTime={weather.temperatureMinTime}
                       temperatureMax={weather.temperatureMax}
                       temperatureMaxTime={weather.temperatureMaxTime}>
                   </WeatherTile>
               </li>
           );
       });

        return (
            <div>
                <h2>WeatherTilesContainer Component</h2>
                <WeatherTileDetailed
                    summary={today.summary}
                    time={today.time}
                    icon={today.icon}
                    temperatureMin={today.temperatureMin}
                    temperatureMinTime={today.temperatureMinTime}
                    temperatureMax={today.temperatureMax}
                    temperatureMaxTime={today.temperatureMaxTime}
                    hourlyData={today.hourly}>
                </WeatherTileDetailed>
                <ul>
                    {weatherWeek}
                </ul>
            </div>
        );
    }
}
