import routesMap from './routesMap';

// We would be using the below import, if we weren't just faking JWT auth
// import jwt from 'jsonwebtoken';

export const isServer = typeof window === 'undefined';

export const fetchData = async (path, jwToken) => (
  fetch(`http://dev.local.com${path}`, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${jwToken || ''}`,
    },
  })
    .then(data => data.json())
);

export const isAllowed = (type, state) => {
  const role = routesMap[type] && routesMap[type].role; // You can put arbritrary keys in urls
  if (!role) return true;

  const user = isServer
    ? jwt.verify(state.jwToken, process.env.JWT_SECRET)
    : userFromState(state);

  if (!user) return false;

  return user.roles.includes(role);
};

// VERIFICATION MOCK:
// Since middleware is synchronous you must use a jwt package that is sync
// like the one imported above. For now we will mock both the client + server
// verification methods:

const fakeUser = { roles: ['admin'] };
const userFromState = ({ jwToken, user }) => jwToken === 'real' && fakeUser;
const jwt = {
  verify: (jwToken, secret) => jwToken === 'real' && fakeUser,
};

// NOTE ON COOKIES:
// We're doing combination cookies + jwTokens because universal apps aren't
// single page apps (SPAs). Server-rendered requests, when triggered via
// direct visits by the user, do not have headers we can set. That's the
// takeaway.
