const PORT = Number(process.env.PORT) || 8080;

module.exports = {
  mode: 'development',
  entry: "./js/app.js",
  output: {
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'stage-0', 'react']
          }
        }
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      }
    ]
  },
  devServer: {
    host: '0.0.0.0',
    port: PORT,
    allowedHosts: [
      '.test',
      '.localhost',
      '.invalid',
      '.example'
    ]
  }
}
