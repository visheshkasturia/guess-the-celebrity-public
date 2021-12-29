import axios from 'axios';
/* eslint-disable */

export const updatePlayerPut = (updatePlayer) => {
  return axios({
    method: 'put',
    url: 'player/' + updatePlayer.id,
    data: {
      id: updatePlayer.id,
      name: updatePlayer.name,
      points: updatePlayer.points,
      maxpoints: updatePlayer.maxpoints,
    }
  })
  .then((response) => {
    return response;
  })
  .catch((err) => {
    return err;
  })
};

export default updatePlayerPut;
