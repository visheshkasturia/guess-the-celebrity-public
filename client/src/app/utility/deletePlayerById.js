import axios from 'axios';

export const deletePlayerById = async (playerId) => axios({
  method: 'delete',
  url: `/player/${playerId}`,
  responseType: 'json',
  headers: { 'Access-Control-Allow-Origin': 'true' },
}).then((response) => response.data);

export default deletePlayerById;
