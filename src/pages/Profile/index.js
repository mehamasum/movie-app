import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import MovieList from '../../components/MovieList';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import {populateHeaderWithAuthToken, convertToOMDBFormat} from '../../utils';
import { Typography } from '@material-ui/core/';
import axios from 'axios';
import LinearProgress from '@material-ui/core/LinearProgress';

function Profile(props) {
  const [savedMovies, setSavedMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSavedMovies = () => {
    const config = {
      headers: populateHeaderWithAuthToken()
    };
    setLoading(true);
    axios
      .get('/api/collection/', config)
      .then(response => {
        setLoading(false);
        setSavedMovies(response.data.map(savedMovie => convertToOMDBFormat(savedMovie)));
      })
      .catch(error => {
        // TODO
        console.log('fetchSavedMovies failed', error);
      });
  }

  useEffect(() => {
    fetchSavedMovies();
  }, []);

  const onModalClose = () => {
    // fetchSavedMovies();
  };

  const { classes } = props;
  return (
    <div>
      <Navbar />
      {loading ? <LinearProgress className={classes.progress} /> : null}
      <div className={classes.content}>
        <Typography
          className={classes.title}
          variant="h6"
          color="primary"
          noWrap
        >
          Saved movies
        </Typography>
        <MovieList movies={savedMovies} onModalClose={onModalClose} />
      </div>
    </div>
  );
}

export default withStyles(styles)(Profile);
