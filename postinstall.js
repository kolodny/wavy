var fs = require('fs');
var path = require('path');

var root = path.resolve(__dirname + '/../../');
var link = root + '/node_modules/~';
if (!fs.existsSync(link)) {
  fs.symlinkSync(root, root + '/node_modules/~');
}
