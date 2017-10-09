import * as reducers from '../index';

test('exports all reducers in the folder', () => {
  expect(reducers.page).toBeDefined();
  expect(reducers.slug).toBeDefined();
  expect(reducers.category).toBeDefined();
  expect(reducers.direction).toBeDefined();
  expect(reducers.videosHash).toBeDefined();
  expect(reducers.videosByCategory).toBeDefined();
  expect(reducers.playing).toBeDefined();
  expect(reducers.title).toBeDefined();
  expect(reducers.actions).toBeDefined();
});
