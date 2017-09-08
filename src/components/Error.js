import React from 'react';
import { notFound } from '../css/Switcher';

const Error = ({ error }) => (
  <div className={notFound}>
    ERROR: {error.message}
  </div>
);

export default Error;
