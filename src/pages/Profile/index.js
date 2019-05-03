import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import MovieList from '../../components/MovieList';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import MovieDetailsModal from '../../components/MovieDetailsModal';
import { LOCAL_STORAGE_MOVIE_LIST_KEY as KEY } from '../../utils';
import { Typography } from '@material-ui/core/';

function Profile(props) {
  const [movieData, setMovieData] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const savedMovies = JSON.parse(localStorage.getItem(KEY)) || {};
    setMovieData(Object.keys(savedMovies).map(key => savedMovies[key]));
  }, []);

  const handleModalClose = savedMovies => () => {
    setMovieData(Object.keys(savedMovies).map(key => savedMovies[key]));
    setSelectedMovie(null);
  };

  const onDetailsClick = movie => event => {
    setSelectedMovie(movie);
  };

  const { classes } = props;
  return (
    <div>
      <Navbar />
      <div className={classes.content}>
        <Typography
          className={classes.title}
          variant="h6"
          color="primary"
          noWrap
        >
          Here is the list of movies you saved
        </Typography>
        <MovieList movies={movieData || []} onDetailsClick={onDetailsClick} />
      </div>
      <MovieDetailsModal movie={selectedMovie} onClose={handleModalClose} />
    </div>
  );
}

export default withStyles(styles)(Profile);
