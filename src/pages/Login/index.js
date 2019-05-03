import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../../components/AuthContext';
import LoginForm from './LoginForm';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import { Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

function Login(props) {
  console.log(props);
  const { isAuthenticated, onLogin } = useContext(AuthContext);
  const { location } = props;

  const onSubmit = values => {
    const config = {
      headers: { 'content-type': 'application/json' }
    };

    axios
      .post('/api/login/', JSON.stringify(values), config)
      .then(response => {
        onLogin(response.data.token);
      })
      .catch(error => {
        // TODO
        console.log('Login failed', error);
      });
  };

  if (isAuthenticated) {
    if (location.state && location.state.from && location.state.from.pathname)
      return <Redirect to={location.state.from.pathname} />;
    return <Redirect to="/" />;
  }
  return (
    <div className={props.classes.root}>
      <Paper className={props.classes.container}>
        <Typography variant="h5" gutterBottom>
          Login to Movie App
        </Typography>
        <LoginForm onSubmit={onSubmit} />
      </Paper>
    </div>
  );
}

export default withStyles(styles)(Login);
