import React, { useEffect, useState } from 'react';
import { Box, Paper, Divider } from '@material-ui/core';
import Axios from 'axios';
import TeamDetailsBar from '../team_details_bar/TeamDetailsBar';
import AddTeam from '../add_team/AddTeam';
import HeadingComponent from '../heading_component/HeadingComponent';
import getService from '../../Utils/ServiceFetching';

function TeamDetails(props) {
    let contestID = props.contestID;

    let [state, setState] = useState({
        reload: true,
        teamList: []
    });

    useEffect(() => {
        if (state.reload) {
            getService((hostName) => {
                Axios.post(`${hostName}/contest/team`, null, {
                    params: {
                        contestID: contestID
                    }
                }).then((response) => {
                    let itemList = []
                    Object.keys(response.data).forEach((element, index) => {
                        let data = response.data[element];
                        itemList.push(<TeamDetailsBar key={index} teamID={data.teamID} teamName={data.teamName} email={data.email} points={data.points} />);
                        itemList.push(<Divider key={`${index} ${element}`} />)
                    })

                    setState({ reload: false, teamList: itemList });
                });
            }, "contest_service");
        }
    });

    return (
        <Box my={3} className={props.classes.container}>
            <Paper elevation={3}>
                <HeadingComponent title="Teams" />
                <Box minHeight={100}>
                    {state.teamList}
                </Box>
                <Box p={1}>
                    <AddTeam callback={() => setState({ ...state, reload: true })} contestID={contestID} />
                </Box>

            </Paper>
        </Box>);
}

export default TeamDetails;