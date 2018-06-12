#! /usr/bin/env babel-node
let config = require("../config/default.js");

let fs = require("fs");
let ejs = require("ejs");
let path = require("path");

// css loader
let styleLoader = require('../loader/style.js')
// sass loader
let sassLoader = require('../loader/sass.js')
// es6 loader
let esloader = require('../loader/compiler.js')

let modules = [];

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
    return e;
  }
};

let getTemplate = function() {
  return `
  (function (modules) {
    var installedModules = {};
    function require(moduleId) {
      if(installedModules[moduleId]) {
        return installedModules[moduleId].exports;
      }
      var module = installedModules[moduleId] = {
        id: moduleId,
        loaded: false,
        exports: {}
      };
      modules[moduleId].call(module.exports, module, module.exports, require)
      module.loaded = true;
      return module.exports
    }

    require.m = modules;

    return require('<%=entry%>')
  })({
    <% for(let i = 0; i < modules.length; i++) { %>
      <% if(i !== 0) { %>
              ,
      <% } %>
        '<%-modules[i].entry%>': (function(module, exports, require){
          eval(\`<%-modules[i].content%>\`)
        })
    <% } %>
  })
  `;
};

let writeFile = function(output, result,  callback) {
  try {
    fs.writeFileSync(output, result);
  } catch (e) {
    if (!callback.call(null, output)) {
      if (output.split("/")[1] === "dist") {
        fs.mkdirSync("dist");
        writeFile.call(null, output, result);
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
};

let getContent = function(entry, loaders) {
  let content = null
  loaders = loaders || []
  content = getScript.call(null, entry)

  loaders.forEach(function (loader, index) {
    for(item in loader) {
      if(loader.hasOwnProperty(item)) {
        let rule = new RegExp(item)
        if (rule.test(entry)) {
          let loaderFn = loader[item];
          if(typeof loaderFn === 'function') {
            content = loaderFn.call(null, content)
          } else if(loaderFn instanceof Array) {
            loaderFn.forEach(function(fn) {
              content = fn.call(null, content)
            })
          }
        }
      }
    }
  })


  content = content.replace(/require\(['"'](.+?)['"']\)/g, function(patern, target) {
      let name = path.join("./src", target)
      getContent.call(null, name, loaders)
      return 'require("' + name + '")'
  });


  modules.push({
    entry: entry,
    content: content
  })
  return modules
};

// init pack
let loaders = [
  {
    "\\.scss$": [sassLoader, styleLoader],
    "\\.css$": styleLoader
  },
  {
    "\\.js$": esloader
  }
];
let result = ejs.render(getTemplate.call(null, null), {
  entry: config.entry,
  modules: getContent.call(null, config.entry, loaders)
});

writeFile.call(null, config.output, result, fileExists);
