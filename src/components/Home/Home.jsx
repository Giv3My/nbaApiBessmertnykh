// import React, { useState, useEffect } from 'react'
// import axios from 'axios';
import React from 'react';
import Loader from '../Loader/Loader';
import TeamCard from '../TeamCard/TeamCard';
import { teamLogos as logos } from '../../helpers/teamLogo';
import './Home.scss';

export default function Home({ children, teams }) {
    // const [teams, setTeams] = useState([]);

    // useEffect(() => {
    //     axios.get("https://www.balldontlie.io/api/v1/teams").then(({ data }) => setTeams(data.data));
    // }, [])

    if (!teams) {
        return <Loader />
    }

    return (
        <>
            {children}
            <div className="home">
                <div className="teams">
                    <div className="team team-east">
                        <p className="conference-name conference-east">Eastern Conference</p>
                        <div className="teams-wrapper">
                            {teams.filter(team => team.conference === "East").map(team =>
                                <TeamCard key={team.id} team={team} logo={logos.find(logo => logo.id === team.id).team_logo_url} />
                            )}
                        </div>
                    </div>
                    <div className="team team-west">
                        <p className="conference-name conference-west">Western Conference</p>
                        <div className="teams-wrapper">
                            {teams.filter(team => team.conference === "West").map(team =>
                                <TeamCard key={team.id} team={team} logo={logos.find(logo => logo.id === team.id).team_logo_url} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
