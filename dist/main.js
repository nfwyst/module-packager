
  (function (modules) {
    function require(moduleId) {
      var module = {
        exports: {}
      }
      modules[moduleId].call(module.exports, module, module.exports, require)
      return module.exports
    }
    return require('./src/index.js')
  })({
    
      
        'src/css/main.css': (function(module, exports, require){
          eval(`
    let style = document.createElement('style')
    style.innerText = "body {  background-color: aquamarine;  width: 100vh;  height: 100vh;}"
    document.head.appendChild(style)
  `)
        })
    
      
              ,
      
        'src/b.js': (function(module, exports, require){
          eval(`require("src/css/main.css")


console.log('hello I am b.js')
`)
        })
    
      
              ,
      
        'src/a.js': (function(module, exports, require){
          eval(`require("src/b.js")

let a = 12

module.exports = 12
`)
        })
    
      
              ,
      
        './src/index.js': (function(module, exports, require){
          eval(`let result = require("src/a.js")

console.log(result)
`)
        })
    
  })
  