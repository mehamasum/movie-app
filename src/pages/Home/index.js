import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import MovieList from '../../components/MovieList';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import queryString from 'query-string';
import Pagination from '../../components/Pagination';
import MovieDetailsModal from '../../components/MovieDetailsModal';
import { OMDB_URL } from '../../utils/index';
import { Typography } from '@material-ui/core';
const PAGE_SIZE = 10;

export const makeURL = (query, page) =>
  `${OMDB_URL}&s=${encodeURIComponent(query)}&page=${page}`;

const searchAPI = (query, page) => fetch(makeURL(query, page));

function Home(props) {
  const [movieData, setMovieData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const { page, q: query } = queryString.parse(props.location.search);
    if (!query) return;

    const fetchData = async () => {
      const response = await searchAPI(query, page);
      const json = await response.json();
      setLoading(false);
      setMovieData(json);
    };
    setLoading(true);
    fetchData();
  }, [props.location.search]);

  const handleModalClose = () => () => {
    setSelectedMovie(null);
  };

  const onDetailsClick = movie => event => {
    setSelectedMovie(movie);
  };

  const { classes, history } = props;

  const onSearchQueryChange = query => {
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
      <Navbar searchable onSearchQueryChange={onSearchQueryChange} />
      {loading ? <LinearProgress className={classes.progress} /> : null}
      <div className={classes.content}>
        <Typography
          className={classes.title}
          variant="h6"
          color="primary"
          noWrap
        >
          Search results
        </Typography>

        <MovieList
          movies={movieData && movieData.Search ? movieData.Search : []}
          onDetailsClick={onDetailsClick}
        />

        {movieData && movieData.totalResults > PAGE_SIZE ? (
          <Pagination
            rowsPerPage={PAGE_SIZE}
            count={movieData.totalResults}
            page={page - 1}
            onChangePage={onPageChange}
          />
        ) : null}
      </div>
      <MovieDetailsModal movie={selectedMovie} onClose={handleModalClose} />
    </div>
  );
}

export default withStyles(styles)(Home);
