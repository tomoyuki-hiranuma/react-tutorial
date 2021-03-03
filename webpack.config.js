var debug   = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path    = require('path');

module.exports = {
  context: path.join(__dirname, "src"),
  entry: "./js/client.js", // ビルドを始める最初のjsファイル
  module: {
    rules: [{
      test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: [{
          loader: 'babel-loader', // .jsxというファイルを見つけたらbundleに追加する前にbabel-loaderで変換
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
            plugins: [
              ['@babel/plugin-proposal-class-properties', {'loose': true}]
            ]
          }
        }]
      }]
    },
    output: {
      path: __dirname + "/src/",
      filename: "client.min.js" // bundleファイルを/src/cient.min.jsという名前で出力
    },
    devServer: {
      contentBase: __dirname + "/src/"
    },
    plugins: debug ? [] : [
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    ]
};