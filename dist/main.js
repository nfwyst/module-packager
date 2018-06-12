
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

    return require('./src/index.js')
  })({
    
      
        'src/css/index.scss': (function(module, exports, require){
          eval(`
    let style = document.createElement('style')
    style.innerText = "body{background-color:antiquewhite;color:#fff}body h1{font-size:2rem}"
    document.head.appendChild(style)
  `)
        })
    
      
              ,
      
        'src/css/main.css': (function(module, exports, require){
          eval(`
    let style = document.createElement('style')
    style.innerText = "body {  background-color: aquamarine;  width: 100vh;  height: 100vh;}"
    document.head.appendChild(style)
  `)
        })
    
      
              ,
      
        'src/b.js': (function(module, exports, require){
          eval(`"use strict";

require("src/css/main.css");

console.log('hello I am b.js');`)
        })
    
      
              ,
      
        'src/a.js': (function(module, exports, require){
          eval(`"use strict";

require("src/css/index.scss");

require("src/b.js");

var a = 12;

module.exports = 12;`)
        })
    
      
              ,
      
        './src/index.js': (function(module, exports, require){
          eval(`"use strict";

var _a = require("src/a.js");

var _a2 = _interopRequireDefault(_a);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log(_a2.default);`)
        })
    
  })
  