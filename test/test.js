var test = require('tape')
var levi = require('levi')
var chinese = require('../')
var ginga = require('ginga')

var lv = levi('db', {db: require('memdown')})
.use(levi.tokenizer())
.use(levi.stemmer())
.use(levi.stopword())
.use(chinese.converter())
.use(chinese.segmenter())

test('Jieba Segmenter', function (t) {
  lv.pipeline(
    '我是拖拉机学院手扶拖拉机专业的。不用多久，我就会升职加薪，当上CEO，走上人生巅峰。',
    function (err, tokens) {
      t.notOk(err)
      t.deepEqual(tokens, [
        'ceo', '升职', '加薪', '手扶拖拉机', '巅峰', '拖拉机', '当上',
        '多久', '走上', '人生', '学院', '专业', '不用'
      ])
      lv.pipeline(tokens, function (err, tokens2) {
        t.notOk(err)
        t.deepEqual(tokens, tokens2, 'idempotent')
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
      t.deepEqual(tokens, [
        'ceo', '升职', '加薪', '手扶拖拉机', '巅峰', '拖拉机', '当上',
        '多久', '走上', '人生', '学院', '专业', '不用'
      ])
      lv.pipeline(tokens, function (err, tokens2) {
        t.notOk(err)
        t.deepEqual(tokens, tokens2, 'idempotent')
        t.end()
      })
    }
  )
})

test('Mixed', function (t) {
  lv.pipeline(
    '我是拖拉機學院手扶拖拉機專業的。'+
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry. '+
    '不用多久，我就會升職加薪，當上CEO，走上人生巔峰。'+
    'Lorem Ipsum has been the industry standard dummy text ever since the 1500s',
    function (err, tokens) {
      t.notOk(err)
      t.deepEqual(tokens, [
        'ceo', '升职', '加薪', '手扶拖拉机', '巅峰', '拖拉机', '当上',
        '多久', '走上', '人生', '学院', '专业', '不用'
      ])
      lv.pipeline(tokens, function (err, tokens2) {
        t.notOk(err)
        t.deepEqual(tokens, tokens2, 'idempotent')
        t.end()
      })
    }
  )
})
