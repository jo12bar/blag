import React from 'react';
import { connect } from 'react-redux';
import VideoListRow from '../components/VideoListRow';

import styles from '../css/List';

const List = ({ videos }) => (
  <div className={styles.list}>
    {videos.map(v => <VideoListRow {...v} key={v.youtubeId} />)}
  </div>
);

const mapState = ({ category, videosByCategory, videosHash }) => {
  const slugs = videosByCategory[category] || [];
  const videos = slugs.map(slug => videosHash[slug]);
  return { videos };
};

export default connect(mapState)(List);
