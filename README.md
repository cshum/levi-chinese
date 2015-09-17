# Levi Chinese

Chinese text processing plugins for [Levi](https://github.com/cshum/levi).

[![Build Status](https://travis-ci.org/cshum/levi-chinese.svg?branch=master)](https://travis-ci.org/cshum/levi-chinese)

Levi Chinese aims to facilitate Chinese support in [Levi](https://github.com/cshum/levi) full-text search.
This is under active development but I am no expert in Chinese NLP. 
Any comments or PRs are appreciated.

```
npm install levi-chinese
```

Levi Chinese provides text processing plugins `chinese.converter()` and `chinese.segmenter()`.
Mount them under the default plugins of Levi.

```js
var levi = require('levi')
var chinese = require('levi-chinese')

var lv = levi('db')
.use(levi.tokenizer())
.use(levi.stemmer())
.use(levi.stopword())
.use(chinese.converter()) // chinese plugin
.use(chinese.segmenter()) // chinese plugin

lv.pipeline('Lorem Ipsum is dummy text我是拖拉機學院手扶拖拉機專業的。', function (err, tokens) {
  // tokens
  ['lorem', 'ipsum', 'dummi', 'text',
    '手扶拖拉机', '拖拉机', '学院', '专业' ]
})
```

### chinese.converter()

Convert Traditional Chinese into Simplified Chinese text tokens.
Based on dictionary from [Tongwen](http://tongwen.openfoundry.org/)

### chinese.segmenter()

Chinese words segmentation using [nodejieba](https://github.com/yanyiwu/nodejieba).
This requires native bindings so it only works on Node.js.

## License

MIT
