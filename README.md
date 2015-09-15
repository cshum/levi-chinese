# levi-chinese

Chinese text processing plugins for [Levi](https://github.com/cshum/levi).

levi-chinese aims to improve Chinese text processing capabilities of Levi.
This is under heavy development and I am not an expert in NLP with Chinese. 
Any comments or pull requests are appreciated.

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

Chinese segmentation using [node-jieba](https://github.com/Tjatse/node-jieba).

## License

MIT
