js-linklist
===========

node源码中的一个链表，添加了几个扩展的函数。   
```
npm install linklist
```
###Usage   
```
var L = require('./');
var list = L.init();
L.append(list, {a:1});
L.appendBefore(list, {a:2});
L.traversal(list, function(item) {
  if (item.a === 1) {
    L.remove(item);
  }
});
L.clear(list);
L.isEmpty(list);
```
