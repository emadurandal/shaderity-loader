const simpleFragment = require('../fixture_loader_dist/index').simpleFragment;
const outputFragment = require('../fixture_loader_dist/index').outputFragment;

test('detect shader stage correctly', async () => {
  expect(simpleFragment.shaderStage).toBe('fragment');
});

test('test "output" shader fragment', async () => {
  expect(outputFragment.code).toBe(`precision mediump float;

in vec4 vColor;
in vec4 vTexcoord;

void main() {
  rt0 = vColor;

#ifdef GLSL_ES_1
gl_FragColor = rt0;
#endif

}
`);
});
