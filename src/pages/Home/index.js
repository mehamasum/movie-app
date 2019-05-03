import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import MovieList from '../../components/MovieList';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import queryString from 'query-string';
import Pagination from '../../components/Pagination';
import Modal from '@material-ui/core/Modal';
import MovieDetails from '../../components/MovieDetails';
import { OMDB_URL } from '../../utils/index';

function Home(props) {
  const [movieData, setMovieData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const { page, q: query } = queryString.parse(props.location.search);
    if (!query) return;
    const searchAPI = query =>
      fetch(`${OMDB_URL}&s=${encodeURIComponent(query)}&page=${page}`);
    const searchAPIDebounced = AwesomeDebouncePromise(searchAPI, 500);

    const fetchData = async () => {
      const response = await searchAPIDebounced(query);
      const json = await response.json();
      console.log(json);
      setLoading(false);
      setMovieData(json);
    };
    setLoading(true);
    fetchData();
  }, [props.location.search]);

  const handleModalClose = () => {
    setSelectedMovie(null);
  };

  const onDetailsClick = movie => event => {
    setSelectedMovie(movie);
  };

  const { classes, history } = props;

  const onSearchQueryChange = event => {
    const query = event.target.value;
    history.push(`/?q=${query}&page=${1}`);
  };

  const onPageChange = (event, page) => {
    const { q: query } = queryString.parse(props.location.search);
    history.push(`/?q=${query}&page=${page + 1}`);
    window.scrollTo(0, 0);
  };

  const { page } = queryString.parse(props.location.search);

  return (
    <div>
      <Navbar onSearchQueryChange={onSearchQueryChange} />
      {loading ? <LinearProgress className={classes.progress} /> : null}
      <div className={classes.content}>
        <MovieList
          movies={movieData && movieData.Search ? movieData.Search : []}
          onDetailsClick={onDetailsClick}
        />

        {movieData && movieData.totalResults > 10 ? (
          <Pagination
            rowsPerPage={10}
            count={movieData.totalResults}
            page={page - 1}
            onChangePage={onPageChange}
          />
        ) : null}
      </div>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={!!selectedMovie}
        onClose={handleModalClose}
      >
        <div className={classes.modal}>
          {selectedMovie && <MovieDetails movie={selectedMovie} />}
        </div>
      </Modal>
    </div>
  );
}

export default withStyles(styles)(Home);
