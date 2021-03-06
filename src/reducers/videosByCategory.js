export default (state = {}, action = {}) => {
  if (action.type === 'VIDEOS_FETCHED') {
    const { category, videos } = action.payload;
    const slugs = videos.map(v => v.slug);
    return { ...state, [category]: slugs };
  }

  return state;
};

// eg: { fp: ['slug-1', 'slug-2'], 'react-redux': ['slug-etc'] }
