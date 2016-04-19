var fs = require('fs');
var path = require('path');
var execSync = require('child_process').execSync;

var dirname = __dirname.replace(/\\/g, '/');
var root = dirname.slice(0, dirname.lastIndexOf('/node_modules/'));
var link = root + '/node_modules/~';
try {
  var existingReal = fs.realpathSync(link);
} catch (e) {
  fs.symlinkSync(root, link, 'junction');
  fs.writeFileSync('./package.json', JSON.stringify({name: 'wavy', version: '0.0.0'}));
  console.log(fs.statSync(root + '/node_modules/wavy'))
  execSync('npm install node_modules/wavy/', { cwd: root });
  process.exit(0);
}
if (existingReal && existingReal !== root) {
  throw new Error(link + ' is already being used')
}
