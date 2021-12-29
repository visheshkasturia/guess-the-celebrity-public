export const getPlayerIdByName = (playerName, allPlayers) => {
  for (let i = 0; i < allPlayers.length; i += 1) {
    if (allPlayers[i].name === playerName) {
      return {
        handle: 'OK',
        id: allPlayers[i]._id,
        name: allPlayers[i].name,
        points: allPlayers[i].points,
        maxpoints: allPlayers[i].maxpoints,
      };
    }
  }
  return {
    handle: 'Player does not exist',
  };
};

export default getPlayerIdByName;
