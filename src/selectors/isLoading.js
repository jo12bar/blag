import { createSelector } from 'reselect';

export default createSelector(
  [
    state => state.location.type,
    state => state.location.payload,
    state => state.videosHash,
    state => state.videosByCategory,
  ],
  (type, { slug, category }, videosHash, videosByCategory) => {
    console.log('type:', type);
    console.log('slug:', slug);
    console.log('category:', category);
    console.log('videosHash:', videosHash);
    console.log('videosByCategory:', videosByCategory);
    if (type === 'VIDEO') return typeof videosHash[slug] === 'undefined';
    if (type === 'LIST') return !videosByCategory[category];
    return false;
  }
);
