const requireFile = require("shaderity-node").requireFile;
const getShaderStage = require("shaderity-node").shaderStage;

module.exports = function(source, map, meta) {
  this.cacheable();

  const code = requireFile(source, this.resourcePath);
  const shaderStage = getShaderStage(this.resourcePath);
  const isFragmentShader = shaderStage === 'fragment';

  const json = {
    code,
    shaderStage,
    isFragmentShader,
  };

  return `export default ${JSON.stringify(json)}`;
};
