import React from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader';
import './TeamProfile.scss';

export default function TeamProfile({ teams }) {
    const params = useParams();

    if (!teams) {
        return <Loader />
    }

    return (
        <div className="team-profile">
            <div className="list-of-players animate__animated animate__fadeInDownBig">
                <h3 className="team-profile-name">{teams[params.teamId].players[0].team.full_name}</h3>
                <ul className="team-profile-head">
                    <li>PLAYER</li>
                    <li>#</li>
                    <li>POS</li>
                    <li>HEIGHT</li>
                    <li>WEIGHT</li>
                </ul>

                {teams[params.teamId].players.map(player =>
                    <Link key={player.id} to={`/team/${params.teamId}/player/${player.id}`} href="#" className="player-link">
                        <ul key={player.id} className="team-profile-body animate__animated animate__fadeInLeft animate__delay-1s" >
                            <li className="player-name">
                                <img className="player-photo" src={player.photo} alt="playerPhoto" />
                                <span>{player.first_name} {player.last_name}</span>
                            </li>
                            <li className="player-num">
                                <span>{player.number}</span>
                            </li>
                            <li className="player-pos">
                                <span>{player.position ? player.position : "?"}</span>
                            </li>
                            <li className="player-height">
                                <span>{player.height_feet}-{player.height_inches}</span>
                            </li>
                            <li className="player-weight">
                                <span>{player.weight_pounds} lbs</span>
                            </li>
                        </ul>
                    </Link>
                )}

            </div>
        </div>
    )
}
