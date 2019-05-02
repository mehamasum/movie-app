import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    card: {
        width: '100%',
        height: '100%'
    },
    media: {
        height: 400,
    },
    title: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    }
});

function MediaCard(props) {
    const {classes, title, year, poster} = props;
    return (
        <Card className={classes.card}>
            <CardMedia
                className={classes.media}
                image={poster}
                title={`Poster of ${title}`}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
                    {`${title} (${year})`}
                </Typography>
            </CardContent>
        </Card>
    );
}

MediaCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MediaCard);