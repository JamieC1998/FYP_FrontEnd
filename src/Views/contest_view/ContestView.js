import React, { useEffect} from 'react';
import { Box} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import ContestPageList from '../../Components/contest_page_list/ContestPageList';
import CreateContestBox from '../../Components/create_contest/CreateContestBox';

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

const CONTEST_PAGE_TITLE = "My Contests";

function ContestView(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const selector = useSelector(state => state);

    useEffect(() => {
        if(selector.title !== CONTEST_PAGE_TITLE){
            dispatch({type: "title_change", payload: CONTEST_PAGE_TITLE});
        }
    });

    return (
        <Box className={classes.root}>
            <ContestPageList classes={classes}/>
            <CreateContestBox classes={classes}/>
        </Box>);
}

export default ContestView;
