import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import Loader from '../Loader/Loader';
import NotFoundPage from '../NotFound/NotFoundPage';
import { defaultStats } from '../../constants';
import { defaultPlayer } from '../../constants';
import './PlayerProfile.scss';

export default function PlayerProfile({ teams }) {
    const [stats, setStats] = useState(null);
    const params = useParams();

    useEffect(() => {
        if (teams) {
            fetchPlayerStats();
        } // eslint-disable-next-line
    }, [teams])

    const fetchPlayerStats = async () => {
        let stats = null;

        let { data } = await axios.get(`https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${params.playerId}`);
        stats = getPlayerStats(data.data[0]);

        if (!data.data.length) {
            let { data: data2 } = await axios.get(`https://www.balldontlie.io/api/v1/season_averages?season=2018&player_ids[]=${params.playerId}`);
            stats = getPlayerStats(data2.data[0] || defaultStats);
        }

        setStats(stats);
    }

    const getPlayerById = (id) => {
        return teams[params.teamId].players.find(player => player.id === Number(id)) || defaultPlayer;
    }

    const getPlayerStats = (stats) => {
        return { ...getPlayerById(params.playerId), ...stats };
    }

    if (!stats) {
        return <Loader />
    }

    if (stats.id === "default") {
        return <NotFoundPage />
    }

    return (
        <div className="player-profile">
            <div className="player-profile-wrapper animate__animated animate__fadeInUpBig">
                <div className="player-header">
                    <div className="player-profile-photo">
                        <img src={stats.photo} alt="playerImage" />
                    </div>
                    <div className="player-profile-name">
                        <span className="name">{stats.first_name} {stats.last_name}</span>
                        <span className="player-team">{stats.team.full_name} | #{stats.number} | {stats.position}</span>
                    </div>
                </div>
                <div className="player-stats">
                    <section className="general">
                        <p className="season">Season: 2021</p>
                        <p className="total-games">Games Played: {stats.games_played}</p>
                        <p className="total-min">Minutes Played: {stats.min}</p>
                    </section>

                    <section className="goals-made">
                        <p className="total-goals">Goals Made: {stats.fgm}</p>
                        <p className="three-points-goals">Goals Made (3 Points): {stats.fg3m}</p>
                        <p className="free-throws">Free Throws Made: {stats.ftm}</p>
                    </section>

                    <section className="goals-attempted">
                        <p className="total-attempted">Goals Attempted: {stats.fga}</p>
                        <p className="three-points-attempted">Goals Attempted (3 Points): {stats.fg3a}</p>
                        <p className="free-throws-attempted">Free Throws Attempted: {stats.fta}</p>
                    </section>

                    <section className="additional">
                        <p className="assists">Assists: {stats.ast}</p>
                        <p className="steals">Steals: {stats.stl}</p>
                        <p className="blocks">Blocks: {stats.blk}</p>
                        <p className="points">Points: {stats.pts}</p>
                    </section>
                </div>
            </div>
        </div>
    )
}
