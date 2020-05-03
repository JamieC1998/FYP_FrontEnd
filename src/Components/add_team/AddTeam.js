import React, { useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';
import { Box, Paper, Typography, IconButton, Snackbar, Button, TextField, makeStyles } from '@material-ui/core';
import HeadingComponent from '../heading_component/HeadingComponent';
import getService from '../../Utils/ServiceFetching';

const useStyles = makeStyles({
    title: {
        color: "white"
    },
    title_box: {
        borderRadius: "3px 3px 0px 0px",
        display: "flex",
    },
    body_box: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        rowGap: "1rem",
        columnGap: "1rem"
    },
    button_box: {
        justifySelf: "end"
    }
});

function AddTeam(props) {
    const [state, setState] = useState({
        open: false,
        teamName: "",
        contactEmail: ""
    });

    const openSnackbar = () => {
        setState({ ...state, open: true });
    }

    const closeSnackbar = () => {
        setState({ ...state, open: false });
    }

    const handleInput = propName => event => {
        var tempState = { ...state };
        tempState[propName] = event.target.value;
        setState(tempState);
    }

    const classes = useStyles();

    let contestID = props.contestID;
    let callback = props.callback;

    var buttonCallback = () => {
        callback();
        openSnackbar();
    }

    return (
        <Box>
            <Paper elevation={3}>
                <HeadingComponent title="Create Team" />
                <Box py={1.8} pl={2} className={classes.body_box}>
                    <Box className={classes.body_box}>
                        <Box>
                            <TextField onChange={handleInput("teamName")} label="Team Name" placeholder="Enter Team Name" variant="outlined" />
                        </Box>
                        <Box ml={0}>
                            <TextField onChange={handleInput("contactEmail")} label="Contact Email" placeholder="Enter Team Email" variant="outlined" />
                        </Box>
                    </Box>
                    <Box >
                        <Box mr={2}>
                            <Button variant="contained"
                                size="large"
                                onClick={createTeam(
                                    buttonCallback,
                                    state.teamName,
                                    state.contactEmail,
                                    contestID
                                )
                                }
                                color="primary">
                                Create
                        </Button>
                        </Box>
                    </Box>
                </Box>
            </ Paper>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                open={state.open}
                autoHideDuration={3000}
                message={"Contest Created Successfully"}
                onClose={closeSnackbar}
                action={
                    <React.Fragment>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={closeSnackbar}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                }
            />
        </Box>);
}

const createTeam = (callback, teamName, contactEmail, contestID) => event => {

    getService((hostName) => {
        axios.post(`${hostName}/contest/team/create`, null, {
            params: {
                teamName: teamName,
                teamOwner: contactEmail,
                contestID: contestID,
            }
        }).then((response) => {
            callback();
        });
    }, "contest_service");
}

export default AddTeam;