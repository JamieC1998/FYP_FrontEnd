import React from 'react';
import { Box, Typography, makeStyles, Button } from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
import axios from 'axios';
import getService from '../../Utils/ServiceFetching';

const useStyles = makeStyles({
    root: {
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        rowGap: "2rem"
    },
    container: {
        textAlign: "left",
        textOverflow: "ellipsis",
        overflow: "hidden",
    },
    id_text: {
        width: "5%",
    },
    name_text: {
        width: "30%",
    },
    description_text: {
        width: "30%",
    },
    button_box: {
        display: "flex",
        flexWrap: "wrap",
        width: "auto",
        justifyContent: "flex-end",
        columnGap: "1rem",
        rowGap: "1rem",
        marginLeft: "auto"
    }
});

function ProblemDetailsBar(props) {
    const classes = useStyles();

    let problemName = props.problemName;
    let problemDescription = props.problemDescription;
    let problemID = props.problemID;
    let problemNumber = props.problemNumber;
    let filename = props.filename

    let reloadCallback = props.reloadCallback;

    return (
        <Box pl={5} m={1} className={classes.root}>
            <Typography className={`${classes.container} ${classes.id_text}`}>{problemNumber}</Typography>
            <Typography className={`${classes.container} ${classes.name_text}`}>{problemName}</Typography>
            <Typography className={`${classes.container} ${classes.description_text}`}>{problemDescription}</Typography>
            <Button variant="contained" onClick={getPDF(problemID, filename)} startIcon={<GetAppIcon />}>Download PDF</Button>
            <Box className={classes.button_box}>
                <Button variant="contained" color="primary">Edit</Button>
                <Button variant="contained"
                    onClick={deleteProblem(problemID, reloadCallback, problemName)}
                    color="secondary">Delete</Button>
            </Box>

        </Box>
    );
}

const getPDF = (problemID, filename) => event => {
    getService((hostName) => {
        axios({
            url: `${hostName}/contest/problem/get/${problemID}`, //your url
            method: 'GET',
            responseType: 'blob', // important
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
            link.remove();
        });
    }, "contest_service");
}

const deleteProblem = (problemID, callback, problemName) => event => {

    getService((hostName) => {
        axios.delete(`${hostName}/contest/problem/${problemID}`).then((response) => {
            callback(`Problem: ${problemName} Deleted Successfully`);
        }).catch(err => {
            console.log(err);
        })
    }, "contest_service")
}

export default ProblemDetailsBar;