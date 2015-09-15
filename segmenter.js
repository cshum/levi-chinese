var jieba = require('nodejieba')
var ginga = require('ginga')
var H = require('highland')

var AFTER = /\:.*$/

module.exports = function segmenter () {
  return ginga().use('pipeline', function (ctx) {
    ctx.tokens = H(ctx.tokens).flatMap(function (token) {
      return H(jieba.extract(token, -1)).map(function (token) {
        return token.replace(AFTER, '')
      })
    })
  })
}

