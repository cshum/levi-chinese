var ginga = require('ginga')
var H = require('highland')
var map = require('./t2s.json')

function replaceFn (s) {
  return (s in map) ? map[s] : s
}

function convert (itxt) {
  return itxt.replace(/[^\x00-\xFF]/g, replaceFn)
}

module.exports = function conversion () {
  return ginga().use('pipeline', function (ctx) {
    // simplified to traditional chinese conversion
    ctx.tokens = H(ctx.tokens).map(convert)
  })
}
