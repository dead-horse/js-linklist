// Copyright Joyent, Inc. and other Node contributors.
// expand by dead-horse <heyiyu.deadhorse@gmail.com>
// exp
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

(function() {
  exports = exports ? exports : this;

  function init(list) {
    if (typeof list !== 'object') {
      list = {};
    }
    list._idleNext = list;
    list._idlePrev = list;
    return list;
  }
  exports.init = init;


  // show the most idle item
  function peek(list) {
    if (list._idlePrev == list) return null;
    return list._idlePrev;
  }
  exports.peek = peek;

  // show item next of `list`
  function next(list) {
    if (list._idleNext == list) return null;
    return list._idleNext;
  }
  exports.next = next;

  // remove the most idle item from the list
  function shift(list) {
    var first = list._idlePrev;
    remove(first);
    return first;
  }
  exports.shift = shift;

  // remove the item next of `list`
  function pop(list) {
    var next = list._idleNext;
    remove(next);
    return next;
  }

  // remove a item from its list
  function remove(item) {
    if (item._idleNext) {
      item._idleNext._idlePrev = item._idlePrev;
    }

    if (item._idlePrev) {
      item._idlePrev._idleNext = item._idleNext;
    }

    item._idleNext = null;
    item._idlePrev = null;
  }
  exports.remove = remove;

  function clear(list) {
    var iterator = next(list);
    while (iterator !== list) {
      var tmp = next(iterator);
      remove(iterator);
      iterator = tmp;
    }
  }
  exports.clear = clear;

  // traversal all the list and fn(list)
  function traversal(list, fn) {
    var iterator = next(list);
    if (!iterator) {
      return;
    }
    var end = false;
    var done = function() {
      end = true;
    }
    while (iterator !== list) {
      var tmp = next(iterator);
      fn(iterator, done);
      if (end) {
        return;
      }
      iterator = tmp;
    }
  }
  exports.traversal = traversal;

  // reverse traversal the list and fn(list)
  function reTraversal(list, fn) {
    var iterator = peek(list);
    if (!iterator) {
      return;
    }
    var end = false;
    var done = function() {
      end = true;
    }
    while (iterator !== list) {
      var tmp = peek(iterator);
      fn(iterator, done);
      if (end) {
        return;
      }
      iterator = tmp;
    }
  }
  exports.reTraversal = reTraversal;

  // remove a item from its list and place after list.
  function append(list, item) {
    remove(item);
    item._idleNext = list._idleNext;
    list._idleNext._idlePrev = item;
    item._idlePrev = list;
    list._idleNext = item;
  }
  exports.append = append;

  // remove a item from its list and place before list.
  function appendBefore(list, item) {
    remove(item);
    item._idlePrev = list._idlePrev;
    list._idlePrev._idleNext = item;
    item._idleNext = list;
    list._idlePrev = item;
  }
  exports.appendBefore = appendBefore;


  function isEmpty(list) {
    return list._idleNext === list;
  }
  exports.isEmpty = isEmpty;

  function length(list) {
    var iterator = next(list);
    if (!iterator) {
      return 0;
    }
    var i = 0;
    while(iterator !== list) {
      i++;
      iterator = next(iterator);
    }
    return i;
  }
  exports.length = length;
})();