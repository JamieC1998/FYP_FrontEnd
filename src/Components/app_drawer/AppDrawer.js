import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import { Toc, Home } from '@material-ui/icons/';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Divider from '@material-ui/core/Divider';

import { Box, Drawer, useTheme, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Link } from 'react-router-dom';

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}));

function AppDrawer(props) {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <Drawer open={props.isOpen} variant="persistent" anchor="left">
            <div className={classes.drawerHeader}>
                <IconButton onClick={props.drawerClose}>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </div>
            <Divider />
            <Box mr={5}>
                <List>
                    <ListItem component={Link} to="/" onClick={props.drawerClose} button>
                        <ListItemIcon>
                            <Home />
                        </ListItemIcon>
                        <ListItemText primary={"Home"} />
                    </ListItem>
                    <ListItem component={Link} onClick={props.drawerClose} to="/contests" button>
                        <ListItemIcon>
                            <Toc />
                        </ListItemIcon>
                        <ListItemText primary={"Contests"} />
                    </ListItem>
                </List>
            </Box>
        </Drawer>
    );
}

export default AppDrawer;