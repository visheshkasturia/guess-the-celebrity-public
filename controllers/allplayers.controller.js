const router = require('express').Router();
const Players = require('../models/players.model');

router.get('/', (request, response) => {
  Players.find()
    .then((allPlayers) => response.json(allPlayers))
    .catch(() => response.status(400).send('bad url'));
});

module.exports = router;
