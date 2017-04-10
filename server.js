const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fetch = require('isomorphic-fetch');
const port = (process.env.PORT || 1337)
const indexPath = path.join(__dirname, 'index.html');
const publicPath = express.static(path.join(__dirname, 'public'));
const DARKSKY_SECRET_API_KEY = '00b33f183082aa47ef9863812e5320e1';
const url_prefix = 'https://api.darksky.net/forecast/' + DARKSKY_SECRET_API_KEY + '/';

//app.use('/dist', publicPath);
app.use(express.static('dist'));
app.get('/', function (_, res) { res.sendFile(indexPath) });
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

if (process.env.NODE_ENV !== 'production') {
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');
    const config = require('./webpack.dev.config.js');
    const compiler = webpack(config);

    app.use(webpackHotMiddleware(compiler));
    app.use(webpackDevMiddleware(compiler, {
        noInfo: true,
        publicPath: config.output.publicPath
    }));
}

// I was having CORS issue so I decided to make a fetch call to the proxy server.
app.get('/api/darksky', function(request, response) {
    try {
        var coordinates = request.query.latitude + ',' + request.query.longitude;
        var url = url_prefix  + coordinates;
        console.log('Fetching '+ url);

        fetch(url).then(function(weatherData) {
            if (weatherData.status != 200) {
                response.status(weatherData.status).json({
                    message: 'Invalid response from the server.'
                });
            }
            return weatherData.json();
        }).then(function(payload) {
            response.status(200).json(payload);
        });
    } catch(err) {
        console.log("Internal Server Error", err);
        response.status(500).json({
            message: 'Internal Server Error',
            details : err
        });
    }
});

app.listen(port)
console.log(`Listening at http://localhost:${port}`)
