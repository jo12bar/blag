import deepFreeze from 'deep-freeze-node';
import slug from '../slug';

const defaultState = '';
const testState = 'test-initial-video-slug';
const testAction = deepFreeze({
  type: 'VIDEO',
  payload: {
    slug: 'test-video-slug',
  },
});

test('returns default state if not passed state or an action', () => {
  expect(slug()).toBe(defaultState);
});

test('returns passed state if action.type !== \'VIDEO\'', () => {
  expect(slug(testState)).toBe(testState);
  expect(slug(testState, deepFreeze({ type: 'NOT_A_VIDEO' }))).toBe(testState);
});

test('returns action.payload.slug if action.type === \'VIDEO\'', () => {
  const state = slug(testState, testAction);
  expect(state).not.toBe(defaultState);
  expect(state).not.toBe(testState);
  expect(state).toBe(testAction.payload.slug);
});
