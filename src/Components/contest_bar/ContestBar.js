import React from 'react';
import { Box, Typography, makeStyles, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
    contest_text: {
        width: "25%",
        textAlign: "left",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden",
        marginRight: "1rem"

    },
    contest_bar_button: {
        width: "50%",
        display: "flex",
        justifyContent: "flex-end",
    },

});

function ContestBar(props) {
    const classes = useStyles();
    let history = useHistory();

    var contestID = props.contestID;
    var contestName = props.contestName;
    var contestOwner = props.contestOwner;

    return (
        <Box p={1} pl={2} display="flex" alignItems="center">
            <Typography className={classes.contest_text}>{contestName}</Typography>
            <Typography className={classes.contest_text}>{contestOwner}</Typography>
            <Box pr={2} pl={2} className={classes.contest_bar_button}>
                <Button onClick={openContest(contestID, contestName, history)} variant="contained" color="primary">Edit</Button>
            </Box>
        </Box>
    );
}

const openContest = (contestID, contestName, history) => event => {
    history.push({ pathname: "/contest_view", state: { contestID: contestID, contestName: contestName } });
}
export default ContestBar;