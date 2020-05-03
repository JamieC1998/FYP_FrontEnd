import React from 'react';
import { makeStyles, Box, Typography } from '@material-ui/core';

const useStyles = makeStyles({
    container_heading: {
        display: "flex",
        borderRadius: "3px 3px 0px 0px",
        color: "white",
        padding: "0.7rem"
    }
});

function HeadingComponent(props) {
    const classes = useStyles();

    return (
        <Box className={classes.container_heading} bgcolor="primary.main" width="100%">
            <Typography variant="h5" >
                {props.title}
            </Typography>
        </Box>
    );
}

export default HeadingComponent;