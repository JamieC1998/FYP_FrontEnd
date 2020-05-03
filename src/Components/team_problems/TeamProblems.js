import React, { useEffect } from 'react';
import ContainerBox from '../container_box/ContainerBox';
import { useState } from 'react';
import axios from 'axios';
import TeamProblemBar from '../team_problem_bar/TeamProblemBar';
import { Divider } from '@material-ui/core';
import getService from '../../Utils/ServiceFetching';
import HelpIcon from '@material-ui/icons/Help';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { green } from '@material-ui/core/colors';
import BlockIcon from '@material-ui/icons/Block';

function TeamProblems(props) {
    const [state, setState] = useState({
        reload: true,
        displayList: []
    })

    let teamID = props.teamID;

    useEffect(() => {
        if (state.reload) {
            var formData = new FormData();
            formData.append("teamID", teamID);

            getService((hostName) => {
                axios.post(`${hostName}/contest/team/problems`, formData)
                    .then(response => {
                        axios.post(`${hostName}/contest/problem/team/solutions/get`, formData)
                            .then(res => {
                                var resList = [];
                                var keys = Object.keys(response.data);

                                var keyList = Object.keys(res.data);
                                var map = {}
                                keyList.forEach(key => {
                                    var element = res.data[key];
                                    map[element.problemID.problemID] = element;
                                })

                                keys.forEach((element, index) => {
                                    var data = response.data[element];
                                    var icon = <HelpIcon />

                                    if(map[data.problemID] !== undefined){
                                        icon = (map[data.problemID].success) ? 
                                            <CheckCircleOutlineIcon style={{ color: green[500] }}/> :
                                            <BlockIcon color="secondary"/>
                                    }
                                    resList.push(<TeamProblemBar
                                        key={index}
                                        icon={icon}
                                        teamID={teamID}
                                        problemID={data.problemID}
                                        problemNumber={data.problemNumber}
                                        problemName={data.problemName}
                                        problemDescription={data.problemDescription}
                                        filename={data.fileName}
                                        callback={() => setState({ ...state, reload: true })} />
                                    );

                                    resList.push(<Divider key={`${index} Divider`} />);
                                });

                                setState({ ...state, reload: false, displayList: resList });
                            });

                    });
            }, "contest_service");
        }
    });

    return (
        <ContainerBox title="Problems">
            {state.displayList}
        </ContainerBox>
    )
}

export default TeamProblems;