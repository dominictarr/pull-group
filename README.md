# pull-group

pull-stream to group incoming data into arrays of max length `length`,
(the last item may be shorter than `length`)

Useful for data you can handle in batches.

``` js
var Group = require('pull-group')
pull(
  pull.count(100), //0, 1, 2, 3, 4, 5, ...
  Group(5),
  pull.log() // [0, 1,2,3,4], [5, 6,7,8,9], ...
)
```

## License

MIT
