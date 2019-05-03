import React from 'react';
import MoviePreviewCard from '../MoviePreviewCard';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    margin: theme.spacing.unit * 2
  }
});

const MovieList = props => {
  const { classes, movies, onDetailsClick } = props;
  if (movies.length === 0)
    return <Typography variant="h5">No movies found</Typography>;

  return (
    <div className={classes.root}>
      <Grid container spacing={16}>
        {movies.map((movie, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <MoviePreviewCard
              movie={movie}
              onDetailsClick={onDetailsClick(movie)}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default withStyles(styles)(MovieList);
