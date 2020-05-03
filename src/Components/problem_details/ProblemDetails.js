import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, Divider, Snackbar, IconButton } from '@material-ui/core';
import axios from 'axios';
import ProblemDetailsBar from '../problem_details_bar/ProblemDetailsBar';
import CloseIcon from '@material-ui/icons/Close';
import AddProblem from '../add_problem/AddProblem';
import HeadingComponent from '../heading_component/HeadingComponent';
import getService from '../../Utils/ServiceFetching';

function ProblemDetails(props) {
    let contestID = props.contestID;

    const [state, setState] = useState({
        reload: true,
        displayList: [],
        openSnackbar: false,
        snackbarMessage: ""
    });

    const closeSnackbar = () => {
        setState({ ...state, openSnackbar: false });
    }

    const reloadProblemList = (snackbarMessage) => {
        setState({ ...state, reload: true, openSnackbar: "true", snackbarMessage: snackbarMessage });
    }

    useEffect(() => {
        if (state.reload) {
            getService((hostName) => {
                axios.post(`${hostName}/contest/problem/details`, null, {
                    params: {
                        contestID: contestID
                    }
                }).then(response => {
                    setState({ ...state, reload: false, displayList: createTeamDetailsBar(response.data, reloadProblemList) })
                }).catch(err => {
                    console.log(err);
                });
            }, "contest_service");
        }
    });

    return (
        <Box my={3} className={props.classes.container}>
            <Paper elevation={3}>
                <HeadingComponent title="Problems" />
                <Box minHeight={100}>
                    {state.displayList}
                </Box>
                <Box p={1}>
                    <AddProblem callback={reloadProblemList} contestID={contestID} />
                </Box>
            </Paper>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                open={state.openSnackbar}
                autoHideDuration={3000}
                message={state.snackbarMessage}
                onClose={closeSnackbar}
                action={
                    <React.Fragment>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={closeSnackbar}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                }
            />
        </Box>
    );
}

function createTeamDetailsBar(responseData, reloadCallback) {
    var keys = Object.keys(responseData);
    var resList = []
    keys.forEach((element, index) => {
        var data = responseData[element];
        resList.push(<ProblemDetailsBar
            reloadCallback={reloadCallback}
            problemName={data.problemName}
            problemID={data.problemID}
            problemDescription={data.problemDescription}
            problemNumber={data.problemNumber}
            filename={data.fileName}
            key={index} />);

        resList.push(<Divider key={`${index}Divider`} />)
    });

    return resList;
}

export default ProblemDetails;