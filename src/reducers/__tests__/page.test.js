import deepFreeze from 'deep-freeze-node';
import { NOT_FOUND } from 'redux-first-router';
import page from '../page';

const defaultState = 'HOME';
const initialState = 'SomeNonExistantTestPage';

test('just returns default state if no state or actions passed', () => {
  expect(page()).toBe(defaultState);
});

test('returns state if irrelevant action passed', () => {
  expect(page(initialState)).toBe(initialState);
  expect(page(
    initialState,
    deepFreeze({ type: 'SUPERFLUOUS_HYPERCUBES' })
  )).toBe(initialState);
});

test('if action.type === \'HOME\', returns \'Home\'', () => {
  expect(page(initialState, deepFreeze({ type: 'HOME' }))).toBe('Home');
});

test('if action.type === \'LIST\', returns \'List\'', () => {
  expect(page(initialState, deepFreeze({ type: 'LIST' }))).toBe('List');
});

test('if action.type === \'VIDEO\', returns \'Video\'', () => {
  expect(page(initialState, deepFreeze({ type: 'VIDEO' }))).toBe('Video');
});

test(`if action.type === ${NOT_FOUND}, returns 'NotFound'`, () => {
  expect(page(initialState, deepFreeze({ type: NOT_FOUND }))).toBe('NotFound');
});
