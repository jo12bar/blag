import React from 'react';
import 'normalize.css/normalize';

import DevTools from './DevTools';
import Sidebar from './Sidebar';
import Switcher from './Switcher';

import styles from '../css/App';

const App = () => (
  <div>
    <div className={styles.app}>
      <Sidebar />
      <Switcher />
    </div>

    <DevTools />
  </div>
);

export default App;
