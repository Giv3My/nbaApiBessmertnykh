import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Icon from "../../assets/search-player-ico.png"
import './Search.scss';

export default function Search() {
    const [show, setShow] = React.useState(false);
    const [players, setPlayers] = React.useState(null);
    const [searchValue, setSearchValue] = React.useState("");

    React.useEffect(() => {
        if (!searchValue) {
            setShow(false);
        }
    }, [searchValue])

    const onSearchValueChange = (e) => {
        setSearchValue(e.target.value);
    }

    const searchPlayer = async () => {
        if (searchValue) {
            await fetchPlayers();
            setShow(true);
        }
    }

    const fetchPlayers = async () => {
        const { data } = await axios.get(`https://www.balldontlie.io/api/v1/players?search=${searchValue}`);
        setPlayers(data.data);
    }

    return (
        <div className="flex center">
            <div className="input-wrapper">
                <div className="search-player">
                    <input value={searchValue} onChange={onSearchValueChange} type="text" placeholder="Search player..." />
                    <button onClick={searchPlayer} className="search-button">
                        <img src={Icon} alt="search-icon" width="24" height="24" />
                    </button>
                </div>
                {
                    show && (
                        <div className="list-wrapper">
                            {players.length ? <ul className="list animate__animated animate__fadeInDown">
                                {players.map(player =>
                                    <Link to={`/team/${player.team.id}/player/${player.id}`} key={player.id} className="search-player-link" >
                                        <li>{player.first_name} {player.last_name}</li>
                                    </Link>
                                )}
                            </ul> : <p className="not-found">No matches found</p>}
                        </div>
                    )
                }
            </div>

        </div >
    )
}