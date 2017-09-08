import React from 'react';
import { connect } from 'react-redux';
import { TransitionGroup, Transition } from 'transition-group';
import universal from 'react-universal-component';

import Loading from './Loading';
import Err from './Error';
import isLoading from '../selectors/isLoading';
import styles from '../css/Switcher';

const UniversalComponent = universal(({ page }) => import(`../pages/${page}`), {
  minDelay: 500,
  loading: Loading,
  error: Err,
});

const Switcher = ({ page, direction, isLoading }) => (
  <TransitionGroup
    className={`${styles.switcher} ${direction}`}
    duration={500}
    prefix='fade'
  >
    <Transition key={page}>
      <UniversalComponent page={page} isLoading={isLoading} />
    </Transition>
  </TransitionGroup>
);

const mapState = ({ page, direction, ...state }) => {
  const isLoad = isLoading(state);
  console.log('isLoading:', isLoad);
  return ({
    page,
    direction,
    isLoading: isLoad,
  });
};

export default connect(mapState)(Switcher);
