var ginga = require('ginga')
var H = require('highland')
var t2s = require('./t2s.json')
var UNI = /[^\x00-\xFF]/g

// traditional/simplified chinese conversion
module.exports = function converter (map) {
  map = map || t2s

  function replaceFn (s) {
    return (s in map) ? map[s] : s
  }

  function convert (str) {
    return str.replace(UNI, replaceFn)
  }

  return ginga().use('pipeline', function (ctx) {
    ctx.tokens = H(ctx.tokens).map(convert)
  })
}
