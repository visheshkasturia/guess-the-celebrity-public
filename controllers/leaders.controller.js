const router = require('express').Router();
const Players = require('../models/players.model');

router.get('/:num', (request, response) => {
  const numPlayers = parseInt(request.params.num, 10);
  Players.find().sort({ maxpoints: -1 }).limit(numPlayers)
    .then((allPlayers) => response.json(allPlayers))
    .catch(() => response.status(400).send('bad url'));
});

module.exports = router;
