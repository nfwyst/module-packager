#! /usr/bin/env node
let config = require("../config/default.js");

let fs = require("fs");
let ejs = require("ejs");

let fileExists = function(path) {
  try {
    fs.accessSync(path, fs.F_OK);
  } catch (e) {
    return false;
  }
  return true;
};

let getScript = function(entry) {
  try {
    return fs.readFileSync(entry, "utf8");
  } catch (e) {
    return false;
  }
};

let getTemplate = function() {
  return `
  (function (modules) {
    function require(moduleId) {
      var module = {
        exports: {}
      }
      modules[moduleId].call(module.exports, module, module.exports, require)
      return module.exports
    }
    return require('<%=entry%>')
  })({
    '<%=entry%>':
    eval(\`<%-content%>\`)
  })
  `
};

let writeFile = function(output, callback) {
  try {
    fs.writeFileSync(output, result);
  } catch(e) {
    if(!callback.call(null, output)) {
      if(output.split('/')[1] === 'dist') {
        fs.mkdirSync('dist')
        writeFile.call(null, output, result)
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}

let result = ejs.render(
  getTemplate.call(null, null),
  {
    entry: config.entry,
    content: getScript.call(null, config.entry)
  }
);

writeFile.call(null, config.output, fileExists)
