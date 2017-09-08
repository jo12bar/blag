import { NOT_FOUND } from 'redux-first-router';

// TODO: Try dispatching these from the Redux devTools!

export const goToPage = (type, category) => ({
  type,
  payload: category && { category },
});

export const goHome = () => ({ type: 'HOME' });
export const goToAdmin = () => ({ type: 'ADMIN' });
export const notFound = () => ({ type: NOT_FOUND });

export const visitCategory = category => ({
  type: 'LIST',
  payload: { category },
});

export const visitVideo = slug => ({
  type: 'VIDEO',
  payload: { slug },
});
