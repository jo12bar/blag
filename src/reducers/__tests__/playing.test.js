import deepFreeze from 'deep-freeze-node';
import playing from '../playing';

const defaultState = false;
const initialState = 'Not a boolean, but this works';

test('just returns default state if no state or actions passed', () => {
  expect(playing()).toBe(defaultState);
});

test('returns false if irrelevant action passed', () => {
  expect(playing(initialState)).toBe(false);
  expect(playing(initialState, deepFreeze({ type: 'SUPERFLUOUS_HYPERCUBES' }))).toBe(false);
});

test('returns true if action.type === \'PLAY\'', () => {
  expect(playing(initialState, deepFreeze({ type: 'PLAY' }))).toBe(true);
});
