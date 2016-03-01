module.exports = function (size) {
  var ended; size = size || 5
  var queue = []
  return function (read) {
    return function (end, cb) {
      //this means that the upstream is sending an error.
      if(end) return read(ended = end, cb)
      //this means that we read an end before.
      if(ended) return cb(ended)

      read(null, function next(end, data) {
        if(ended = ended || end) {
          if(!queue.length)
            return cb(ended)

          var _queue = queue; queue = []
          return cb(null, _queue)
        }
        queue.push(data)
        if(queue.length < size)
          return read(null, next)

        var _queue = queue; queue = []
        cb(null, _queue)
      })
    }
  }
}

