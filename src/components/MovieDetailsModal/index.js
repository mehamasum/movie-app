import React, { useState, useEffect } from 'react';
import Modal from '@material-ui/core/Modal';
import MovieDetails from '../../components/MovieDetails';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import axios from 'axios';
import {populateHeaderWithAuthToken, convertToNativeFormat} from '../../utils';
import Snackbar from '@material-ui/core/Snackbar';

function DetailsModal(props) {
  const [saved, setSaved] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    if(!props.movie) return;
    setLoading(true);
    const config = {
      headers: populateHeaderWithAuthToken()
    };
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
          setOpen('Deleted from collection');
          props.onDeleteFromCollection(saved);
          props.onClose();
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
        .post('/api/collection/', JSON.stringify(convertToNativeFormat(movie)), config)
        .then(response => {
          setLoading(false);
          setSaved(response.data);
          setOpen('Added to collection');
        })
        .catch(error => {
          // TODO
          console.log('save failed', error);
        });

    }
    
  };


  function handleClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  }

  const { classes, movie, onClose } = props;

  return (
    <>
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
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={!!open}
      autoHideDuration={1000}
      onClose={handleClose}
      message={open}
    />
  </>
  );
}

export default withStyles(styles)(DetailsModal);
