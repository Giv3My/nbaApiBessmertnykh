import axios from 'axios';
import { playersPhoto } from './playersPhoto';

export const getResultsOfPage = async (page) => {
  const response = await axios.get(
    `https://www.balldontlie.io/api/v1/players/?page=${page}&per_page=100`,
  );
  return response.data.data;
};

export const getAllTeams = () => {
  return axios.get("https://www.balldontlie.io/api/v1/teams").then(({ data }) => data.data);
}

export const getAllPlayers = async () => {
  let players = [];

  let page = 1;
  while (page <= 38) {
    const newResults = await getResultsOfPage(page);
    page++;
    players = players.concat(newResults);
  }

  return players;
};

export const pushIntoTeam = (sortedTeams, player) => {
  sortedTeams[player.team.id].players.push(player);
};

export const getSortedTeams = (players) => {
  const sortedTeams = {};

  players.forEach((player) => {
    if (player.weight_pounds !== null) {
      if (!sortedTeams.hasOwnProperty(player.team.id)) {
        sortedTeams[player.team.id] = {
          players: [],
        };
      }
      pushIntoTeam(sortedTeams, player);
    }
  });

  return getMergedTeams(sortedTeams, playersPhoto);
};

export const getMergedTeams = (teams, updatedTeams) => {
  const teamsArr = Object.values(teams);
  const updatedTeamsArr = Object.values(updatedTeams);

  const mergedArray = teamsArr.map((team, i) => {
    const mergedPlayers = team.players.map((player, j) => {
      return { ...player, ...updatedTeamsArr[i].players[j] };
    });

    return { players: mergedPlayers };
  });

  let mergedObject = {};

  mergedArray.forEach((team, i) => {
    mergedObject[i + 1] = team;
  });

  return mergedObject;
};
