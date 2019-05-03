import React, {useState} from 'react';
import Modal from '@material-ui/core/Modal';
import MovieDetails from '../../components/MovieDetails';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import {withStyles} from '@material-ui/core/styles';
import styles from './styles';
import {LOCAL_STORAGE_MOVIE_LIST_KEY as KEY} from '../../utils';

function DetailsModal(props) {

    const [savedMovies, setSavedMovies] = useState(JSON.parse(localStorage.getItem(KEY)) || {});

    const toggleSaveToList = (movie) => () => {
        const savedMovies = JSON.parse(localStorage.getItem(KEY)) || {};
        if (savedMovies[movie.imdbID]) {
            delete savedMovies[movie.imdbID];
            console.log(savedMovies);
            localStorage.setItem(KEY, JSON.stringify(savedMovies));
            setSavedMovies(savedMovies);
        } else {
            const updatedSavedMovies = {
                ...savedMovies,
                [movie.imdbID]: movie
            };
            localStorage.setItem(KEY, JSON.stringify(updatedSavedMovies));
            setSavedMovies(updatedSavedMovies)
        }
    };

    const {classes, movie, onClose} = props;

    return (<Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={!!movie}
        onClose={onClose(savedMovies)}
    >
        <div className={classes.modal}>
            {movie && <div>
                <Fab className={classes.fab} color="secondary" onClick={toggleSaveToList(movie)}>
                    {savedMovies[movie.imdbID] ? <DeleteIcon/> : <AddIcon/>}
                </Fab>
                <MovieDetails movie={movie}/>
            </div>}
        </div>
    </Modal>);
}

export default withStyles(styles)(DetailsModal);