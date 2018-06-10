requires("./test1.js");

const a = name => {
  console.log(`hello my name is ${name}`);
};

let name = "hahah";

a(name);

module.exports = {
  a
};
