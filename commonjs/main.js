let fs = require('fs')

let requires = (moduleId) => {
    let content = fs.readFileSync(moduleId, 'utf8')

    let module = {
        exports: {}
    }

    let func = new Function('exports',
    'module',
    'requires',
    '__filename',
    '__dirname',
    `${content} \nreturn module.exports`
    )
    return func(module.exports, module, requires, __filename, __dirname)
}

let result = requires('./test.js')
console.log(result)
