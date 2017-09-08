import React from 'react';
import { connect } from 'react-redux';

import styles from '../css/DevTools';

const ActionsBoxComponent = ({ actions }) => (
  <div className={styles.actionsBox}>
    <pre>{JSON.stringify(actions, null, 2)}</pre>
  </div>
);

const ActionsBox = connect(
  ({ actions }) => ({ actions })
)(ActionsBoxComponent);

const StateBoxComponent = state => (
  <div className={styles.stateBox}>
    <pre>{JSON.stringify(state, null, 2)}</pre>
  </div>
);

const StateBox = connect(
  state => ({ ...state, actions: undefined })
)(StateBoxComponent);

const DevTools = () => (
  <div className={styles.container}>
    <div className={styles.titleBar}>
      <span>ACTIONS</span>
      <span>DEV-TOOLS</span>
      <span>STATE</span>
    </div>

    <div className={styles.devTools}>
      <ActionsBox />
      <StateBox />
    </div>
  </div>
);

export default DevTools;
