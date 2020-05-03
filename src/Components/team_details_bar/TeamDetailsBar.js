import React from 'react';
import { Box, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        display: "flex",
        flexWrap: "wrap"
    },
    items: {
        width: "20%",
        textAlign: "left",
        marginRight: "5%",
        textOverflow: "ellipsis",
        overflow: "hidden"
    }
})

function TeamDetailsBar(props){
    var teamID = props.teamID;
    var teamName = props.teamName;
    var email = props.email;
    var points = props.points;

    const classes = useStyles();

    return (
        <Box pl={5} m={1} className={classes.root}>
            <Typography className={classes.items} variant="body1">{teamID}</Typography>
            <Typography className={classes.items} variant="body1">{teamName}</Typography>
            <Typography className={classes.items} variant="body1">{email}</Typography>
            <Typography className={classes.items} variant="body1">{points}</Typography>
        </Box>
    )
}

export default TeamDetailsBar;