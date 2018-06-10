# module-packager

## config
you can config entry and output path
default is: src/index.js, dist/main.js
```
pack/config/default.js#entry#output
```

## loader
every loader is a function that resolve the content of the file that match the regular pattern
```
pack/loader/loaderName.js
```

## command
```
npm link
pack
```
