const loaderUtils = require('loader-utils');
const requireFile = require("shaderity").requireFile;
const shaderStage = require("shaderity").shaderStage;

module.exports = function(source, map, meta) {
  this.cacheable();

  const json = {};

  const options = loaderUtils.getOptions(this);

  json.code = requireFile(source, this.resourcePath);

  json.shaderStage = shaderStage(this.resourcePath);

  return `export default ${JSON.stringify(json)}`;
};
