import React from 'react';
import _ from 'lodash';
import ApiService from 'app/services/ApiService.js';
import WeatherTile from 'WeatherTile';
import WeatherTileDetailed from 'WeatherTileDetailed';
import Location from 'react-place';
import Spinner from 'react-spinkit';

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
            },
            hasLoaded: false
        };
    }

    componentWillMount() {
        let that = this;
        navigator.geolocation.getCurrentPosition(function(position) {
            that.onGeoLocationSuccess(position.coords.latitude, position.coords.longitude);
        });
    }

    onGeoLocationSuccess = (latitude, longitude) => {
        this.weatherServiceCall(latitude, longitude);
    }

    onGeoLocationFailure = (error) => {
        console.log(error);
    }

    weatherServiceCall(latitude, longitude) {
        let url = '/api/darksky?latitude=' + latitude + '&longitude=' + longitude;
        ApiService(url, this.onWeatherDataSuccess);
    }

    onWeatherDataSuccess = (weatherData) => {
        const today = weatherData.daily.data[0];

        this.setState({
            weatherDataWeek: _.dropRight(_.slice(weatherData.daily.data, 1, weatherData.daily.data.length), 1),
            weatherDataToday: {
                summary: today.summary,
                time: today.time,
                icon: today.icon,
                temperatureMin: today.temperatureMin,
                temperatureMinTime: today.temperatureMinTime,
                temperatureMax: today.temperatureMax,
                temperatureMaxTime: today.temperatureMaxTime,
                hourly: weatherData.hourly
            },
            hasLoaded: true
        });
    }

    onWeatherDataFailure = (error) => {

    }

    changeLocation = (currentLocation) => {
        // Add get currentLocation if fail;
        let latitude = currentLocation.coords.lat;
        let longitude = currentLocation.coords.lng;
        let location = currentLocation.description;

        this.setState({location, hasLoaded: false});
        this.weatherServiceCall(latitude, longitude);
    }

    render() {
        let today = this.state.weatherDataToday;
        let weatherWeek = _.map(this.state.weatherDataWeek, (weather) => {
           return (
               <WeatherTile
                   summary={weather.summary}
                   time={weather.time}
                   icon={weather.icon}
                   temperatureMin={weather.temperatureMin}
                   temperatureMinTime={weather.temperatureMinTime}
                   temperatureMax={weather.temperatureMax}
                   temperatureMaxTime={weather.temperatureMaxTime}>
               </WeatherTile>
           );
        });

        return (
            <div className="weather-tiles-container__main col-sm-12">
                <h2 className="weather-tiles-container__header">{this.state.location} Weather Forecast</h2>
                <Location
                    country='US'
                    noMatching='Was not able to locate {{value}}.'
                    onLocationSet={ this.changeLocation }
                    inputProps={{
                        className:'weather-tiles-container__location',
                        placeholder: 'Search another city'
                    }}
                />

                {this.state.hasLoaded ? (
                    <div>
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
                        {weatherWeek}
                    </div>
                ) : (
                    <div className="weather-tile-container__spinner">
                        <Spinner spinnerName='three-bounce' />
                    </div>
                )}
            </div>
        );
    }
}
