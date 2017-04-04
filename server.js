var express = require('express');
var bodyParser = require('body-parser');
var fetch = require('isomorphic-fetch');
var app = express();

app.use(express.static('dist'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var DARKSKY_SECRET_API_KEY = '00b33f183082aa47ef9863812e5320e1';
var url_prefix = 'https://api.darksky.net/forecast/' + DARKSKY_SECRET_API_KEY + '/';

// I was having CORS issue so I decided to make a fetch call to the proxy server.
app.get('/api/darksky', function(request, response) {
    try {
        var coordinates = request.query.latitude + ',' + request.query.longitude;
        // Hard coded for now until i get geolocation working.
        var url = 'https://api.darksky.net/forecast/00b33f183082aa47ef9863812e5320e1/' + coordinates;
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

app.listen(1337, function () {
    console.log('Server is running');
});
