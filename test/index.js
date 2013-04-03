var pull = require('pull-stream')
var window = require('../')

var all = []

require('tape')('window', function (t) {

  pull.Source(function () {
  var i = 0

    return function (abort, cb) {
      setTimeout(function () {
        cb(null, i++)
      }, Math.random() * 200)
    }
  })()
  .pipe(pull.take(20))
  .pipe(pull.through(function (e) {
    all.push(e)
  }))
  .pipe(window())
  .pipe(pull.through(console.log))
  .pipe(pull.collect(function (err, ary) {
    t.notOk(err)
    ary.forEach(function (e) {
      t.ok(Array.isArray(e))
    })
    t.deepEqual(ary.reduce(function (acc, item) {
      return acc.concat(item)
    }, []), all)
    t.end()
  }))

})
