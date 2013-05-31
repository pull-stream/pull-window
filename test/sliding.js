
var pull = require('pull-stream')
var windows = require('../')

var test = require('tape')

process.on('uncaughtException', function (err) {
  console.error(err.stack)
})

test('sliding window', function (t) {
  var expected = 
    [ { start: 0, data: 91 },
      { start: 7, data: 197 },
      { start: 14, data: 294 },
      { start: 21, data: 392 },
      { start: 28, data: 490 },
      { start: 35, data: 588 },
      { start: 42, data: 686 },
      { start: 49, data: 784 },
      { start: 56, data: 882 },
      { start: 63, data: 980 },
      { start: 70, data: 1078 },
      { start: 77, data: 1176 },
      { start: 84, data: 1274 },
      { start: 91, data: 1372 },
      { start: 98, data: 1470 },
      { start: 105, data: 1568 },
      { start: 112, data: 1666 } ]

  var i = 0
  pull.count(127)
  .pipe(windows(function (data, cb) {

    if(!(i++ % 7)) {
      var acc = 0
      var n = 0
      return function (end, data) {
        if(end) return
        acc = acc + data
        if(++n > 13)
          cb(null, acc)
      }
    }
  }))
  .pipe(pull.collect(function (err, ary) {
    t.notOk(err)
    console.log(ary)
    t.deepEqual(ary, expected)
    t.end()
  }))

})


