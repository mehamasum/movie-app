import React, {useContext} from 'react';
import {Route, Redirect} from 'react-router';
import {AuthContext} from "../../components/AuthContext";
import LoginForm from "./LoginForm";
import {withStyles} from '@material-ui/core/styles';
import styles from './styles';
import {Paper} from "@material-ui/core";
import Typography from '@material-ui/core/Typography';

function Login(props) {
    console.log(props);
    const {isAuthenticated, onLogin} = useContext(AuthContext);
    const {location} = props;

    const onSubmit = event => {
        event.preventDefault();
        onLogin();
    };

    if (isAuthenticated) {
        if (location.state && location.state.from && location.state.from.pathname)
            return <Redirect to={location.state.from.pathname}/>;
        return <Redirect to="/"/>;
    }
    return <div className={props.classes.root}>
        <Paper className={props.classes.container}>
            <Typography variant="h5" gutterBottom>
                Login to Movie App
            </Typography>
            <LoginForm onSubmit={onSubmit}/>
        </Paper>
    </div>;

}

export default withStyles(styles)(Login);
