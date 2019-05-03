import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import styles from './styles';

function LoginForm(props) {
  const { classes } = props;
  return (
    <React.Fragment>
      <form onSubmit={props.onSubmit}>
        <TextField
          required
          label={'Username'}
          type="text"
          fullWidth
          className={classes.formItem}
        />

        <TextField
          required
          label={'Password'}
          type="password"
          fullWidth
          className={classes.formItem}
        />

        <Button
          color="secondary"
          variant="contained"
          type="submit"
          fullWidth
          className={classes.submit}
        >
          Login
        </Button>
      </form>
    </React.Fragment>
  );
}

export default withStyles(styles)(LoginForm);
