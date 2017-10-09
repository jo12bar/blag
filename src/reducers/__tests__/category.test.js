import deepFreeze from 'deep-freeze-node';
import category from '../category';

const defaultState = '';
const testState = 'Test Initial Category';
const testAction = deepFreeze({
  type: 'LIST',
  payload: {
    category: 'Test Category',
  },
});

test('returns default state if not passed state or an action', () => {
  expect(category()).toBe(defaultState);
});

test('returns passed state if action.type !== \'LIST\'', () => {
  expect(category(testState)).toBe(testState);
  expect(category(testState, deepFreeze({ type: 'SERIOUSLY_NOT_LIST' }))).toBe(testState);
});

test('returns action.payload.category if action.type === \'LIST\'', () => {
  const state = category(testState, testAction);
  expect(state).not.toBe(defaultState);
  expect(state).not.toBe(testState);
  expect(state).toBe(testAction.payload.category);
});
