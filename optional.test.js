import Optional from './optional';

test('constructing optional', () => {
  const o = new Optional();
  expect(o).toBeDefined();
});
