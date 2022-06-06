const path = require('path');

module.exports = {
  entry: './test/fixture_loaders/index.js',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(glsl|vs|fs|vert|frag)$/i,
        exclude: /node_modules/,
        use: [{
          loader: path.resolve('index.js')
        }]
      }
    ]
  },
  resolve: {
    extensions: [
      '.ts'
    ]
  },
  output: {
    path: path.resolve(__dirname, './fixture_loader_dist'),
    filename: 'index.js',
  },
  optimization: {
  }
};
