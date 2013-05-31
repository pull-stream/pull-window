# pull-window

Aggregate a pull-stream into windows.

Several helpers are provided for particular types of windows,
sliding, tumbling, etc.

And also, a low level 

## Example: "tumbling" window

sum every 10 items.

``` js
var pull   = require('pull-stream')
var window = require('pull-window')

function everyTen () {
  var i = 0
  //window calls init with each data item,
  //and a callback to close that window.
  return window(function (data, cb) {
    //if you don't want to start a window here,
    //return undefined
    if(i != 0) return
    var sum = 0

    //else return a function.
    //this will be called all data
    //until you callback.
    return function (end, data) {
      if(end) return cb(null, sum)
      sum += data
      if(++i >= 10) {
        i = 0
        cb(null, sum)
      }
    }
  }
}

pull.count(1000)
.pipe(everyTen))
.pipe(pull.log())
```

## Example: variable sized window

To have multiple windows going at once
just return a function more often!

``` js
var pull   = require('pull-stream')
var window = require('pull-window')

function groupTo100 () {
  var sum = null
  return window(function (_, cb) {
    if(sum != null) return

    //sum stuff together until you have 100 or more
    return function (end, data) {
      if(end) return cb(null, sum)
      sum += data
      if(sum >= 100) {
        //copy sum like this, incase the next item
        //comes through sync
        var _sum = sum; sum = null
        cb(null, _sum)
      }
    }
  })
}

pull.count(1000)
.pipe(groupTo100))
.pipe(pull.log())
```

## License

MIT
