let babylon = require('babylon');
let fs = require('fs');
let babel = require('babel-core');
let traverse = require('babel-traverse');

let ESLoader = function () {
  this.compile = function(entry) {
    let ast = this.getAst(entry);
    return this.generateCode(ast);
  }
  this.getAst = function(entry) {
    return babylon.parse(
      entry,
      {
        sourceType: 'module'
      }
    )
  }
  this.generateCode = function(ast) {
    return babel.transformFromAst(ast, null, {
      presets: ['env']
    }).code;
  }
}

var self = new ESLoader();

module.exports = self.compile.bind(self);
