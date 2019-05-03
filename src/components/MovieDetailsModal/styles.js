export default theme => ({
    modal: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        outline: 'none',
        top: `${50}%`,
        left: `${50}%`,
        transform: `translate(-${50}%, -${50}%)`
    },
    fab: {
        position: 'absolute',
        top: theme.spacing.unit * 2,
        right: theme.spacing.unit * 2,
    },
});
