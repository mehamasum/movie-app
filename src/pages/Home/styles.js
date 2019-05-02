export default theme => ({
    content: {
        margin: theme.spacing.unit
    },
    progress: {
        height: 2
    },
    modal: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        outline: 'none',
        top: `${50}%`,
        left: `${50}%`,
        transform: `translate(-${50}%, -${50}%)`,
    }
})