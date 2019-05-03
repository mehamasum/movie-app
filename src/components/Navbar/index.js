import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import {withStyles} from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import styles from './styles';
import {AuthContext} from '../AuthContext';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { withRouter } from "react-router";


const PrimarySearchAppBar = props => {
    console.log(props);

    const {isAuthenticated, onLogout} = useContext(AuthContext);
    const [anchorEl, setAnchorEl] = React.useState(null);

    function handleProfileMenuOpen(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleMenuClose() {
        setAnchorEl(null);
    }


    function onLoginClick() {
        handleMenuClose();
        props.history.push('/login');
    }

    function onLogoutClick() {
        handleMenuClose();
        onLogout();
    }

    function onProfileClick() {
        handleMenuClose();
        props.history.push('/profile');
    }

    const {classes} = props;

    const renderMenu = () => {
        return (
            <>
            {isAuthenticated?
                <Menu
                    anchorEl={anchorEl}
                    anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                    transformOrigin={{vertical: 'top', horizontal: 'right'}}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}>
                    <MenuItem onClick={onProfileClick}>Profile</MenuItem>
                    <MenuItem onClick={onLogoutClick}>Logout</MenuItem>
                </Menu> :
                <Menu
                    anchorEl={anchorEl}
                    anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                    transformOrigin={{vertical: 'top', horizontal: 'right'}}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                >
                    <MenuItem onClick={onLoginClick}>Login</MenuItem>
                </Menu>
            }
            </>
        )
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                        Movie App
                    </Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search movie by title..."
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            onChange={props.onSearchQueryChange}
                        />
                    </div>
                    <div className={classes.grow}></div>
                    <div>
                        <IconButton
                            aria-owns={'material-appbar'}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    </div>
                    {renderMenu()}
                </Toolbar>
            </AppBar>
        </div>
    );
};

PrimarySearchAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(PrimarySearchAppBar));
