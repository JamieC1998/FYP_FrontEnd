import React from 'react';
import { makeStyles, Box, Paper } from '@material-ui/core';
import HeadingComponent from '../heading_component/HeadingComponent';

const useStyles = makeStyles({
    root: {
        display: "flex",
        alignItems: "center",
        flexDirection: "column"
    },
    container: {
        width: "90%",
    },
    container_heading: {
        display: "flex",
        borderRadius: "3px 3px 0px 0px",
        color: "white",
        padding: "0.7rem"
    },
    container_body: {
        minHeight: 10
    }
})

function ContainerBox(props){
    const classes = useStyles();
    var minHeight = (props.minHeight !== undefined) ? props.minHeight : 100;
    
    return (
        <Box my={3} className={classes.container}>
            <Paper elevation={3}>
                <HeadingComponent title={props.title}/>
                <Box minHeight={minHeight}>
                    {props.children}
                </Box>
            </Paper>
        </Box>
    )
}

export default ContainerBox;