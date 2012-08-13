var L = require('../');
var should = require('should');

var list = {};
describe('Linklist test', function() {
  describe('#init', function() {
    it('should init ok', function(done) {
      L.init(list);
      list._idleNext.should.equal(list);
      list._idlePrev.should.equal(list);
      done();
    });
    it('should init ok if not object', function(done) {
      var l = L.init(1);
      l._idleNext.should.equal(l);
      l._idlePrev.should.equal(l);
      done();
    });
  });

  describe('#append', function() {
    it('should append ok', function(done) {
      L.append(list, {i:1});
      L.next(list).i.should.equal(1);
      done();
    });

    it('should append second ok', function(done) {
      L.append(L.next(list), {i:2});
      L.next(L.next(list)).i.should.equal(2);
      done();
    });
  });

  describe('#appendBefore', function() {
    it('should appendBefore ok', function(done) {
      L.appendBefore(list, {i: 3});
      L.peek(list).i.should.equal(3);
      L.peek(L.peek(list)).i.should.equal(2);
      done();
    });
  });

  describe('#traversal', function() {
    it('should travesal ok', function(done) {
      var i = 1;
      L.traversal(list, function(item) {
        item.i.should.equal(i++);
      })
      done();
    });
  });

  describe('#reTraversal', function() {
    it('should reTravesal ok', function(done) {
      var i = 3;
      L.reTraversal(list, function(item) {
        item.i.should.equal(i--);
      })
      done();
    });
  });

  describe('#traversal return', function() {
    it('should traversal break when fn return true', function(done) {
      var i = 0;
      L.traversal(list, function(item) {
        i++;
        if (item.i === 2) {
          return true;
        }
      });
      i.should.equal(2);
      done();
    });
  });

  describe('#traversal&remove', function() {
    it('should remove %2', function(done) {
      L.traversal(list, function(item) {
        if (item.i % 2) {
          L.remove(item);
        }
      });
      L.next(list).i.should.equal(2);
      L.next(L.next(list)).should.equal(list);
      done();
    });
  });

  describe('#clear', function() {
    it('should remove all items', function(done) {
      L.clear(list);
      L.isEmpty(list).should.be.ok;
      done();
    });
  });

});