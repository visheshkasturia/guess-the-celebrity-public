import axios from 'axios';

export const getOverallBest = () => (axios({
  method: 'get',
  url: '/leaders/5',
  responseType: 'json',
  headers: { 'Access-Control-Allow-Origin': 'true' },
})
  .then((response) => (
    response.data
  ))
);

export default getOverallBest;
