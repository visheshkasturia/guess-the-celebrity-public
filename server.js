// Create express app
const express = require('express');

const webapp = express();

const mongoose = require('mongoose');

const path = require('path');

const cors = require('cors');

require('dotenv').config();

const source = process.env.ATLAS_CONNECTION;

const playerRoutes = require('./controllers/player.controller');

const allPlayerRoutes = require('./controllers/allplayers.controller');

const leaderRoutes = require('./controllers/leaders.controller');

mongoose.connect(source, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const { connection } = mongoose;
connection.once('open', () => {
  console.log('DB connected.');
});

webapp.use(express.json());
webapp.use(
  express.urlencoded({
    extended: true,
  }),
);

webapp.use(cors());

webapp.use(express.static(path.join(__dirname, './client/build')));

// Start server
const port = process.env.PORT || 5000;
webapp.listen(port, () => {
  console.log(`Server running on port:${port}`);
});

// TODO: define all endpoints as specified in REST API

webapp.use('/player', playerRoutes);

webapp.use('/players', allPlayerRoutes);

webapp.use('/leaders', leaderRoutes);

// Root endpoint
// TODO: Will need to alter this for deployment
webapp.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build.index.html'));
});

// Default response for any other request
webapp.use((_req, res) => {
  res.status(404);
});

module.exports = webapp;
