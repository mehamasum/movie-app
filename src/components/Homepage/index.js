import React from 'react';
import MoviePreviewCard from '../MoviePreviewCard'
import {withStyles} from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    root: {
        margin: theme.spacing.unit * 2,
    }
});

const Homepage = props => {
    const {classes} = props;
    return <div className={classes.root}>
        <Grid container spacing={16}>
            <Grid item xs={12} sm={6} md={4}>
                <MoviePreviewCard/>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <MoviePreviewCard/>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <MoviePreviewCard/>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <MoviePreviewCard/>
            </Grid>
        </Grid>
    </div>;
};

export default withStyles(styles)(Homepage);