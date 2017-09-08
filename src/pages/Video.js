import React from 'react';
import { connect } from 'react-redux';

import Player from '../components/Player';
import styles from '../css/Video';

const Video = ({ slug, title, youtubeId, category, by, color, tip }) => (
  <div className={styles.video}>
    <Player slug={slug} youtubeId={youtubeId} color={color} />

    <div className={styles.infoContainer}>
      <span className={styles.title}>{title}</span>

      <div className={styles.infoRow}>
        <div className={styles.category} style={{ backgroundColor: color }}>
          <span>{category}</span>
        </div>
      </div>

      <span className={styles.byText}>By: {by}</span>
    </div>

    <div className={styles.seperator} />

    <span className={styles.tipTitle}>Tip</span>
    <p className={styles.tip}>
      {slug
        ? tip
        : <span className={styles.tipMissing}>
          YOU FOUND A MISSING FEATURE!<br />
          There is no data because you refreshed the video page, whose data is
          fetched on the previous page. Try adding a thunk to this route
          in <code className={styles.tipMissingCode}>configureStore.js</code> to
          insure that when visited directly this page has its data as well. Use
          the <code className={styles.tipMissingCode}>findVideo(slug)</code>
          &nbsp;method
          in <code className={styles.tipMissingCode}>../api/index.js</code>
        </span>
      }
    </p>
  </div>
);

const mapState = ({ videosHash, slug }) => videosHash[slug] || {};

export default connect(mapState)(Video);
