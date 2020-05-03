import React, { useCallback, useState, useEffect } from 'react';
import { Box, makeStyles, Typography, Button } from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
import PublishIcon from '@material-ui/icons/Publish';
import getFile from '../../Utils/FileDownloader';
import Axios from 'axios';
import getService from '../../Utils/ServiceFetching';

const useStyles = makeStyles({
    root: {
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        rowGap: "1rem",
        columnGap: "1rem"
    },
    child_container: {
        display: "flex",
        flexWrap: "flex-wrap",
        justifyContent: "space-between",
        columnGap: "5rem"
    }
});

function TeamProblemBar(props) {
    var teamID = props.teamID;
    var problemID = props.problemID;
    var filename = props.filename;
    var problemNumber = props.problemNumber;
    var problemName = props.problemName;
    var problemDescription = props.problemDescription;

    var callback = props.callback;
    
    const classes = useStyles();

    return (
        <Box p={2} className={classes.root}>
            <Box className={classes.child_container}>
                <Typography>{problemNumber}</Typography>
                <Typography>{problemName}</Typography>
                <Typography>{problemDescription}</Typography>
            </Box>
            {props.icon}
            <Button variant="contained" onClick={
                pullFile(filename, problemID)
            } startIcon={<GetAppIcon />}>Download PDF</Button>
            <input
                accept=".txt,.py,.c,.java,.cpp"
                className={classes.input}
                onChange={submitSolution(problemID, teamID, callback)}
                style={{ display: 'none' }}
                id="raised-button-file"
                type="file"
            />
            <label htmlFor="raised-button-file">
                <Button variant="contained" component="span" color="primary" startIcon={<PublishIcon />}>Submit Solution</Button>
            </label>
        </Box>
    );
}

const pullFile = (filename, problemID) => event => {
    getService((hostName) => {
        getFile(filename, `${hostName}/contest/problem/get`, problemID);
    }, "contest_service");
}

const submitSolution = (problemID, teamID, successCallback) => event => {
    var file = event.target.files[0];
    const callback = (hostName) => {
        var formData = new FormData();

        formData.append("solution", file, file.name);
        formData.append("problemID", problemID);
        formData.append("teamID", teamID);


        Axios.post(`${hostName}/grader/submit`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            successCallback();
        })
        .catch(err => {
            console.log(err)
        })
    }

    getService(callback, "registration_service");
    
}

export default TeamProblemBar;