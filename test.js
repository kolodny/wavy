var fs = require('fs');
var exec = require('child_process').exec;
var path = require('path');

var testDir = path.resolve(__dirname + '/test-dir');

if (fs.existsSync(testDir)) {
  deleteFolderRecursive(testDir);
}

fs.mkdirSync(testDir);
fs.writeFileSync(testDir + '/package.json', '{}');
fs.writeFileSync(testDir + '/index.js', 'console.log(require("~/foo"))');
fs.writeFileSync(testDir + '/foo.js', 'module.exports = "foo";');

console.log('wavy');
exec('node --version', function(err, out) {
  var isV5 = /^v5/.test(out);
  exec('npm install -S ..', { cwd: testDir }, function(err) {
    handleError(err);
    console.log('√ installs without errors');
    exec('node index', { cwd: testDir }, function(err, stdout) {
      handleError(err);
      if (stdout.trim() !== 'foo') {
        handleError(new Error('expected output to be "foo" got ' + stdout.trim()));
      }
      console.log('√ works after install');
      exec('npm install ..', { cwd: testDir }, function(err) {
        if (!isV5) handleError(err);
        console.log('√ can handle multiple installs');
        deleteFolderRecursive(testDir + '/node_modules');
        fs.mkdirSync(testDir + '/node_modules/');
        fs.writeFileSync(testDir + '/node_modules/~', '123');
        exec('npm install ..', { cwd: testDir }, function(err) {
          var regex = /^Error: .* is already being used$/m;
          if (!regex.test(err.message)) {
            handleError('did not handle improper existing ~')
          }
          console.log('√ handles `~` already being used by something else');
          console.log('');
          console.log('all tests passed!');
          deleteFolderRecursive(testDir);
        });
      });
    });
  });
});

function handleError(err) {
  if (err) {
    //deleteFolderRecursive(testDir);
    console.error(err.stack);
    process.exit(1);
  }
}

// http://stackoverflow.com/a/12761924
function deleteFolderRecursive(path) {
  var files = [];
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path);
    files.forEach(function(file,index){
      var curPath = path + "/" + file;
      if (fs.lstatSync(curPath).isDirectory()) {
        deleteFolderRecursive(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};
