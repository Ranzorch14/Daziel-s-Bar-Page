const { isInViewportRect } = require('../src/utils');

test('isInViewportRect returns true when rect is in viewport', () => {
  const rect = { top: 50, bottom: 700 };
  expect(isInViewportRect(rect, 800)).toBe(true);
});

test('isInViewportRect returns false when rect is out of viewport', () => {
  const rect = { top: 900, bottom: 1200 };
  expect(isInViewportRect(rect, 800)).toBe(false);
});
