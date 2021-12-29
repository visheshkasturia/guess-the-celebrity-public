import axios from 'axios';

export const createPlayerPost = (playerName, allPlayers) => axios({
  method: 'post',
  url: '/player',
  data: {
    name: playerName,
    points: 0,
    maxpoints: 0,
  },
})
  .then((response) => ({
    handle: 'OK',
    id: response.data._id,
    name: response.data.name,
    points: response.data.points,
    maxpoints: response.data.maxpoints,
  }),
  () => {
    for (let i = 0; i < allPlayers.length; i += 1) {
      if (allPlayers[i].name === playerName) {
        return {
          handle: 'Player Exist',
          id: allPlayers[i]._id,
          name: allPlayers[i].name,
          points: allPlayers[i].points,
          maxpoints: allPlayers[i].maxpoints,
        };
      }
    }
    return {
      handle: 'Invalid Input',
    };
  });

export default createPlayerPost;
