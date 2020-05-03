import React, { useState } from 'react';
import { Box, Paper, Typography, TextField, makeStyles, Button, Snackbar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Axios from 'axios';
import { useDispatch } from 'react-redux';
import HeadingComponent from '../heading_component/HeadingComponent';
import getService from '../../Utils/ServiceFetching';

const useStyles = makeStyles({
    create_contest_child: {
    },
    create_contest_child_button: {
        display: "flex",
        justifyContent: "flex-end",
    },
    container_body: {
        display: "flex",
        justifyContent: "space-between"
    }
});
function CreateContestBox(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [state, setState] = useState({
        open: false,
        contestName: "",
    });

    const openSnackbar = () => {
        setState({ ...state, open: true });
    }

    const closeSnackbar = () => {
        setState({ ...state, open: false });
    }

    const handleInput = event => {
        setState({ ...state, contestName: event.target.value });
    }

    return (
        <Box my={3} className={props.classes.container}>
            <Paper elevation={3}>
                <HeadingComponent title="Create Contest" />
                <Box py={1.8} pl={2} display="flex" alignItems="center" className={classes.container_body}>
                    <Box className={classes.create_contest_child}>
                        <TextField onChange={handleInput} label="Contest Title" placeholder="Enter Contest Title" variant="outlined" />
                    </Box>
                    <Box className={classes.create_contest_child_button}>
                        <Box mr={2}><Button variant="contained" size="large" onClick={createContest(openSnackbar, state.contestName, dispatch, "jamie.cotter@mycit.ie")} color="primary">Create</Button></Box>
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

const createContest = (callback, contestName, dispatch, owner) => event => {
    getService((hostName) => {
        Axios.post(`${hostName}/contest/create`, null, {
            params: {
                contestName: contestName,
                contestOwner: owner
            }
        }).then((response) => {
            callback();
            dispatch({ type: "set_contest_list", payload: true });
        }).catch((err) => {

        });
    }, "contest_service")
}


export default CreateContestBox;