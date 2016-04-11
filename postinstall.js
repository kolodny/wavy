var fs = require('fs');
var path = require('path');

var dirname = __dirname.replace(/\\/g, '/');
var root = dirname.slice(0, dirname.lastIndexOf('/node_modules/'));
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
