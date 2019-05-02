import React, {useState, useEffect} from 'react';
import Navbar from '../../components/Navbar';
import MovieList from '../../components/MovieList';
import {withStyles} from "@material-ui/core/styles";
import styles from './styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import queryString from 'query-string';
import Pagination from '../../components/Pagination';
import Modal from '@material-ui/core/Modal';
import MovieDetails from '../../components/MovieDetails';

const {
    REACT_APP_OMDB_API_URL: BASE_URL,
    REACT_APP_OMDB_API_KEY: API_KEY,
} = process.env;


const URL = `${BASE_URL}?apikey=${API_KEY}&`;

function Home(props) {
    const [movieData, setMovieData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);


    useEffect(() => {

        const {page, q: query} = queryString.parse(props.location.search);
        if (!query) return;
        const searchAPI = query => fetch(`${URL}&s=${encodeURIComponent(query)}&page=${page}`);
        const searchAPIDebounced = AwesomeDebouncePromise(searchAPI, 500);

        const fetchData = async () => {
            const response = await searchAPIDebounced(query);
            const json = await response.json();
            console.log(json);
            setLoading(false);
            setMovieData(json);
        };
        setLoading(true);
        fetchData();
    }, [props.location.search]);


    const handleModalClose = () => {
        setSelectedMovie(null);
    };

    const onDetailsClick = movie => event => {
        setSelectedMovie(movie);
    };


    const {classes, history} = props;

    const onSearchQueryChange = event => {
        const query = event.target.value;
        history.push(`/?q=${query}&page=${1}`);
    };

    const onPageChange = (event, page) => {
        const {q: query} = queryString.parse(props.location.search);
        history.push(`/?q=${query}&page=${page + 1}`);
        window.scrollTo(0, 0);
    };


    const {page} = queryString.parse(props.location.search);

    return (
        <div>
            <Navbar onSearchQueryChange={onSearchQueryChange}/>
            {loading ? <LinearProgress className={classes.progress}/> : null}
            <div className={classes.content}>
                <MovieList
                    movies={movieData && movieData.Search ? movieData.Search.map(movie => ({
                            id: movie.imdbID,
                            title: movie.Title,
                            year: movie.Year,
                            poster: movie.Poster,
                        })) : []
                    }
                    onDetailsClick={onDetailsClick}
                />


                {
                    movieData && movieData.totalResults > 10 ?
                        <Pagination
                            rowsPerPage={10}
                            count={movieData.totalResults}
                            page={page - 1}
                            onChangePage={onPageChange}
                        /> : null
                }
            </div>
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={!!selectedMovie}
                onClose={handleModalClose}
            >
                <div className={classes.modal}>
                {selectedMovie && <MovieDetails
                    title={selectedMovie.title}
                    year={selectedMovie.year}
                    poster={selectedMovie.poster}
                    onDetailsClick={() => console.log(selectedMovie.id)}
                />}
                </div>
            </Modal>
        </div>
    );
}

export default withStyles(styles)(Home);
