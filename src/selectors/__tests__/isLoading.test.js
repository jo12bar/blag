import deepFreeze from 'deep-freeze-node';
import isLoading from '../isLoading';

const baseTestState = deepFreeze({
  location: {
    type: 'SUPERFLUOUS_HYPERCUBES',
    payload: {
      slug: 'abc123',
      category: 'Miscellaneous',
    },
  },
  videosHash: {
    abc123: { slug: 'abc123', url: 'https://example.com/abc123.mp4' },
  },
  videosByCategory: {
    Miscellaneous: ['abc123'],
  },
});

test('returns false if location.type isn\'t \'VIDEO\' or \'LIST\'', () => {
  expect(isLoading(baseTestState)).toBe(false);
});

test('returns false if location.type is \'VIDEO\' and payload\'s slug exists in videosHash', () => {
  const testState = deepFreeze({
    ...baseTestState,
    location: {
      ...baseTestState.location,
      type: 'VIDEO',
    },
  });

  expect(isLoading(testState)).toBe(false);
});

test('returns true if location.type is \'VIDEO\' and payload\'s slug does not exist in videosHash', () => {
  const testState = deepFreeze({
    ...baseTestState,
    location: {
      ...baseTestState.location,
      type: 'VIDEO',
    },
    videosHash: {},
  });

  expect(isLoading(testState)).toBe(true);
});

test('returns false if location.type is \'LIST\' and payload\'s category exists in videosByCategory', () => {
  const testState = deepFreeze({
    ...baseTestState,
    location: {
      ...baseTestState.location,
      type: 'LIST',
    },
  });

  expect(isLoading(testState)).toBe(false);
});

test('returns true if location.type is \'LIST\' and payload\'s category does not exist in videosByCategory', () => {
  const testState = deepFreeze({
    ...baseTestState,
    location: {
      ...baseTestState.location,
      type: 'LIST',
    },
    videosByCategory: {},
  });

  expect(isLoading(testState)).toBe(true);
});
