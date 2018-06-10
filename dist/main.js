
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
    './src/index.js':
    eval(`console.log('hello pack')
`)
  })
  