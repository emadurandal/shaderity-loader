# shaderity-loader

shaderity-loader is a static GLSL shader loader for Webpack.

## About Shaderity series

Shaderity is a shader toolkit composed from:

- [shaderity](https://github.com/actnwit/shaderity): This. for runtime features
  - shaderity-loader: for static features
    - [shaderity-node](https://github.com/actnwit/shaderity-node): The internal component for shaderity-loader.


The name "Shaderity" was coined from the combination of "Shader" and "Integrity".

## Features

### Static features

With this `shaderity-loader`, you can do the following things:

- Provide `#include` like statement for GLSL shader files. (similar syntax to glslify)
- Embed GLSL shader files into TypeScript/JavaScript as a WebPack Loader.
- Can be used in conjunction with glslify.

### Runtime features

With [shaderity](https://github.com/actnwit/shaderity), you can do the following things:

- Variables fill-in to GLSL code in runtime.
- Transpile between GLSL ES 1.0 and GLSL ES 3.0 .

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

console.out(convertedObj.isFragmentShader);
// 'true'

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

## For developers
When developing this library, please make sure to merge it into the develop branch. In order to be able to work closely with shaderity-node, the develop branch is also a submodule of shaderity-node and is included in the dependencies.

The only difference between the master branch and the develop branch is whether 'shaderity-node' is included as a submodule or not.

When you publish this library, merge the code from the develop branch into the master branch. Make sure that the master branch does not have shaderity-node as a submodule, and that the version of the shaderity-node package in package.json is the version you intend.

## LICENSE

MIT License
