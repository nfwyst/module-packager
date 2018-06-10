// factory
const factory = {};

const define = (names, dependences, call) => {
  // preprocessor
  let type = o =>
    Object.prototype.toString
      .call(o)
      .replace(/^\[\w+ (\w+)\]$/, "$1")
      .toLowerCase();
  let caller = null;
  let nCaller = null;
  // handler
  if (!call && type(dependences) === "function") {
    caller = dependences;
  } else if (type(call) === "function") {
    caller = call;
  } else {
    throw Error("cant define module, please check your parameters format");
  }

  // hold dependences
  if (dependences && dependences.length > 0) {
    nCaller = () => {
      return requires(dependences, caller);
    };
  }

  // processor
  if (type(names) === "array") {
    names.forEach(name => {
      factory[`${name}`] = nCaller ? nCaller : caller;
    });
  } else if (type(names) === "string") {
    factory[names] = nCaller ? nCaller : caller;
  }
};

const requires = (modules, cb) => {
  if (modules.length > 0) {
    let res = modules.map(name => {
      return factory[name]();
    });
    return cb.apply(null, res);
  }
};

define(["module1"], () => {
  return "Bob Tom";
});
define(["module2"], () => {
  return 18;
});
define(["module3"], ["module1", "module2"], (name, age) => {
  return `my name is ${name}, age is ${age}`;
});
requires(["module3"], args => {
  console.log(args);
});

// => my name is Bob Tom, age is 18
