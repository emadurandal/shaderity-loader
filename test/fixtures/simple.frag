precision mediump float;

in vec4 vColor;

#pragma shaderity: zero_one = require(./zero_one.glsl)

void main() {
  gl_FlagColor = zero_one(vColor);
}
