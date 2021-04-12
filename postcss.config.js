const colors = require('./static/config/colors.js')
const vars   = require('postcss-simple-vars')

module.exports = {
  plugins: [
    require('postcss-simple-vars')({ variables: colors }),
    require('autoprefixer'),
    require('postcss-nested')
  ]
}