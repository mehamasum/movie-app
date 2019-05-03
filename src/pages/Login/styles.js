const styles = theme => ({
  root: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    outline: 'none',
    top: `${50}%`,
    left: `${50}%`,
    transform: `translate(-${50}%, -${50}%)`
  },
  container: {
    padding: theme.spacing.unit * 2
  },
  formItem: {
    marginBottom: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2
  }
});

export default styles;
