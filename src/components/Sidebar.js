import React from 'react';
import { NavLink } from 'redux-first-router-link';
import styles from '../css/Sidebar';

const Sidebar = () => (
  <div className={styles.sidebar}>
    <h2>SEO-FRIENDLY LINKS</h2>

    <NavLink activeClassName={styles.active} exact to='/'>HOME</NavLink>

    <NavLink activeClassName={styles.active} to='/list/db-graphql'>
      DB & GRAPHQL
    </NavLink>

    <NavLink activeClassName={styles.active} to={['list', 'react-redux']}>
      REACT & REDUX
    </NavLink>

    <NavLink
      activeClassName={styles.active}
      to={{ type: 'LIST', payload: { category: 'fp' } }}
    >
      FP
    </NavLink>
  </div>
);

export default Sidebar;
