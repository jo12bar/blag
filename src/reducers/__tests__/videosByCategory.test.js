import deepFreeze from 'deep-freeze-node';
import reducer from '../videosByCategory';

const defaultState = {};
const initialState = deepFreeze({
  foo: ['bar-slug', 'baz-slug'],
  spam: ['and-slug', 'eggs-slug'],
});

test('just returns default state if no state or actions passed', () => {
  expect(reducer()).toEqual(defaultState);
});

test('returns state if irrelevant action passed', () => {
  expect(reducer(initialState)).toEqual(initialState);
  expect(reducer(
    initialState,
    deepFreeze({ type: 'SUPERFLUOUS_HYPERCUBES' })
  )).toEqual(initialState);
});

test('maps & appends action with type \'VIDEOS_FETCHED\' and payload with categories and videos to the state', () => {
  const testAction = deepFreeze({
    type: 'VIDEOS_FETCHED',
    payload: {
      category: 'test-action-category',
      videos: [
        { slug: 'supercharged-waveforms' },
        { slug: 'nexus-vibrations' },
        { slug: 'primordial-interconnectedness' },
        { slug: 'faith-chi-interface' },
        { slug: 'frequencies-of-quantum-energy' },
        { slug: 'hyper-mystical-consciousness' },
      ],
    },
  });

  const expectedState = {
    ...initialState,
    [testAction.payload.category]: testAction.payload.videos.map(v => v.slug),
  };

  expect(reducer(initialState, testAction)).not.toEqual(initialState);
  expect(reducer(initialState, testAction)).toEqual(expectedState);
});
