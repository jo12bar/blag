import deepFreeze from 'deep-freeze-node';
import direction from '../direction';

const defaultState = 'next';
const initialState = 'hyperdimensional';

test('returns default state if no state or action passed', () => {
  expect(direction()).toBe(defaultState);
});

test('returns state if irrelevant action passed', () => {
  expect(direction(initialState)).toBe(initialState);
  expect(direction(initialState, deepFreeze({ type: 'SUPERFLUOUS_HYPERCUBES' }))).toBe(initialState);
});

test('returns state if action.meta or action.meta.location is falsy', () => {
  const baseAction = deepFreeze({ type: 'LIST' });

  expect(direction(
    initialState,
    deepFreeze({ ...baseAction })
  )).toBe(initialState);

  expect(direction(initialState, deepFreeze({
    ...baseAction,
    meta: false,
  }))).toBe(initialState);

  expect(direction(initialState, deepFreeze({
    ...baseAction,
    meta: {},
  }))).toBe(initialState);

  expect(direction(initialState, deepFreeze({
    ...baseAction,
    meta: { location: false },
  }))).toBe(initialState);
});

test('if action.type === action.meta.location.prev.type, just return the state', () => {
  expect(direction(initialState, deepFreeze({
    type: 'SUPERFLUOUS_HYPERCUBES',
    meta: { location: { prev: { type: 'SUPERFLUOUS_HYPERCUBES' } } },
  }))).toBe(initialState);
});

test('if action.type === \'HOME\', just return the state', () => {
  expect(direction(initialState, deepFreeze({
    type: 'HOME',
    meta: { location: { prev: { type: 'SUPERFLUOUS_HYPERCUBES' } } },
  }))).toBe(initialState);
});

test('if type === \'LIST\' && prevType === \'HOME\', return \'next\'', () => {
  const action = deepFreeze({
    type: 'LIST',
    meta: { location: { prev: { type: 'HOME' } } },
  });

  expect(direction(initialState, action)).not.toBe(initialState);
  expect(direction(initialState, action)).toBe('next');
});

test('if type === \'LIST\' && prevType === \'VIDEO\', return \'back\'', () => {
  const action = deepFreeze({
    type: 'LIST',
    meta: { location: { prev: { type: 'VIDEO' } } },
  });

  expect(direction(initialState, action)).not.toBe(initialState);
  expect(direction(initialState, action)).toBe('back');
});

test('if type === \'LIST\' && prevType === \'PLAY\', return \'back\'', () => {
  const action = deepFreeze({
    type: 'LIST',
    meta: { location: { prev: { type: 'PLAY' } } },
  });

  expect(direction(initialState, action)).not.toBe(initialState);
  expect(direction(initialState, action)).toBe('back');
});

test('if type === \'VIDEO\' && prevType === \'LIST\', return \'next\'', () => {
  const action = deepFreeze({
    type: 'VIDEO',
    meta: { location: { prev: { type: 'LIST' } } },
  });

  expect(direction(initialState, action)).not.toBe(initialState);
  expect(direction(initialState, action)).toBe('next');
});

test('if type === \'LOGIN\', return \'back\'', () => {
  const action = deepFreeze({
    type: 'LOGIN',
    meta: { location: { prev: { type: 'SUPERFLUOUS_HYPERCUBES' } } },
  });

  expect(direction(initialState, action)).not.toBe(initialState);
  expect(direction(initialState, action)).toBe('back');
});

test('if type === \'ADMIN\', return \'next\'', () => {
  const action = deepFreeze({
    type: 'ADMIN',
    meta: { location: { prev: { type: 'SUPERFLUOUS_HYPERCUBES' } } },
  });

  expect(direction(initialState, action)).not.toBe(initialState);
  expect(direction(initialState, action)).toBe('next');
});
