import { NOT_FOUND } from 'redux-first-router';

const components = {
  HOME: 'Home',
  LIST: 'List',
  VIDEO: 'Video',
  ADMIN: 'Admin',
  LOGIN: 'Login',
  [NOT_FOUND]: 'NotFound',
};

export default (state = 'HOME', action = {}) => (
  components[action.type] || state
);

// NOTE: This is the primary reducer, demonstrating how RFR replaces the need
// for React Router's <Route /> component.
//
// ALSO:  Forget a switch. Use a hash table for perf.
