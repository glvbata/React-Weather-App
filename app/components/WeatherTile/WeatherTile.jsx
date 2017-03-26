import React from 'react';
import _ from 'lodash';
import ApiService from 'app/services/ApiService.js';

export default class WeatherTile extends React.Component{
    constructor() {
        super();
        this.state = {};
    }

    componentWillMount() {
        let url = 'http://localhost:1337/api/darksky';

        ApiService(url, this.onWeatherDataSuccess)
    }

    onWeatherDataSuccess = (weatherData) => {
        this.setState({
            weatherData: weatherData.daily.data
        });
    }

    onWeatherDataFailure = (error) => {

    }

    render() {
        let weatherWeek = _.map(this.state.weatherData, (weather) => {
            return <li>{weather.summary}</li>
        });

        return (
            <div>
                <h2>WeatherTile Component</h2>
                <ul>
                    {weatherWeek}
                </ul>
            </div>
        );
    }
}
