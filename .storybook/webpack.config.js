const path = require('path')

module.exports = {
  resolve: {
     extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
          test: /\.jsx?$/,
          loader: 'babel',
          include: path.resolve(__dirname, '../components')
      },
      {
        test: /(\.scss|\.css)$/,
        loaders: ['style', 'css', 'sass'],
        include: [
          path.resolve(__dirname, '../components'),
          path.resolve(__dirname, '../style'),
          path.resolve(__dirname, '../stories')
        ]
      },
      {
          test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
          loader: 'url-loader?limit=50000&name=[path][name].[ext]'
      }
    ]
  }
}
