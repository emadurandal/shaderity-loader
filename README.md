# shaderity-loader

shaderity-loader is a static GLSL shader loader for Webpack.

## Features

### Static features
- Provide `#include` like statement for GLSL shader files. (similar syntax to glslify)
- Embed GLSL shader files into TypeScript/JavaScript with WebPack Loader.
- Can be used in conjunction with glslify.

### Runtime features
- Variables fill-in to GLSL code in runtime. (use [Shaderity](https://github.com/actnwit/shaderity) to do this)
- Transpile between GLSL ES 1.0 and GLSL ES 3.0 . (use [Shaderity](https://github.com/actnwit/shaderity) to do this)

## How to use

Write webpack.config.js like this.

```javascript
// webpack.config.js
const path = require('path');

module.exports = {
  entry: './test/fixture_loaders/index.js',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(glsl|vs|fs|vert|frag)$/i,
        exclude: /node_modules/,
        use: [{
          loader: path.resolve('index.js')
        }]
      }
    ]
  },
  resolve: {
    extensions: [
      '.ts'
    ]
  },
  output: {
    path: path.resolve(__dirname, './fixture_loader_dist'),
    filename: 'index.js',
  },
  optimization: {
    namedChunks: true
  }
};

```

These are shader codes for importing to TypeScript/JavaScript code.

```glsl
// output.frag

#ifdef GLSL_ES_1
gl_FragColor = rt0;
#endif
```

```glsl
// output_test.frag
precision mediump float;

in vec4 vColor;
in vec4 vTexcoord;

void main() {
  rt0 = vColor;
  #pragma shaderity: require(./output.frag)
}
```

You can import them like this.

```javascript
import shaderObj from '../fixtures/output_test.frag';

console.out(convertedObj.shaderStage);
// 'fragment'

console.out(convertedObj.code);
/*
precision mediump float;

in vec4 vColor;
in vec4 vTexcoord;

void main() {
  rt0 = vColor;

#ifdef GLSL_ES_1
gl_FragColor = rt0;
#endif
*/
```

Build this JavaScript code using Webpack.

```
$ webpack
```

## LICENSE

MIT License
