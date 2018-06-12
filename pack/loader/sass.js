var sass = require('node-sass');

let sassLoader = function(scss) {
  var res = sass.renderSync({
    data: scss,
    outputStyle: 'compressed',
    sourceMap: false
  })

  return new Buffer.from(res.css, 'utf8').toString();
}


module.exports = sassLoader;
