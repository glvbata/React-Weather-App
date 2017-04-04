import React from 'react';
import {IntlProvider, FormattedDate} from 'react-intl';
import Skycons from 'react-skycons';

export default class WeatherTile extends React.Component {
    constructor() {
        super();
    }

    toConvertTime(time) {
        const TIME_MULTIPLIER = 1000;

        return TIME_MULTIPLIER * time;
    }

    toMapWeatherIcon(icon) {
        let weatherIcon;

        switch (icon) {
            case 'clear-day':
                weatherIcon = 'CLEAR_DAY';
                break;
            case 'clear-night':
                weatherIcon = 'CLEAR_NIGHT';
                break;
            case 'rain':
                weatherIcon = 'RAIN';
                break;
            case 'snow':
                weatherIcon = 'SNOW';
                break
            case 'sleet':
                weatherIcon = 'SLEET';
                break
            case 'wind':
                weatherIcon = 'WIND';
                break
            case 'fog':
                weatherIcon = 'FOG';
                break
            case 'cloudy':
                weatherIcon = 'CLOUDY';
                break
            case 'partly-cloudy-day':
                weatherIcon = 'PARTLY_CLOUDY_DAY';
                break
            case 'partly-cloudy-night':
                weatherIcon = 'PARTLY_CLOUDY_NIGHT';
                break
            default:
                weatherIcon = 'CLEAR_DAY';
                break;
        }

        return weatherIcon;
    }

    render() {
        let weather = this.props;

        return (
            <div>
                <IntlProvider locale="en">
                    <div>
                        <h2><FormattedDate value={this.toConvertTime(weather.time)} weekday="long"/></h2>
                        <div className="weather-tile__container col-sm-2">
                            <div>Date: <FormattedDate value={this.toConvertTime(weather.time)} day="numeric" month="long"/></div>
                            <div>Summary: {weather.summary}</div>
                            <div><Skycons color='black' icon={this.toMapWeatherIcon(weather.icon)}/></div>
                            <div>Min Temperature: {weather.temperatureMin}°F at <FormattedDate value={this.toConvertTime(weather.temperatureMinTime)} day="numeric" month="long" hour="2-digit" minute="2-digit" /></div>
                            <div>Max Temperature: {weather.temperatureMax}°F at <FormattedDate value={this.toConvertTime(weather.temperatureMaxTime)} day="numeric" month="long" hour="2-digit" minute="2-digit" /> </div>
                        </div>
                    </div>
                </IntlProvider>
            </div>
        );
    }
}
