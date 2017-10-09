import deepFreeze from 'deep-freeze-node';
import title from '../title';

const initialState = 'Foo Bar Baz';

test('default state is \'RFR Demo\'', () => {
  expect(title()).toBe('RFR Demo');
});

test('returns passed state if passed irrelevant action type', () => {
  expect(title(initialState)).toBe(initialState);
  expect(title(initialState, deepFreeze({ type: '@@test/HAHA_NOPE' }))).toBe(initialState);
});

test('returns \'RFR Demo\' if action.type === \'HOME\'', () => {
  const state = title(initialState, deepFreeze({ type: 'HOME' }));
  expect(state).not.toBe(initialState);
  expect(state).toBe('RFR Demo');
});

test('returns \'RFR: Formatted Category Title\' when passed an action with type \'LIST\' and a category', () => {
  const testAction = deepFreeze({
    type: 'LIST',
    payload: { category: 'formatted-category-title' },
  });

  const state = title(initialState, testAction);

  expect(state).not.toBe(initialState);
  expect(state).toBe('RFR: Formatted Category Title');
});

test('returns \'RFR: Formatted Video Slug\' when passed an action with type \'VIDEO\' and a slug', () => {
  const testAction = deepFreeze({
    type: 'VIDEO',
    payload: { slug: 'formatted-video-slug' },
  });

  const state = title(initialState, testAction);

  expect(state).not.toBe(initialState);
  expect(state).toBe('RFR: Formatted Video Slug');
});

test('returns \'RFR Login\' when action.type === \'LOGIN\'', () => {
  const state = title(initialState, deepFreeze({ type: 'LOGIN' }));
  expect(state).not.toBe(initialState);
  expect(state).toBe('RFR Login');
});

test('returns \'RFR Admin\' when action.type === \'ADMIN\'', () => {
  const state = title(initialState, deepFreeze({ type: 'ADMIN' }));
  expect(state).not.toBe(initialState);
  expect(state).toBe('RFR Admin');
});
