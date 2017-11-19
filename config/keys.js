//Determine correct keys

if (process.end.NODE_ENV === 'production') {
  module.eports = require('./prod');
} else {
  module.eports = require('./dev');
}
