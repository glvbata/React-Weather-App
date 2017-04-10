import React from 'react';
import {IntlProvider, FormattedDate} from 'react-intl';
import Skycons from 'react-skycons';
import WeatherTile from 'WeatherTile';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

export default class WeatherTileDetailed extends WeatherTile {
    constructor() {
        super();
    }

    render() {
        let weather = this.props;
        let generalChartData = weather.hourlyData;

        return (
            <div className="weather-tile-detailed col-sm-12">
                <IntlProvider locale="en">
                    <div>
                        <h2 className="text-center"><FormattedDate value={this.toConvertTime(weather.time)} weekday="long"/></h2>
                        <div className="weather-tile-detailed__container col-sm-12 col-md-4 text-center">
                            <div>Date: <FormattedDate value={this.toConvertTime(weather.time)} day="numeric" month="long"/></div>
                            <div>Summary: {weather.summary}</div>
                            <div><Skycons color='black' icon={this.toMapWeatherIcon(weather.icon)}/></div>
                            <div>Min Temperature: {weather.temperatureMin}°F at <FormattedDate value={this.toConvertTime(weather.temperatureMinTime)} day="numeric" month="long" hour="2-digit" minute="2-digit" /></div>
                            <div>Max Temperature: {weather.temperatureMax}°F at <FormattedDate value={this.toConvertTime(weather.temperatureMaxTime)} day="numeric" month="long" hour="2-digit" minute="2-digit" /></div>
                        </div>
                        <div className="weather-tile-detailed__chart col-md-6 hidden-xs hidden-sm">
                            <LineChart width={992} height={300} data={generalChartData}
                                margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                            <XAxis dataKey={function(x) {return new Date(x.time * 1000).getHours()}}/>
                            <YAxis/>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <Tooltip/>
                            <Legend />
                            <Line type="monotone" dataKey="precipProbability" stroke="#8884d8"/>
                            <Line type="monotone" dataKey="humidity" stroke="#000"/>
                            </LineChart>
                        </div>
                    </div>
                </IntlProvider>
            </div>
        );
    }
}
