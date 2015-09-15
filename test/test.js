var test = require('tape')
var levi = require('levi')
var chinese = require('../')

var lv = levi('db', {db: require('memdown')})
.use(levi.tokenizer())
.use(chinese.converter())
.use(chinese.segmenter())
.use(levi.stemmer())
.use(levi.stopword())

test('pipeline', function (t) {
  lv.pipeline('典載入方式靈活，無需配置詞典路徑也可使用，需要定制自己的詞典路徑時也可靈活定制', function (err, tokens) {
    t.notOk(err)
    t.deepEqual(tokens, [
      'includ', 'foo', 'abc', 'instanceof', 'constructor'
    ], 'stemmer, stopwords, js reserved words')
    lv.pipeline(tokens, function (err, tokens2) {
      t.notOk(err)
      t.deepEqual(tokens, tokens2, 'idempotent')
      t.end()
    })
  })
})

