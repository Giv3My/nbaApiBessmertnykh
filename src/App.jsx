import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { getAllTeams, getAllPlayers, getSortedTeams } from './helpers/fetching';
import Header from './components/Header/Header';
import Search from './components/Search/Search';
import Home from './components/Home/Home';
import TeamProfile from './components/TeamProfile/TeamProfile';
import PlayerProfile from './components/PlayerProfile/PlayerProfile';
import NotFoundPage from './components/NotFound/NotFoundPage';
import './App.scss';

export default function App() {
  const [sortedTeams, setSortedTeams] = useState(null);
  const [teams, setTeams] = useState(null);

  useEffect(() => {
    getAllTeams().then((teams) => setTeams(teams));
  }, [])

  useEffect(() => {
    getAllPlayers().then(async (players) => {
      setSortedTeams(await getSortedTeams(players));
    });
  }, []);

  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/">
          <Home teams={teams}>
            <Search />
          </Home>
        </Route>
        <Route exact path="/team/:teamId">
          <TeamProfile teams={sortedTeams} />
        </Route>
        <Route exact path="/team/:teamId/player/:playerId">
          <PlayerProfile teams={sortedTeams} />
        </Route>
        <Route path="*">
          <NotFoundPage />
        </Route>
      </Switch>
    </>
  );
}
