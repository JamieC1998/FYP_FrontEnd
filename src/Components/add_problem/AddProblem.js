import React, { useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';
import { Box, Paper, Typography, IconButton, Snackbar, Button, TextField, makeStyles } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
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
        columnGap: "1rem",
        width: "100%",
    },
    text_box_container: {
        display: "flex",
        // justifyContent: "space-between",
        flexWrap: "wrap",
        rowGap: "1rem",
        // columnGap: "1rem",
        columnGap: "5%",
        width: "100%"
    },
    button_box: {
        alignItems: "top",
        display: "flex",
        width: "100%",
        columnGap: "1rem",
        flexWrap: "wrap"
    },
    description: {
        width: "100%"
    },
    input: {
        display: 'none'
    }
});

function AddProblem(props) {
    const [state, setState] = useState({
        open: false,

        inputFiles: [],
        outputFiles: [],
        pdf: null,
        problemName: "",
        problemDescription: "",
        problemNumber: 0
    });

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

    return (
        <Box>
            <Paper elevation={3}>
                <HeadingComponent title="Create Problem" />
                <Box py={1.8} pl={2} pr={2} className={classes.body_box}>
                    <Box className={classes.body_box}>
                        <Box className={classes.text_box_container}>
                            <Box width="47.5%">
                                <TextField className={classes.description} onChange={handleInput("problemName")} label="Problem Name" placeholder="Enter Problem Name" variant="outlined" />
                            </Box>
                            <Box width="47.5%" ml={0}>
                                <TextField className={classes.description} label="Problem Number" placeholder="Enter Problem Number" variant="outlined" />
                            </Box>
                            <Box width="100%" ml={0}>
                                <TextField className={classes.description} multiline rows={2} onChange={handleInput("problemDescription")} label="Problem Description" placeholder="Enter Problem Description" variant="outlined" />
                            </Box>
                        </Box>
                    </Box>
                    <Box className={classes.button_box}>
                        <Box>
                            <input
                                accept=".txt,.in"
                                className={classes.input}
                                id="contained-button-file"
                                onChange={storeFiles(setState, state, "inputFiles")}
                                multiple
                                type="file"
                            />
                            <label htmlFor="contained-button-file">
                                <Button component="span" startIcon={<CloudUploadIcon />}>
                                    Input Files
                                </Button>
                            </label>
                        </Box>
                        <Box>
                            <input
                                accept=".txt,.out"
                                className={classes.input}
                                id="contained-button-file-output"
                                onChange={storeFiles(setState, state, "outputFiles")}
                                multiple
                                type="file"
                            />
                            <label htmlFor="contained-button-file-output">
                                <Button component="span" startIcon={<CloudUploadIcon />}>
                                    Expected Output Files
                                </Button>
                            </label>
                        </Box>
                        <Box>
                            <input
                                accept=".pdf"
                                className={classes.input}
                                id="contained-button-file-pdf"
                                onChange={storeFiles(setState, state, "pdf")}
                                type="file"
                            />
                            <label htmlFor="contained-button-file-pdf">
                                <Button component="span" startIcon={<CloudUploadIcon />}>
                                    PDF
                                </Button>
                            </label>
                        </Box>
                        <Box mr={2}>
                            <Button variant="contained"
                                size="large"
                                onClick={createProblem(
                                    callback,
                                    state,
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

const storeFiles = (setState, state, prop) => event => {
    state[prop] = event.target.files;
    setState(state);
}

const createProblem = (callback, state, contestID) => event => {
    var inputFiles = state.inputFiles;
    var outputFiles = state.outputFiles;
    var pdf = state.pdf[0];
    var problemName = state.problemName;
    var problemDescription = state.problemDescription;
    var problemNumber = state.problemNumber;

    var formData = new FormData();

    formData.append("problemName", problemName);
    formData.append("problemNumber", problemNumber);
    formData.append("contestID", contestID);
    formData.append("problemDescription", problemDescription);
    formData.append("problemNumber", problemNumber);
    formData.append("problemPDF", pdf, pdf.name);

    Array.from(inputFiles).forEach((element, index) => {
        formData.append("inputFiles", element, element.name);
    });

    Array.from(outputFiles).forEach(element => {
        formData.append("expectedOutputFiles", element, element.name);
    })

    getService((hostName) => {
        axios.post(`${hostName}/contest/problem`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            callback(`${problemName} created successfully`);
        }).catch(err => {
            callback(`${problemName} upload failed, try again later`);
        })
    }, "contest_service");


}

export default AddProblem;