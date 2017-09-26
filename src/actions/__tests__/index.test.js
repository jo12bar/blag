import { NOT_FOUND } from 'redux-first-router';
import * as actions from '../';

describe('goToPage', () => {
  const { goToPage } = actions;

  test('returns an action with identical type to what was passed', () => {
    const actionTypesHash = {
      HOME: goToPage('HOME', null),
      LIST: goToPage('LIST', null),
      VIDEO: goToPage('VIDEO', null),
      '@@jest/COMPLETELY_MADE_UP_TEST_ACTION': goToPage(
        '@@jest/COMPLETELY_MADE_UP_TEST_ACTION',
        null
      ),
      [NOT_FOUND]: goToPage(NOT_FOUND, null),
    };

    for (const [actionType, action] of Object.entries(actionTypesHash)) { // eslint-disable-line no-restricted-syntax
      expect(action.type).toBe(actionType);
    }
  });

  test('returns an undefined action.payload when not passed a category', () => {
    const action = goToPage('@@jest/COMPLETELY_MADE_UP_TEST_ACTION');
    expect(action.payload).toBe(undefined);
  });

  test('action.payload.category === the passed in category', () => {
    const action = goToPage(
      '@@jest/COMPLETELY_MADE_UP_TEST_ACTION',
      'gnarfgobblers'
    );

    const expectedPayload = {
      category: 'gnarfgobblers',
    };

    expect(action.payload).toEqual(expectedPayload);
  });

  test('returns action with passed in type and payload.category', () => {
    const action = goToPage(
      '@@jest/COMPLETELY_MADE_UP_TEST_ACTION',
      'fumbeldunkers'
    );

    expect(action).toEqual({
      type: '@@jest/COMPLETELY_MADE_UP_TEST_ACTION',
      payload: {
        category: 'fumbeldunkers',
      },
    });
  });
});

describe('goHome', () => {
  const { goHome } = actions;

  test('returns action with type \'HOME\'', () => {
    const action = goHome();
    expect(action).toEqual({ type: 'HOME' });
  });
});

describe('notFound', () => {
  const { notFound } = actions;

  test(`returns action with type ${NOT_FOUND}`, () => {
    const action = notFound();
    expect(action).toEqual({ type: NOT_FOUND });
  });
});

describe('visitCategory', () => {
  const { visitCategory } = actions;

  test('returns action with type \'LIST\' and passed in payload.category', () => {
    const action = visitCategory('fleebuses');
    const expected = {
      type: 'LIST',
      payload: { category: 'fleebuses' },
    };

    expect(action).toEqual(expected);
  });
});

describe('visitVideo', () => {
  const { visitVideo } = actions;

  test('returns action with type \'VIDEO\' and passed in payload.slug', () => {
    const action = visitVideo('making-mario-maker-inside-mario-maker');
    const expected = {
      type: 'VIDEO',
      payload: { slug: 'making-mario-maker-inside-mario-maker' },
    };

    expect(action).toEqual(expected);
  });
});
