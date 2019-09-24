const simpleFragment = require('../fixture_loader_dist/index').simpleFragment;

test('detect shader stage correctly', async () => {
  expect(simpleFragment.shaderStage).toBe('fragment');
});
