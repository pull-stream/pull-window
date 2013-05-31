var pull   = require('pull-stream')
var window = require('../')
var test = require('tape')

var expected = [
  { start: 0, data: 105 },
  { start: 15, data: 105 },
  { start: 21, data: 115 },
  { start: 26, data: 110 },
  { start: 30, data: 126 },
  { start: 34, data: 105 },
  { start: 37, data: 114 },
  { start: 40, data: 123 },
  { start: 43, data: 132 },
  { start: 46, data: 141 },
  { start: 49, data: 150 },
  { start: 52, data: 105 },
  { start: 54, data: 109 },
  { start: 56, data: 113 },
  { start: 58, data: 117 },
  { start: 60, data: 121 },
  { start: 62, data: 125 },
  { start: 64, data: 129 },
  { start: 66, data: 133 },
  { start: 68, data: 137 },
  { start: 70, data: 141 },
  { start: 72, data: 145 },
  { start: 74, data: 149 },
  { start: 76, data: 153 },
  { start: 78, data: 157 },
  { start: 80, data: 161 },
  { start: 82, data: 165 },
  { start: 84, data: 169 },
  { start: 86, data: 173 },
  { start: 88, data: 177 },
  { start: 90, data: 181 },
  { start: 92, data: 185 },
  { start: 94, data: 189 },
  { start: 96, data: 193 },
  { start: 98, data: 197 }
]

function groupTo100 () {
  var sum = null
  return window(function (_, cb) {
    if(sum != null) return
    //if you don't want to start a window here,
    //return undefined

    //else return a function.
    //this will be called all data
    //until you callback.
    return function (end, data) {
      if(end) return cb(null, sum)
      sum += data
      if(sum >= 100) {
        var _sum = sum
        sum = null
        cb(null, _sum)
      }
    }
  })
}

test('tumbling to 100', function (t) {

  pull.count(100)
  .pipe(groupTo100())
  .pipe(pull.collect(function (err, ary) {
    t.deepEqual(ary, expected)
    console.log(ary)
    t.end()
  }))

})

