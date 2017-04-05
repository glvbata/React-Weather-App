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
            <div className="weather-tile col-xs-8 col-xs-offset-2 col-md-2 col-md-offset-0">
                <IntlProvider locale="en">
                    <div>
                        <div className="weather-tile__container">
                            <div className="weather-tile__card">
                                <div className="weather-tile__card-front">
                                    <div className="weather-tile__skycon-container">
                                        <Skycons className="weather-tile__skycon" color='black' icon={this.toMapWeatherIcon(weather.icon)}/>
                                    </div>
                                        <div className="weather-tile__info">
                                            <h3 className="weather-tile__day"><FormattedDate value={this.toConvertTime(weather.time)} weekday="long"/></h3>
                                            <p className="weather-tile__date"><FormattedDate value={this.toConvertTime(weather.time)} day="numeric" month="long"/></p>
                                            <p className="tweather-tile__summary">
                                                "{weather.summary}"
                                            </p>
                                            <div>Min: {weather.temperatureMin}°F <FormattedDate value={this.toConvertTime(weather.temperatureMinTime)} hour="2-digit" minute="2-digit" /></div>
                                            <div>Max: {weather.temperatureMax}°F <FormattedDate value={this.toConvertTime(weather.temperatureMaxTime)} hour="2-digit" minute="2-digit" /></div>
                                        </div>
                                </div>
                                <div className="weather-tile__card-back">
                                    <h5>More Details</h5>
                                    <div className="weather-tile__info ">
                                        <h4 className="text-center">More Description!</h4>
                                        <p className="text-center">Blablabll</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </IntlProvider>
            </div>
        );
    }
}
