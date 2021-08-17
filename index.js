const loaderUtils = require('loader-utils');
const requireFile = require("shaderity-node").requireFile;
const shaderStage = require("shaderity-node").shaderStage;

module.exports = function(source, map, meta) {
  this.cacheable();

  const json = {};

  json.code = requireFile(source, this.resourcePath);

  json.shaderStage = shaderStage(this.resourcePath);

  return `export default ${JSON.stringify(json)}`;
};
