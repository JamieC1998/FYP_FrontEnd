import React from 'react';
import { Box, makeStyles } from '@material-ui/core';
import { useLocation, useHistory } from 'react-router-dom';
import ContainerBox from '../../Components/container_box/ContainerBox';
import TeamProblems from '../../Components/team_problems/TeamProblems';

const useStyles = makeStyles({
    root: {
        display: "flex",
        alignItems: "center",
        flexDirection: "column"
    },
})

function TeamView(props) {
    const location = useLocation();
    const history = useHistory();
    const classes = useStyles();

    if (location.state === undefined) {
        history.push("/");
    }

    var teamID = location.state.teamID;

    return (
        <Box className={classes.root}>
            <TeamProblems teamID={teamID} />
        </Box>
    );
}

export default TeamView; 