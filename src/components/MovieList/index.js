import React from 'react';
import MoviePreviewCard from '../MoviePreviewCard'
import {withStyles} from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    root: {
        margin: theme.spacing.unit * 2,
    }
});

const MovieList = props => {
    const {classes, movies, onDetailsClick} = props;
    if (movies.length === 0) return <h1>No movies found</h1>;

    return <div className={classes.root}>
        <Grid container spacing={16}>
            {movies.map(movie =>
                <Grid item xs={12} sm={6} md={4} key={movie.id}>
                    <MoviePreviewCard
                        title={movie.title}
                        year={movie.year}
                        poster={movie.poster}
                        onDetailsClick={onDetailsClick(movie)}
                    />
                </Grid>
            )}
        </Grid>
    </div>;
};

export default withStyles(styles)(MovieList);