import React from 'react';
import {IntlProvider, FormattedDate} from 'react-intl';
import Skycons from 'react-skycons';
import WeatherTile from 'WeatherTile';

export default class WeatherTileDetailed extends WeatherTile {
    constructor() {
        super();
    }

    render() {
        let weather = this.props;

        return (
            <div className="weather-tile-detailed col-sm-12 text-center">
                <IntlProvider locale="en">
                    <div>
                        <h2><FormattedDate value={this.toConvertTime(weather.time)} weekday="long"/></h2>
                        <div className="weather-tile-detailed__container">
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
