export const isServer = typeof window === 'undefined';

export const fetchData = async path => (
  fetch(`http://localhost${path}`, {
    headers: {
      Accept: 'application/json',
    },
  })
    .then(data => data.json())
);
