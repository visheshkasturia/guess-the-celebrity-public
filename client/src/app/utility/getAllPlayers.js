import axios from 'axios';

export const getAllPlayers = async () => (
  axios({
    method: 'get',
    url: '/players',
    responseType: 'json',
    headers: { 'Access-Control-Allow-Origin': 'true' },
  })
    .then((response) => (response.data))
);

export default getAllPlayers;
