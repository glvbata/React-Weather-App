import React from 'react';
import _ from 'lodash';
import ApiService from 'app/services/ApiService.js';
import WeatherTile from 'WeatherTile';
import WeatherTileDetailed from 'WeatherTileDetailed';
import Location from 'react-place';

export default class WeatherTilesContainer extends React.Component {
    constructor() {
        super();
        this.state = {
            location: 'Current Location',
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
        let that = this;
        that.onGeoLocationSuccess(47.6062095, -122.3320708);
    }

    onGeoLocationSuccess = (latitude, longitude) => {
        this.weatherServiceCall(latitude, longitude);
    }

    onGeoLocationFailure = (error) => {
        console.log(error);
    }

    weatherServiceCall(latitude, longitude) {
        let url = 'http://localhost:1337/api/darksky?latitude=' + latitude + '&longitude=' + longitude;
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

    changeLocation = (currentLocation) => {
        // Add get currentLocation if fail;
        let latitude = currentLocation.coords.lat;
        let longitude = currentLocation.coords.lng;
        let location = currentLocation.description;

        this.setState({location});
        this.weatherServiceCall(latitude, longitude);
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
                <h2>{this.state.location} Weather Forecast</h2>
                <Location
                    country='US'
                    noMatching='Was not able to locate {{value}}.'
                    onLocationSet={ this.changeLocation }
                    inputProps={{
                        style: {color: '#0099FF'},
                        className:'location',
                        placeholder: 'Which city are you located?'
                    }}
                />
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
