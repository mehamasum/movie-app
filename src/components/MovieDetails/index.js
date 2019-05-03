import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { getPosterUrl, OMDB_URL } from '../../utils/index';
import MovieDetails from './MovieDetails';

const styles = theme => ({
  card: {
    width: '100%',
    height: '100%'
  },
  media: {
    height: 200
  }
});

function MediaCard(props) {
  const { classes, movie } = props;
  const [details, setDetails] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${OMDB_URL}&i=${encodeURIComponent(movie.imdbID)}`
      );
      const json = await response.json();
      console.log(json);
      setDetails(json);
    };
    fetchData();
  }, []);

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={getPosterUrl(movie.Poster)}
        title={`Poster of ${movie.Title}`}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {movie.Title}
        </Typography>
        {details ? <MovieDetails movie={details} /> : 'Loading...'}
      </CardContent>
    </Card>
  );
}

MediaCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MediaCard);
