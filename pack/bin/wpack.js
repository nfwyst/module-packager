#! /usr/bin/env node
let config = require("../config/default.js");

let fs = require("fs");
let ejs = require("ejs");
let path = require("path");

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
    '<%=entry%>': (function(module, exports, require) {
      eval(\`<%-content%>\`)
    })
    <% for(let i = 0; i < modules.length; i++) { %>
        ,
        '<%-modules[i].entry%>': (function(module, exports, require){
          eval(\`<%-modules[i].content%>\`)
        })
    <% } %>
  })
  `;
};

let writeFile = function(output, callback) {
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

let getContent = function(entry) {
  let content = null;
  content = getScript
    .call(null, entry)
    .replace(/require\(['"'](.+?)['"']\)/g, function(patern, target) {
      let name = path.join("./src", target);
      let content = getContent.call(null, name)
      modules.push({
        entry: name,
        content: content
      });
      return 'require("' + name + '")';
    });
  return content;
};

let result = ejs.render(getTemplate.call(null, null), {
  entry: config.entry,
  content: getContent.call(null, config.entry),
  modules: modules
});

writeFile.call(null, config.output, fileExists);
