import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { getPosterUrl } from '../../utils';

const styles = theme => ({
  card: {
    width: '100%',
    height: '100%'
  },
  media: {
    height: 400
  },
  title: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }
});

function MediaCard(props) {
  const { classes, movie, onDetailsClick } = props;
  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={getPosterUrl(movie.Poster)}
        title={`Poster of ${movie.Title}`}
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="title"
          className={classes.title}
        >
          {`${movie.Title} (${movie.Year})`}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={onDetailsClick}
          data-test="learn-more-btn"
        >
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}

MediaCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MediaCard);
