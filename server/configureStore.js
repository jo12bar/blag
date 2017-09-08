import createHistory from 'history/createMemoryHistory';
import { NOT_FOUND } from 'redux-first-router';
import configureStore from '../src/configureStore';

const doesRedirect = ({ kind, pathname }, res) => {
  if (kind === 'redirect') {
    res.redirect(302, pathname);
    return true;
  }

  return false;
};

export default async (req, res) => {
  const jwToken = req.cookies.jwToken; // see server/index.js to change jwToken
  const preLoadedState = { jwToken }; // onBeforeChange will auth using this

  const history = createHistory({ initialEntries: [req.path] });
  const { store, thunk } = configureStore(history, preLoadedState);

  // If not using onBeforeChange + jwTokens, you can also async authenticate
  // here against your db (i.e. using req.cookies.sessionId)

  let { location } = store.getState();
  if (doesRedirect(location, res)) return false;

  // Using redux-thunk, perhaps request and dispatch some app-wide state as well,
  // e.g:
  // await Promise.all([store.dispatch(myThunkA), store.dispatch(myThunkB)]);

  await thunk(store); // THE PAYOFF!

  location = store.getState().location; // Remember: state has now changed.
  if (doesRedirect(location, res)) return false; // Only do if thunks have redir's.

  const status = store.getState().location.type === NOT_FOUND ? 404 : 200;
  res.status(status);

  return store;
};
