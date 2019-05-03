import React from 'react';
import { Typography } from '@material-ui/core';

function MediaCard(props) {
  const { movie } = props;
  return (
    <React.Fragment>
      <Typography component="p">{`Year: ${movie.Year}`}</Typography>
      <Typography component="p">{`Actors: ${movie.Actors}`}</Typography>
      <Typography component="p">{`Director: ${movie.Director}`}</Typography>
      <Typography component="p">{`Genre: ${movie.Genre}`}</Typography>
      <br />

      <Typography component="p">
        {`IMDb Rating: ${movie.imdbRating} (${movie.imdbVotes} votes)`}
      </Typography>

      <br />

      <Typography component="p">{`${movie.Plot}`}</Typography>
    </React.Fragment>
  );
}

export default MediaCard;
