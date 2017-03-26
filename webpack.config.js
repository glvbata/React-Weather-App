module.exports = {
  entry: './app/app.jsx',
  output: {
    path: __dirname,
    filename: './dist/bundle.js'
  },
  resolve: {
    root: __dirname,
    alias: {
        About: 'app/components/About/About.jsx',
        Main: 'app/components/Main/Main.jsx',
        Navigation: 'app/components/Navigation/Navigation.jsx',
        WeatherTile: 'app/components/WeatherTile/WeatherTile.jsx'
    },
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015'],
          plugins: [
              ["transform-class-properties"]
          ]
        },
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/
      }
    ]
  }
};
