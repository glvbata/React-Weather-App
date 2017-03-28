import React from 'react';
import ReactDOM from 'react-dom';
import {Route, Router, IndexRoute, hashHistory} from 'react-router';
import Main from 'Main';
import WeatherTilesContainer from 'WeatherTilesContainer';
import About from 'About';

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={Main}>
            <Route path="about" component={About}></Route>
            <IndexRoute component={WeatherTilesContainer}></IndexRoute>
        </Route>
    </Router>,
    document.getElementById('app')
);
