import deepFreeze from 'deep-freeze-node';
import actions from '../actions';

const initialState = deepFreeze([
  { type: 'SUPERFLUOUS_HYPERCUBES' },
  {
    type: 'YET_ANOTHER_OVERCOMPLICATED_ACTION',
    payload: {
      foo: 'foo',
      bar: 'bar',
      baz: 'baz',
    },
    meta: {
      1: 'one',
      2: 'two',
      3: 'three',
    },
    irrelevant: true,
    mapsAreFun: new Map([
      ['probably', 'yeah'],
    ]),
  },
]);

test('returns array with single empty object when not passed state or an action', () => {
  expect(actions()).toEqual([{}]);
});

test('just returns state if action.type is \'@@redux/INIT\' or \'@@INIT\'', () => {
  expect(actions(initialState, deepFreeze({ type: '@@redux/INIT' }))).toEqual(initialState);
  expect(actions(initialState, deepFreeze({ type: '@@INIT' }))).toEqual(initialState);
});

test('returns passed in action prepended to passed in state', () => {
  const testAction = deepFreeze({
    type: '@@test/foo.bar.baz',
    coolMapBro: new Map([
      ['foo', 'spam'],
      ['bar', 'and'],
      ['baz', 'eggs'],
    ]),
  });

  expect(actions(initialState)).not.toEqual(initialState);
  expect(actions(initialState)).toEqual([{}, ...initialState]);

  expect(actions(initialState, testAction)).toEqual([
    testAction,
    ...initialState,
  ]);
});
