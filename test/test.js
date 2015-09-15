var test = require('tape')
var levi = require('levi')
var chinese = require('../')

var lv = levi('db', {db: require('memdown')})
.use(levi.tokenizer())
.use(levi.stemmer())
.use(levi.stopword())
.use(chinese.converter())
.use(chinese.segmenter())

var tokens1 = [
  '手扶拖拉机', '拖拉机', '学院', '专业', 'ceo', '升职', '加薪', '巅峰',
  '当上', '多久', '走上', '人生', '不用'
]
var tokens2 = [
  '手扶拖拉机', '拖拉机', '学院', '专业', 'lorem', 'ipsum', 'simpli',
  'dummi', 'text', 'print', 'typeset', 'industri', 'ceo', '升职', '加薪',
  '巅峰', '当上', '多久', '走上', '人生', '不用', 'lorem', 'ipsum', 'ha',
  'industri', 'standard', 'dummi', 'text', 'sinc', '1500'
]

test('Jieba Segmenter', function (t) {
  lv.pipeline(
    '我是拖拉机学院手扶拖拉机专业的。不用多久，我就会升职加薪，当上CEO，走上人生巅峰。',
    function (err, tokens) {
      t.notOk(err)
      t.deepEqual(tokens, tokens1)
      lv.pipeline(tokens, function (err, tokens2) {
        t.notOk(err)
        t.deepEqual(tokens2, tokens, 'idempotent')
        t.end()
      })
    }
  )
})

test('Chinese converter', function (t) {
  lv.pipeline(
    '我是拖拉機學院手扶拖拉機專業的。不用多久，我就會升職加薪，當上CEO，走上人生巔峰。',
    function (err, tokens) {
      t.notOk(err)
      t.deepEqual(tokens, tokens1)
      lv.pipeline(tokens, function (err, tokens2) {
        t.notOk(err)
        t.deepEqual(tokens, tokens1, 'idempotent')
        t.end()
      })
    }
  )
})

test('Mixed', function (t) {
  lv.pipeline(
    '我是拖拉機學院手扶拖拉機專業的。' +
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ' +
    '不用多久，我就會升職加薪，當上CEO，走上人生巔峰。' +
    'Lorem Ipsum has been the industry standard dummy text ever since the 1500s',
    function (err, tokens) {
      t.notOk(err)
      t.deepEqual(tokens, tokens2)
      lv.pipeline(tokens, function (err, tokens2) {
        t.notOk(err)
        t.deepEqual(tokens, tokens2, 'idempotent')
        t.end()
      })
    }
  )
})

test('Search', function (t) {
  lv.put('a', '我是拖拉機學院手扶拖拉機專業的')
  lv.put('b', 'Lorem Ipsum is simply dummy text')
  lv.put('c', '不用多久，我就會升職加薪，當上CEO，走上人生巔峰。', function (err) {
    t.notOk(err)
    lv.searchStream('你老板升職').toArray(function (arr) {
      t.equal(arr.length, 1, 'correct length')
      t.equal(arr[0].key, 'c', 'correct result')

      lv.searchStream('拖拉機使用說明').toArray(function (arr) {
        t.equal(arr.length, 1, 'correct length')
        t.equal(arr[0].key, 'a', 'correct result')

        t.end()
      })
    })
  })
})
