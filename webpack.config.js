module.exports = {
  entry: "./js/app.js",
  output: {
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  devServer: {
    host: '0.0.0.0',
    port: 3009
  }
}
