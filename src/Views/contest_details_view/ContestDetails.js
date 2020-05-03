import React, { useEffect } from "react";
import { makeStyles, Box } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import TeamDetails from "../../Components/team_details/TeamDetails";
import { useSelector, useDispatch } from "react-redux";
import ProblemDetails from "../../Components/problem_details/ProblemDetails";


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
});

function ContestDetails(props) {
    let location = useLocation();
    const classes = useStyles();

    let selector = useSelector(state => state);
    let dispatch = useDispatch();

    let contestID = location.state.contestID;
    let contestName = location.state.contestName;

    useEffect(() => {
        if(selector.title !== contestName){
            dispatch({type: "title_change", payload: contestName})
        }
    });

    return (
        <Box className={classes.root}>
            <TeamDetails contestID={contestID} classes={classes} />
            <ProblemDetails contestID={contestID} classes={classes} />
        </Box>);
}

export default ContestDetails;