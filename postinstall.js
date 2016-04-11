var fs = require('fs');
var path = require('path');

var root = __dirname.slice(0, __dirname.lastIndexOf('/node_modules/'));
var link = root + '/node_modules/~';
try {
  var existingReal = fs.realpathSync(link);
} catch (e) {
  fs.symlinkSync(root, link, 'junction');
  process.exit(0);
}
if (existingReal && existingReal !== root) {
  throw new Error(link + ' is already being used')
}
