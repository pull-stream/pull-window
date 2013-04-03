# pull-window

group pull-stream chunks into length or time windows.

## Example

Group data coming out of a pull-stream.
If the pull-stream rate is not consistent,
buffer items, but do not buffer them for very long.

``` js
var pull   = require('pull-stream')
var window = require('pull-window')

pull.Source(function () {
  var i = 0
  return function (abort, cb) {
    setTimeout(function () {
      cb(null, i++)
    }, Math.random() * 200)
  }
})()
.pipe(window(10, 200))
.pipe(pull.log())
```

## License

MIT
