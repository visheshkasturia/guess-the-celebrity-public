import axios from 'axios';

export const getPlayerById = async (playerId) => axios({
  method: 'get',
  url: `/player/${playerId}`,
  responseType: 'json',
  headers: { 'Access-Control-Allow-Origin': 'true' },
}).then((response) => response.data);

export default getPlayerById;
