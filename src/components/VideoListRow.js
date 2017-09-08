import React from 'react';
import Link from 'redux-first-router-link';

import styles from '../css/VideoListRow';

const youtubeBackground = youtubeId => (
  `url(https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg)`
);

const initials = by => by.split(' ').map(name => name[0]).join('');

const VideoListRow = ({ slug, title, youtubeId, by, color }) => (
  <Link
    className={styles.row}
    to={{ type: 'VIDEO', payload: { slug } }}
    style={{ backgroundImage: youtubeBackground(youtubeId) }}
  >
    <div className={styles.avatar} style={{ backgroundColor: color }}>
      {initials(by)}
    </div>
    <h2 className={styles.title}>{title}</h2>

    <div className={styles.gradient} />
    <span className={styles.by}>by: {by}</span>
  </Link>
);

export default VideoListRow;
