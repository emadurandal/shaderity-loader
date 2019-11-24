const loaderUtils = require('loader-utils');
const fs = require('fs');
const path = require('path');


function isVertexShader(path) {
  const ext = fileExtension(path);
  if (ext == 'vs' || ext == 'vert') {
    return true;
  } else {
    return false;
  }
}

function isFragmentShader(path) {
  const ext = fileExtension(path);
  if (ext == 'fs' || ext == 'ps' || ext == 'frag') {
    return true;
  } else {
    return false;
  }
}

function fileExtension(path) {
  const splitted = path.split('.');
  const ext = splitted[splitted.length - 1];

  return ext;
}

function convertIn(str, loader) {
  const inReg = /([\s\S]*)in /;
  let inAsES1 = 'attribute ';
  if (isFragmentShader(loader.resourcePath)) {
    inAsES1 = 'varying ';
  }
  return str.replace(inReg, '$1' + inAsES1);
}

function transform(str, loader) {
  str = convertIn(str, loader);
  return str;
}

function shaderStage(loader) {
  if (isVertexShader(loader.resourcePath)) {
    return 'vertex';
  } else {
    return 'fragment';
  }
}

function requireFile(source, resourcePath) {
  const basePath = path.dirname(resourcePath) + '/';
  const arr = source.split(/\r\n|\n/);

  const newArr = [];
  for (let i = 0; i < arr.length; i++){
    const row = arr[i];
    const match = row.match(/#pragma[\t ]+shaderity:[\t ]*(\S*)[\t ]*=?[\t ]*require\([\t ]*(\S+)[\t ]*\)/);
    if (match != null) {
      const filePath = path.resolve(basePath + match[2]);
      let extShader = fs.readFileSync(filePath, {encoding: 'utf-8'});
      newArr.push(extShader);
    } else {
      newArr.push(row);
    }
  }

  const requredShaderText = newArr.join('\n');

  return requredShaderText;
}

module.exports = function(source, map, meta) {
  this.cacheable();

  const json = {};

  const options = loaderUtils.getOptions(this);

  json.code = requireFile(source, this.resourcePath);

  json.shaderStage = shaderStage(this);

  return `export default ${JSON.stringify(json)}`;
};
