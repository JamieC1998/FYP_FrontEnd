import { Box, Paper, Typography, Divider } from "@material-ui/core";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ContestBar from "../contest_bar/ContestBar";
import { useSelector, useDispatch } from "react-redux";
import HeadingComponent from "../heading_component/HeadingComponent";
import getService from "../../Utils/ServiceFetching";

function ContestPageList(props) {
    const [state, setState] = useState({ itemList: [], first: true });
    const selector = useSelector(state => state);
    const dispatch = useDispatch();

    useEffect(() => {
        if (selector.reload_contest_list || state.first) {
            getService((hostName) => {
                axios.get(`${hostName}/contest`)
                    .then(res => {
                        var itemList = [];

                        res.data.forEach((element, index) => {
                            itemList.push(<ContestBar key={index} contestOwner={element.owner} contestName={element.contestName} contestID={element.contestID} />);
                            itemList.push(<Divider key={`${index} ${index - 1}`} />);
                        });

                        setState({ ...state, itemList: itemList, first: false });
                        dispatch({ type: "set_contest_list", payload: false });

                    });
            }, "contest_service");
        }
    });

    return (
        <Box my={3} className={props.classes.container}>
            <Paper elevation={3}>
                <HeadingComponent title="Contests" />
                <Box className={props.classes.container_body}>
                    {state.itemList}
                </Box>
            </ Paper>
        </Box>
    );
}

export default ContestPageList;