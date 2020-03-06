const path = require('path');

module.exports = [{
  name: 'example',
  mode: 'development',
  entry: './example/app.js',
  output: {
    path: path.resolve(__dirname, 'example'),
    filename: 'app.min.js'
  }
}, {
  name: 'dropily',
  mode: 'production',
  entry: './src/dropily.js',
  output: {
    path: path.resolve(__dirname, 'src/dist'),
    filename: 'dropily.min.js',
    library: 'Dropily'
  }
}];