rm -rf test-dir
mkdir test-dir

cd test-dir
mkdir app lib_that_uses_wavy

echo creating dirs
cd lib_that_uses_wavy
npm init -y > /dev/null
echo 'module.exports = require("~/foo")' > index.js;
echo 'module.exports = "foo"' > foo.js;
node -e 'var pkg = require("./package.json"); pkg.dependencies = { wavy: "file:../../" }; require("fs").writeFileSync("./package.json", JSON.stringify(pkg, null, 2))'

echo creating app
cd ../app
npm init -y > /dev/null
echo 'console.log(require("lib_that_uses_wavy"))' > index.js
node -e 'var pkg = require("./package.json"); pkg.dependencies = { lib_that_uses_wavy: "file:../lib_that_uses_wavy/" }; require("fs").writeFileSync("./package.json", JSON.stringify(pkg, null, 2))'
echo npm installing
npm install

node index;