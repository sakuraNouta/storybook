require("core-js/modules/es.array.from");

require("core-js/modules/es.array.map");

require("core-js/modules/es.string.iterator");

var a = Array.from({
  length: 10
}).map(function (v, i) {
  return i;
});
console.log(a);
