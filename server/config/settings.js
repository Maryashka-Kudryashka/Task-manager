var path = require('path');

var settings = {
  path: path.normalize(path.join(__dirname, '..')),
  port: process.env.PORT || 5001
};

module.exports = settings;