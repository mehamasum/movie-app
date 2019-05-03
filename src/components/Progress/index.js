import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import { withStyles } from '@material-ui/core';
import styles from './styles';

const Loader = props => {
  return (
    <div>
      <div className={props.classes.centerMiddleContainer}>
        <CircularProgress className={props.classes.loader} />
      </div>
    </div>
  );
};

export default withStyles(styles)(Loader);
