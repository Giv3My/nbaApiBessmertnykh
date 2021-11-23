import React from 'react';
import { Link } from 'react-router-dom';
import useWow from '../../hooks/useWow';
import './TeamCard.scss';

export default function TeamCard({ team, logo }) {
    useWow();

    const conference = team.conference.toLowerCase();

    return (
        <Link to={`/team/${team.id}`} className="team-card-link">
            <div className="team-card animate__animated wow animate__bounceInUp">
                <img className="team-logo" src={logo} alt={team.full_name} />
                <p className={`team-name team-name-${conference}`}>{team.full_name}</p>
            </div>
        </Link>
    )
}
