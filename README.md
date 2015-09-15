# levi-chinese

Chinese text processing plugins for [Levi](https://github.com/cshum/levi).

levi-chinese aims to improve Chinese text processing capabilities of Levi.
This is under development and I am not very familiar with NLP in Chinese. 
Any help would be appreciated.

```js
var levi = require('levi')
var chinese = require('levi-chinese')

var lv = levi('db')
.use(levi.tokenizer())
.use(levi.stemmer())
.use(levi.stopword())
.use(chinese.converter()) // chinese plugin
.use(chinese.segmenter()) // chinese plugin
```

### chinese.converter()

Convert Traditional Chinese into Simplified Chinese text tokens.

### chinese.segmenter()

Simplified Chinese segmentation using [node-jieba](https://github.com/Tjatse/node-jieba).

## License

MIT
