export default (state = {}, action = {}) => {
  switch (action.type) {
    case 'VIDEOS_FETCHED': {
      const { videos } = action.payload;
      const videosHash = videos.reduce((vs, v) => ({ ...vs, [v.slug]: v }), {});
      return { ...state, ...videosHash };
    }

    case 'VIDEO_FOUND': {
      const { slug, video } = action.payload;
      return {
        ...state,
        [slug]: video,
      };
    }

    default: return state;
  }
};

// eg: { 'slug-1': video1, 'slug-2': video2 }
