const webpack = require('webpack');

module.exports = {
    devtool: 'source-map',
    entry: './app/app.jsx',
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js'
    },
    resolve: {
        root: __dirname,
        alias: {
            About: 'app/components/About/About.jsx',
            Main: 'app/components/Main/Main.jsx',
            Navigation: 'app/components/Navigation/Navigation.jsx',
            WeatherTile: 'app/components/WeatherTile/WeatherTile.jsx',
            WeatherTileDetailed: 'app/components/WeatherTileDetailed/WeatherTileDetailed.jsx',
            WeatherTilesContainer: 'app/components/WeatherTilesContainer/WeatherTilesContainer.jsx'
    },
    extensions: ['', '.js', '.jsx']
    },
    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ],
    module: {
        loaders:
        [{
            loader: 'babel-loader',
            query: {
                presets: ['react', 'es2015'],
                plugins: [
                  ['transform-class-properties']
                ]
            },
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/
        },
        {
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        }]
    }
};
