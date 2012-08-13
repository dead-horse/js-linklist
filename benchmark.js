var L = require('./');

var list = L.init();
var arr = [];
var hash = {};
var length = 100000;

for (i = 0; i != length; i++) {
  arr.push({data:i});
}
console.time('arr');
for (var i = 0, l = length; i < l; i++) {
  if (arr[i].data % 2) {
    arr.splice(i, 1);
    l--;
    i--;
  }
}
console.timeEnd('arr');
console.log(arr.length);

var arr = [];
for (var i = 0; i != length; i++) {
  arr.push({data:i});
}
console.time('arr2');
var res = [];
for (var i = 0; i !=length; i++) {
  if (!(arr[i].data % 2)) {
    res.push(arr[i]);
  }
}
console.timeEnd('arr2');
console.log(res.length);

for (i=0; i != length; i++) {
  L.appendBefore(list, {data:i});
}
console.time('list');
L.traversal(list, function(item) {
  if (item.data % 2) {
    L.remove(item);
  }
})
console.timeEnd('list');
var i = 0;
L.traversal(list, function(item) {
  i++;
});
console.log(i);

for (var i = 0; i != length; i++) {
  hash[i] = {
    data: i
  };
}
console.time('hash');
for (var key in hash) {
  if (hash[key].data % 2) {
    delete hash[key];
  }
}
console.timeEnd('hash');
console.log(Object.keys(hash).length);