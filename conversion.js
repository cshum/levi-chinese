var ginga = require('ginga')
var H = require('highland')
var zhmap = require('./zhmap.json')

function replaceFn (s) {
  return (s in zhmap) ? zhmap[s] : s
}

function toTrad (itxt) {
  return itxt.replace(/[^\x00-\xFF]/g, replaceFn)
}

module.exports = function conversion () {
  return ginga().use('pipeline', function (ctx) {
    // simplified to traditional chinese conversion
    ctx.tokens = H(ctx.tokens).map(toTrad)
  })
}
