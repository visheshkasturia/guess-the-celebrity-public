const router = require('express').Router();
const Players = require('../models/players.model');

router.route('/').post(async (request, response) => {
  const newPlayer = new Players(request.body);

  const foundPlayer = await Players.findOne({ name: newPlayer.name });

  if (foundPlayer) {
    response.status(409).send('player already exists in database');
  } else {
    newPlayer.save()
      .then((player) => response.json(player))
      .catch(() => response.status(400).send('invalid input, object invalid'));
  }
});

// router.route('/players').get()

router.get('/:id', (request, response) => {
  const playerID = request.params.id;
  Players.findById(playerID)
    .then((player) => response.json(player))
    .catch(() => response.status(404).send('player not found'));
});

router.put('/:id', (request, response) => {
  const playerID = request.params.id;
  const updatedPlayer = {
    name: request.body.name,
    points: request.body.points,
    maxpoints: request.body.maxpoints,
  };
  Players.findByIdAndUpdate(playerID, updatedPlayer, { new: true })
    .then((player) => (response.json(player)))
    .catch(() => response.status(404).send('player not found'));
});

router.delete('/:id', (request, response) => {
  const playerID = request.params.id;
  Players.findByIdAndDelete(playerID)
    .then((player) => (response.json(player)))
    .catch(() => response.status(404).send('player not found'));
});

module.exports = router;
