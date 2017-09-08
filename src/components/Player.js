import React from 'react';
import { connect } from 'react-redux';
import Link from 'redux-first-router-link';
import Ionicon from 'react-ionicons';

import styles from '../css/Player';

const youtubeBackground = youtubeId => (
  `url(https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg)`
);

const youtubeIframeSrc = youtubeId => (
  `https://www.youtube.com/embed/${youtubeId}?playlist=${youtubeId}&autoplay=1&rel=0&theme=dark&loop=1&color=white&controls=2&autohide=1&showinfo=0`
);

const Player = ({ playing, youtubeId, slug, color }) => (
  !playing
    ?
      <div
        className={styles.heroContainer}
        style={{ backgroundImage: youtubeBackground(youtubeId) }}
      >
        <Link
          to={{ type: 'PLAY', payload: { slug } }}
          className={styles.playIconContainer}
        >
          <Ionicon
            icon='ion-play'
            color='#fff'
            className={styles.playIcon}
            style={{ backgroundColor: color }}
          />
        </Link>
      </div>
    :
      <iframe
        className={styles.iframe}
        frameBorder='0'
        allowFullScreen
        src={youtubeIframeSrc(youtubeId)}
      />
);

export default connect(({ playing }) => ({ playing }))(Player);
