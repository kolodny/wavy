var fs = require('fs');
var path = require('path');

var root = path.resolve(__dirname + '/../../');
var link = root + '/node_modules/~';
fs.access(link, function (pathDoesNotExist) {
  if (pathDoesNotExist) {
    fs.symlinkSync(root, link, 'junction');
  } else {
    console.error('A module called "~" has already been installed');
  }
});
