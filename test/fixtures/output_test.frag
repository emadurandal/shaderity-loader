precision mediump float;

in vec4 vColor;
in vec4 vTexcoord;

void main() {
  rt0 = vColor;
  #pragma shaderity: require(./output.frag)
}
