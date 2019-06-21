import React, { useState, useEffect } from 'react';
import Modal from '@material-ui/core/Modal';
import MovieDetails from '../../components/MovieDetails';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import axios from 'axios';
import {populateHeaderWithAuthToken, convertToOMDBFormat} from '../../utils';


function DetailsModal(props) {
  const [saved, setSaved] = useState(null);
  const [loading, setLoading] = useState(false);

  const config = {
    headers: populateHeaderWithAuthToken()
  };

  useEffect(() => {
    if(!props.movie) return;
    setLoading(true);
    axios
      .get(`/api/collection/?movie=${props.movie.imdbID}`, config)
      .then(response => {
        setLoading(false);
        setSaved(response.data);
      })
      .catch(error => {
        setLoading(false);
        setSaved(false);
      });
  }, [props.movie])


  const toggleSaveToList = () => {
    if(saved===null) return;
    setLoading(true);

    if(saved) {
      const config = {
        headers: populateHeaderWithAuthToken()
      };

      axios
        .delete(`/api/collection/${saved.id}/`, config)
        .then(response => {
          setLoading(false);
          setSaved(false);
        })
        .catch(error => {
          // TODO
          console.log('unsave failed', error);
        });      
    } else {
      const config = {
        headers: populateHeaderWithAuthToken({ 'content-type': 'application/json' })
      };
  
      const {movie} = props;
      axios
        .post('/api/collection/', JSON.stringify({
          movie: movie.imdbID,
          title: movie.Title,
          poster: movie.Poster,
          year: movie.Year 
        }), config)
        .then(response => {
          setLoading(false);
          setSaved(response.data);
        })
        .catch(error => {
          // TODO
          console.log('save failed', error);
        });

    }
    
  };

  const { classes, movie, onClose } = props;

  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={!!movie}
      onClose={onClose}
    >
      <div className={classes.modal}>
        {movie && (
          <div>
            <Fab
              className={classes.fab}
              color="secondary"
              onClick={toggleSaveToList}
              disabled={loading}
            >
              {loading ? '...' : saved ? <DeleteIcon /> : <AddIcon />}
            </Fab>
            <MovieDetails movie={movie} />
          </div>
        )}
      </div>
    </Modal>
  );
}

export default withStyles(styles)(DetailsModal);
