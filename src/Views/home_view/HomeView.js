import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, makeStyles, TextField, Button } from '@material-ui/core';
import ContainerBox from '../../Components/container_box/ContainerBox';
import { useHistory } from 'react-router-dom';

const HOME_PAGE_TITLE = "Home";

const useStyles = makeStyles({
    root: {
        display: "flex",
        alignItems: "center",
        flexDirection: "column"
    },
    container: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center"
    }
})

function HomeView(props) {
    const dispatch = useDispatch();
    const selector = useSelector(state => state);
    const classes = useStyles();
    const history = useHistory();

    const [teamID, setTeamID] = useState(0);
    
    useEffect(() => {
        if(selector.title !== HOME_PAGE_TITLE){
            dispatch({type: "title_change", payload: HOME_PAGE_TITLE});
        }
    });

    return (
        <Box className={classes.root}>
            <ContainerBox title="Team Portal" minHeight={50}>
                <Box className={classes.container} px={2} py={1.8}>
                    <Box>
                        <TextField variant="outlined" type="number" onChange={setInput(setTeamID)} placeholder="Enter Team ID" />
                    </Box>
                    <Box>
                        <Button onClick={openContest(teamID, history)} variant="contained" color="primary" size="large">Enter</Button>
                    </Box>
                </Box>
            </ContainerBox>
        </Box>
    );
}

const setInput = (setState) => event => {
    setState(parseInt(event.target.value));
}

const openContest = (teamID, history) => event => {
    history.push({ pathname: "/team", state: { teamID: teamID } });
}

export default HomeView;