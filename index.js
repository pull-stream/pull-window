var pull = require('pull-stream')
module.exports = 
pull.Through(function (read, size, time) {
  var cbs = [], flight = false, queue = [], ended = false, t

  size = size || 5
  time = time || 300

  function pull() {
    if(flight) return
    var stopped = false
    function done() {
      if(stopped) return
      stopped = true
      clearTimeout(t)
      console.log('ended', queue, ended)
      if(queue.length) {
        var q = queue; queue = []
        cbs.shift()(null, q)
      }
      else if(ended)
        cbs.shift()(ended)

      if(cbs.length) pull()
    }

   ;(function next() {
      flight = true
      read(null, function (end, data) {
        flight = false
        ended = end
        if(!end) queue.push(data)
        if(stopped && cbs.length)
          pull()
        else if(!ended && queue.length < size)
          next()
        else
          done()
      })
    })()

    t = setTimeout(done, time || 300)
  }

  return function (abort, cb) {
    if(abort) return read(abort, cb)
    cbs.push(cb)
    pull()
  }

})

