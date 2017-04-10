import React from 'react';
import {IntlProvider, FormattedDate} from 'react-intl';
import Skycons from 'react-skycons';
import WeatherTile from 'WeatherTile';
import {LineChart} from "react-chartjs";

export default class WeatherTileDetailed extends WeatherTile {
    constructor() {
        super();
    }

    render() {
        let weather = this.props;
        let chartData = {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [
                {
                    label: "My First dataset",
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: "rgba(75,192,192,0.4)",
                    borderColor: "rgba(75,192,192,1)",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "rgba(75,192,192,1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(75,192,192,1)",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [65, 59, 80, 81, 56, 55, 40],
                    spanGaps: false,
                }
            ]
        };

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
                        <LineChart data={chartData}/>
                    </div>
                </IntlProvider>
            </div>
        );
    }
}
