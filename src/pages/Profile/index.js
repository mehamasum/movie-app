import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import MovieList from '../../components/MovieList';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import {populateHeaderWithAuthToken, convertToOMDBFormat} from '../../utils';
import { Typography, Button } from '@material-ui/core/';
import axios from 'axios';
import LinearProgress from '@material-ui/core/LinearProgress';

function Profile(props) {
  const [savedMovies, setSavedMovies] = useState(null);
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
        setSavedMovies(response.data);
      })
      .catch(error => {
        // TODO
        console.log('fetchSavedMovies failed', error);
      });
  }

  const fetchNextPage = () => {
    if(!savedMovies) return;

    const config = {
      headers: populateHeaderWithAuthToken()
    };
    setLoading(true);
    // TODO: add polyfill
    axios
      .get(`/api/collection/${new URL(savedMovies.next).search}`, config)
      .then(response => {
        setLoading(false);
        setSavedMovies({
          next: response.data.next,
          previous: response.data.previous, 
          results: [
            ...savedMovies.results,
            ...response.data.results
          ]
        });
        console.log(response.data);
      })
      .catch(error => {
        // TODO
        console.log('fetchNextPage failed', error);
      });
  }

  useEffect(() => {
    fetchSavedMovies();
  }, []);

  const onDeleteFromCollection = (movie) => {
    console.log('Deleted', movie);
    setSavedMovies({
      ...savedMovies, 
      results: savedMovies.results.filter(item => item.id !== movie.id)
    });
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
        {savedMovies && <MovieList movies={savedMovies.results.map(m => convertToOMDBFormat(m))} onDeleteFromCollection={onDeleteFromCollection} />}
        {savedMovies && savedMovies.next && <Button fullWidth onClick={fetchNextPage}>Load more</Button>}
      </div>
    </div>
  );
}

export default withStyles(styles)(Profile);
