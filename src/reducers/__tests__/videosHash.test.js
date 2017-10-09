import deepFreeze from 'deep-freeze-node';
import reducer from '../videosHash';

const defaultState = {};
const initialState = deepFreeze({
  'initial-slug-1': { slug: 'initial-slug-1', url: 'https://example.com/initial-slug-1.mp4' },
  'initial-slug-2': { slug: 'initial-slug-2', url: 'https://example.com/initial-slug-2.mp4' },
  'initial-slug-3': { slug: 'initial-slug-3', url: 'https://example.com/initial-slug-3.mp4' },
});

test('returns default state if no state or actions passed', () => {
  expect(reducer()).toEqual(defaultState);
});

test('returns state if irrelevant action passed', () => {
  expect(reducer(initialState)).toEqual(initialState);
  expect(reducer(initialState, deepFreeze({ type: 'SUPERFLUOUS_HYPERCUBES' }))).toEqual(initialState);
});

test('returns state appended with hash of slugs to video objects when action.type === \'VIDEOS_FETCHED\'', () => {
  const testAction = deepFreeze({
    type: 'VIDEOS_FETCHED',
    payload: {
      videos: [
        { slug: 'test-slug-1', url: 'https://example.com/test-slug-1.mp4' },
        { slug: 'test-slug-2', url: 'https://example.com/test-slug-2.mp4' },
        { slug: 'test-slug-3', url: 'https://example.com/test-slug-3.mp4' },
        { slug: 'test-slug-4', url: 'https://example.com/test-slug-4.mp4' },
      ],
    },
  });

  const expectedState = {
    ...initialState,
    'test-slug-1': { slug: 'test-slug-1', url: 'https://example.com/test-slug-1.mp4' },
    'test-slug-2': { slug: 'test-slug-2', url: 'https://example.com/test-slug-2.mp4' },
    'test-slug-3': { slug: 'test-slug-3', url: 'https://example.com/test-slug-3.mp4' },
    'test-slug-4': { slug: 'test-slug-4', url: 'https://example.com/test-slug-4.mp4' },
  };

  expect(reducer(initialState, testAction)).not.toEqual(initialState);
  expect(reducer(initialState, testAction)).toEqual(expectedState);
});

test('if action.type === \'VIDEO_FOUND\', appends a single `hash => videoObject` mapping to state', () => {
  const testAction = deepFreeze({
    type: 'VIDEO_FOUND',
    payload: {
      slug: 'test-slug-alpha',
      video: { slug: 'test-slug-alpha', url: 'https://example.com/test-slug-alpha.mp4' },
    },
  });

  const expectedState = {
    ...initialState,
    'test-slug-alpha': { slug: 'test-slug-alpha', url: 'https://example.com/test-slug-alpha.mp4' },
  };

  expect(reducer(initialState, testAction)).not.toEqual(initialState);
  expect(reducer(initialState, testAction)).toEqual(expectedState);
});
