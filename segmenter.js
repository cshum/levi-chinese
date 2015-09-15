var jieba = require('nodejieba')
var ginga = require('ginga')
var H = require('highland')

var AFTER = /\:.*$/

function clean (token) {
  return token.replace(AFTER, '')
}

module.exports = function segmenter () {
  return ginga().use('pipeline', function (ctx) {
    ctx.tokens = H(ctx.tokens)
    .flatMap(function (token) {
      return token.split('。')
    })
    .flatMap(function (token) {
      return H(jieba.extract(token, -1)).map(clean)
    })
  })
}

