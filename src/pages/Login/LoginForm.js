import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import styles from './styles';

const INITIAL_FIELD_VALUES = {
  username: '',
  password: ''
};

function LoginForm(props) {
  const { classes } = props;
  const [values, setValues] = useState(INITIAL_FIELD_VALUES);
  const [feedback, setFeedback] = useState(null);
  const [requesting, setRequesting] = useState(false);

  const onSubmit = e => {
    e.preventDefault();
    props.onSubmit(values);
  };

  const onChange = name => e => {
    const _value = e.target.value;
    setValues({
      ...values,
      [name]: _value
    });
  };

  return (
    <React.Fragment>
      <form onSubmit={onSubmit}>
        <TextField
          required
          label={'Username'}
          type="text"
          fullWidth
          value={values['username']}
          onChange={onChange('username')}
          className={classes.formItem}
        />

        <TextField
          required
          label={'Password'}
          type="password"
          fullWidth
          value={values['password']}
          onChange={onChange('password')}
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
